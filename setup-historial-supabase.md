# Historial de versiones automático (DB-03) — guía

Crea una red de seguridad: cada vez que cambia la base, se guarda automáticamente una
copia del estado **anterior**. Si alguien borra algo por error (o, mientras no esté el RLS
del DB-01, alguien de afuera), se puede volver atrás.

- No requiere cambios en `index.html`: es solo SQL en Supabase.
- Se puede ejecutar en la misma sesión del `SQL Editor` que el RLS de DB-01.
- Guarda los **últimos 200** cambios reales (descarta los más viejos solo).

Panel: https://supabase.com/dashboard → proyecto `rotqawiyflzxyssubjnu` → `SQL Editor`

---

## 1) Crear todo (copiar y ejecutar entero)

```sql
-- Tabla de historial
create table if not exists crm_data_history (
  id          bigint generated always as identity primary key,
  snapshot    jsonb       not null,
  updated_by  text,
  saved_at    timestamptz not null default now()
);

-- RLS: el historial solo se lee con sesión iniciada
alter table crm_data_history enable row level security;

drop policy if exists "crm_history_read" on crm_data_history;
create policy "crm_history_read"
  on crm_data_history
  for select
  to authenticated
  using (true);

-- Función: guarda el estado ANTERIOR y poda a 200 copias
create or replace function crm_data_snapshot()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into crm_data_history (snapshot, updated_by)
  values (OLD.data, OLD.updated_by);

  delete from crm_data_history
  where id < (
    select min(id) from (
      select id from crm_data_history order by id desc limit 200
    ) keep
  );

  return NEW;
end;
$$;

-- Disparador: solo cuando los datos realmente cambian
drop trigger if exists trg_crm_data_snapshot on crm_data;
create trigger trg_crm_data_snapshot
  before update on crm_data
  for each row
  when (OLD.data is distinct from NEW.data)
  execute function crm_data_snapshot();
```

Listo. De ahí en más, cada guardado deja una copia del estado previo.

---

## 2) Ver las copias guardadas

```sql
select
  id,
  saved_at,
  updated_by,
  jsonb_array_length(coalesce((snapshot)->'clientes','[]'::jsonb)) as clientes,
  jsonb_array_length(coalesce((snapshot)->'ventas','[]'::jsonb))    as ventas,
  jsonb_array_length(coalesce((snapshot)->'facturas','[]'::jsonb))  as facturas
from crm_data_history
order by id desc
limit 20;
```

Te muestra cuántos clientes/ventas/facturas tenía cada copia y cuándo se guardó — así
identificás la que querés restaurar.

## 3) Restaurar una versión (en caso de borrado)

Reemplazá `<ID>` por el `id` de la copia elegida del paso anterior:

```sql
update crm_data
set data = (select snapshot from crm_data_history where id = <ID>),
    updated_at = now(),
    updated_by = 'restore'
where id = 'main';
```

Al ejecutarlo, el realtime del CRM empuja la versión restaurada a todos los dispositivos
conectados (puede que tengan que refrescar la pestaña).

> Sugerencia: antes de restaurar, sacá un export JSON desde el CRM (sidebar → ⬇ Export)
> por las dudas, así también tenés el estado actual guardado.

---

## Opcional (más adelante)

Se puede agregar un botón **"Restaurar versión anterior"** dentro del CRM que liste estas
copias y permita volver atrás con un click, sin entrar a Supabase. Es trabajo en
`index.html`; lo dejamos para una próxima si lo querés.
