# Travel Plans API 🌍

REST API para la gestión de planes de viaje construida con **NestJS**, **mongoose** y **MongoDB**.  
Integra datos de países desde la API pública [RestCountries](https://restcountries.com) con una capa de caché local en base de datos.

---

## Instalación y ejecución

### Requisitos previos
- Node.js >= 18
- npm >= 9
- MongoDB compass (o una base de datos de mongo)

### Pasos

Hay que primero en el ``` app.module.ts ``` conectar con una base de datos noSql como mongo, 
dentro de 
```
MongooseModule.forRoot('AQUI VA LA URL LA CONEXION A LA BASE DE DATOS'),
```


```bash

# 1. Clonar el repositorio
git clone <URL_DEL_REPO>
cd travel-plans-api

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita .env si necesitas cambiar el puerto o la ruta de la base de datos

# 4. Compilar y ejecutar en modo desarrollo
npm run start:dev

# Para producción:
npm run build
npm run start
```

La API quedará disponible en `http://localhost:3000`.

---

## Arquitectura interna

```
src/
├── countries/
│   ├── country.schema.ts          # Entidad Country (alphaCode, name, region, capital, population, flagUrl)
│   ├── rest-countries.provider.ts # Provider que consume RestCountries API externa
│   ├── countries.service.ts       # Lógica de caché: DB local → API externa
│   └── countries.module.ts        # Módulo SIN controlador — solo exporta CountriesService
│
├── travel-plans/
│   ├── travel-plan.schmea.ts          # Entidad TravelPlan
│   ├── dto/
│   │   ├── create-travel-plan.dto.ts  # DTO con validaciones (class-validator)
│   │   └── expenses.dto.ts  # DTO con validaciones (class-validator)
│   ├── travel-plans.service.ts        # Lógica de negocio + integración con CountriesService
│   ├── travel-plans.controller.ts     # Endpoints HTTP públicos
│   └── travel-plans.module.ts         # Importa CountriesModule
├── users/
│   ├── user.schema.ts          # Entidad TravelPlan
│   ├── dto/
│   │   └── create-user.dto.ts  # DTO con validaciones (class-validator)
│   ├── users.service.ts        # Lógica de negocio + integración con CountriesService
│   ├── users.controller.ts     # Endpoints HTTP públicos
│   └── users.module.ts         # Importa CountriesModule
├── app.module.ts   # Módulo raíz + configuración TypeORM
└── main.ts         # Bootstrap + ValidationPipe global
```

### Flujo de caché de países

```
POST /travel-plans  →  TravelPlansService.create()
                           │
                           ▼
                    CountriesService.resolveByAlphaCode("COL")
                           │
                    ┌──────▼──────┐
                    │ ¿Existe en  │
                    │  DB local?  │
                    └──────┬──────┘
                    SÍ ◄───┴───► NO
                    │              │
                    │              ▼
                    │    RestCountriesProvider
                    │    GET restcountries.com/v3.1/alpha/COL
                    │              │
                    │              ▼
                    │    Guardar en DB local
                    │              │
                    └──────┬───────┘
                           ▼
                   Guardar TravelPlan en DB
```

**Primera solicitud** con un código de país → llama a la API externa y almacena el resultado.  
**Solicitudes siguientes** con el mismo código → responde directamente desde la DB local sin llamadas externas.

---

## Endpoints públicos

| Método | Ruta               | Descripción                      |
|--------|--------------------|----------------------------------|
| POST   | /travel-plans      | Crear un nuevo plan de viaje     |
| GET    | /travel-plans      | Listar todos los planes          |
| GET    | /travel-plans/:id  | Obtener un plan por ID           |
| DELETE | /travel-plans/:id  | Eliminar un plan de viaje        |
---

## Ejemplos para Postman

### ✅ Crear un plan de viaje

**POST** `http://localhost:3000/travel-plans`

Headers:
```
Content-Type: application/json
```

Body:
```json
{
  "title": "Vacaciones en Colombia",
  "startDate": "2025-07-01",
  "endDate": "2025-07-15",
  "countryCode": "COL"
}
```

Respuesta exitosa (201):
```json
{
  "id": 1,
  "title": "Vacaciones en Colombia",
  "startDate": "2025-07-01",
  "endDate": "2025-07-15",
  "countryCode": "COL",
  "createdAt": "2025-05-13T10:00:00.000Z",
  "updatedAt": "2025-05-13T10:00:00.000Z"
}
```

---

### ✅ Crear un plan con otro país

**POST** `http://localhost:3000/travel-plans`

```json
{
  "title": "Tour por Japón",
  "startDate": "2025-09-10",
  "endDate": "2025-09-25",
  "countryCode": "JPN"
}
```
---

### ✅ Listar todos los planes

**GET** `http://localhost:3000/travel-plans`

---

### ✅ Obtener plan por ID

**GET** `http://localhost:3000/travel-plans/1`

---

### ✅ Eliminar un plan

**DELETE** `http://localhost:3000/travel-plans/1`

Respuesta (200):
```json
{
  "message": "Travel plan 1 deleted successfully"
}
```

---

### Expenses 
**POST** `http://localhost:3000/travel-plans/:id/expenses`

```
{
  "description": "vivacolombiavivafalcao",
  "amount": 10,
  "category": "lol que mal"
}
```

### ❌ Ejemplos de errores de validación

**Código de país inválido (no existe en RestCountries):**
```json
{
  "title": "Plan inválido",
  "startDate": "2025-06-01",
  "endDate": "2025-06-10",
  "countryCode": "ZZZ"
}
```
Respuesta (404):
```json
{
  "statusCode": 404,
  "message": "Country with code \"ZZZ\" not found in external API"
}
```

**Fecha de fin antes que la de inicio:**
```json
{
  "title": "Plan con fechas incorrectas",
  "startDate": "2025-08-20",
  "endDate": "2025-08-01",
  "countryCode": "ARG"
}
```
Respuesta (400):
```json
{
  "statusCode": 400,
  "message": ["endDate must be on or after startDate"]
}
```

---

## Tecnologías usadas

- **NestJS** — framework modular
- **mongoose** — ORM con soporte para SQLite, PostgreSQL, MySQL
- **MongoDB con MongoDB compass** — base de datos embebida (sin configuración adicional)
- **@nestjs/axios** — cliente HTTP para consumir RestCountries
- **class-validator / class-transformer** — validación de DTOs
- **@nestjs/config** — gestión de variables de entorno
