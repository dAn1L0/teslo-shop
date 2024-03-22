## TESLO shop

Tienda e-commerce, clon de la tienda de Tesla :)
creada con nextjs-14

## En desarrollo

1. Clonar el repositorio
2. Ingresamos a la carpeta del proyecto y ejecutamos
   ```
    yarn install ó yarn
   ```
3. Configurar archivo de variables, reemplazar `.env.template` a `.env`
4. Para editar el archivo .env
   ```
    DB_NAME=
    DB_USER=
    DB_PASSWORD=
    DB_TZ=(zona horaria)
    la dirección debe ser reemplazada con los datos arriba puestos
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
    AUTH_SECRET="<pegar aquí lo generado>" in the terminal ejecutamos: **openssl rand -base64 32**
    CLOUDINARY_URL=cloudinary://443946226151:unKUjdCLb71vjyQECjwG-88@teslo-shop
    CLOUDINARY_UPLOAD_PRESET=teslo-shop
   ```
5. Levantar la base de datos postgreSQL 15.6
   ```
   podman-compose up -d
   ó
   docker compose up -d
   ```
6. Ejecutar la migración de `Prisma.schema`
   ```
   yarn prisma migrate dev --name init
   ```
7. Generamos el cliente de prisma
   ```
   yarn prisma generate
   ```
8. Cargar la data de prueba en la base de datos
   ```
   yarn run seed
   ```
9.  Correr el proyecto
   ```
    yarn run dev
   ```
10. Limpiar el `localStorage` del navegador

11. Good code!


## En producción

Ir al [demo](https://teslo-shop-rd.vercel.app/)