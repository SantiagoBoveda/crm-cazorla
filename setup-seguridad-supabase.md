# Activar seguridad del CRM (DB-01) — guía paso a paso

El código del CRM ya tiene el login por **magic link** y el bloqueo optimista (DB-02).
Falta la config en el panel de Supabase. **Seguí este orden exacto** — si activás RLS o
cerrás los registros antes de tu primer login, te quedás afuera.

Panel: https://supabase.com/dashboard → proyecto `rotqawiyflzxyssubjnu`

---

## 1) Configurar las URLs de redirección (ANTES de desplegar)

`Authentication → URL Configuration`

- **Site URL**: la dirección pública del CRM. Ej:
  `https://santiagoboveda.github.io/<nombre-del-repo>/`
- **Redirect URLs** (agregar todas las que uses):
  - `https://santiagoboveda.github.io/<nombre-del-repo>/`
  - `https://santiagoboveda.github.io/<nombre-del-repo>/index.html`

> El enlace del mail solo funciona si la URL de retorno está en esta lista.
> Si querés probar en tu PC, agregá también `http://localhost:8123/index.html`.

## 2) Verificar el proveedor de Email

`Authentication → Providers → Email`

- **Enable Email provider**: ON (viene activado por defecto).
- **Allow new users to sign up**: dejalo **ON por ahora** (lo cerramos en el paso 5).
- "Confirm email": no aplica al magic link, podés dejarlo como está.

> Nota: el correo gratuito de Supabase tiene un límite (~unos pocos mails por hora).
> Para 2 usuarios alcanza. Si más adelante mandan muchos, configurá un SMTP propio
> en `Authentication → Emails → SMTP`.

## 3) Desplegar la nueva versión

Subí a GitHub el `index.html` y `sw.js` actualizados (la PWA ya está en cache v5, así
que tomará la versión nueva sola).

## 4) Primer login de cada uno (crea las cuentas)

Vos y Alfonso, cada uno:
1. Abrir el CRM → escribir el email → "Enviarme el enlace de acceso".
2. Abrir el mail **en el mismo dispositivo** y tocar el enlace.
3. Entran y la sesión queda guardada (no hay que volver a loguearse en ese aparato).

> Repetir en cada dispositivo donde usen el CRM (PC, teléfono).

## 5) Cerrar los registros (después de que ambos entraron al menos una vez)

`Authentication → Providers → Email` → **Allow new users to sign up: OFF**

A partir de acá, solo los emails que ya entraron pueden acceder. Nadie nuevo se da de alta.

## 6) Activar RLS (la protección real)

`SQL Editor` → pegar y ejecutar:

```sql
alter table crm_data enable row level security;

create policy "crm_authenticated_rw"
  on crm_data
  for all
  to authenticated
  using (true)
  with check (true);
```

Esto hace que la base solo se pueda leer/escribir con sesión iniciada. La `anon key`
que está en el HTML deja de servir por sí sola.

## 7) Verificar que quedó cerrado

- Abrí el CRM en una **ventana de incógnito** y **sin loguearte**: debe mostrar el login
  y **no** cargar ningún dato.
- (Opcional, técnico) Probar la API anónima — debe devolver vacío o error de permisos:
  ```bash
  curl "https://rotqawiyflzxyssubjnu.supabase.co/rest/v1/crm_data?select=*" \
    -H "apikey: <ANON_KEY>"
  ```

---

## Notas

- **Rotar la anon key no agrega seguridad por sí solo**: la clave nueva también queda
  visible en el HTML público. Lo que protege es el **RLS del paso 6**.
- El botón **"Trabajar sin conexión"** sigue disponible: usa solo los datos guardados
  en ese dispositivo y no toca la base compartida (no requiere login).
- Para salir de una sesión (ej. dispositivo compartido): botón **"⎋ Cerrar sesión"** en
  la barra lateral.
- Google (Sheets/Drive/Calendar) sigue siendo **opcional** y aparte: el botón "Conectar
  Google" del sidebar. No tiene nada que ver con el login del CRM.
