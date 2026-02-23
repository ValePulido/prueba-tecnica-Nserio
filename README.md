# Team Tasks Dashboard

Aplicación full-stack para gestionar proyectos, tareas y desarrolladores, con visualización de carga de trabajo, estado de proyectos y predicción de riesgo de retraso.

Desarrollada como solución a la prueba técnica de **NSERIO**.

---

## Tabla de contenido

- [Estructura del repositorio](#estructura-del-repositorio)
- [Supuestos y decisiones de diseño](#supuestos-y-decisiones-de-diseño)
- [Requisitos previos](#requisitos-previos)
- [Configuración de la base de datos](#configuración-de-la-base-de-datos)
- [Configuración y ejecución de la API](#configuración-y-ejecución-de-la-api)
- [Configuración y ejecución de la SPA](#configuración-y-ejecución-de-la-spa)
- [Endpoints disponibles](#endpoints-disponibles)
- [Versiones de paquetes y librerías](#versiones-de-paquetes-y-librerías)

---

## Estructura del repositorio

```
/
── PruebaTecnica/
│   └── API backend (.NET)/
│       ├── API/                   # Capa de presentación: controllers, middlewares, Program.cs
│       ├── Application/           # Capa de aplicación: servicios, DTOs, interfaces, validadores
│       ├── Domain/                # Capa de dominio: entidades, enums, excepciones
│       └── Infrastructure/        # Capa de infraestructura: EF Core, repositorios, configuraciones
├── frontend/                          # SPA en Angular 18
│   └── src/
│       └── app/
│           ├── core/                  # Modelos y servicios HTTP
│           ├── pages/                 # Vistas: Dashboard, Tareas por proyecto, Formulario nueva tarea
│           └── shared/                # Componentes, pipes y directivas reutilizables
└── README.md
```

> **Nota:** el script `DBSetup_TeamTasks.sql` se ejecuta directamente en SQL Server Management Studio (SSMS) antes de iniciar la API. Ver sección [Configuración de la base de datos](#configuración-de-la-base-de-datos).

---

## Supuestos y decisiones de diseño

### Arquitectura general

Se adoptó una **arquitectura limpia por capas (DDD)** en el backend, separando las responsabilidades en cuatro proyectos independientes dentro de la solución:

- **Domain**: entidades (`Developers`, `Projects`, `Tasks`), enums (`StatusTask`, `StatusProject`, `PriorityTask`), excepciones de dominio (`DomainException`, `NotFoundException`) y las interfaces de repositorio (`IDevelopersRepository`, `IProjectRepository`) que definen el contrato que debe cumplir la infraestructura.
- **Application**: interfaces de servicios y repositorios, DTOs de entrada y salida, validador de negocio (`CreateTaskValidator`) y servicios de aplicación.
- **Infrastructure**: implementaciones de repositorios con Entity Framework Core, configuraciones Fluent API y `AppDbContext`.
- **API**: controllers REST, middleware de manejo global de excepciones y punto de entrada `Program.cs`.

Esta separación permite que las reglas de negocio no dependan de ninguna tecnología externa (ORM, framework HTTP), favorece la testabilidad y hace el código más fácil de mantener.

### Base de datos y stored procedures

Las consultas analíticas del dashboard (carga por desarrollador, estado por proyecto, tareas próximas a vencer y predicción de riesgo de retraso) se implementaron como **stored procedures en SQL Server**. Esta decisión se tomó porque:

1. El script `DBSetup_TeamTasks.sql` forma parte integral de la entrega, por lo que concentrar la lógica de consulta dentro de la base de datos es consistente con esa decisión.
2. Las consultas analíticas involucran agrupaciones, cálculos condicionales de fechas y predicciones cruzadas entre tablas; mantenerlas en el motor de base de datos evita trasladar ese trabajo al servidor de aplicación.
3. Permite que el código C# sea limpio y enfocado en orquestar el flujo, sin mezclarlo con lógica de consulta específica del negocio.

Los stored procedures son:

- `GetLoadSummaryByDeveloper` — resumen de carga por desarrollador activo.
- `GetProjectStatusSummary` — resumen de estado por proyecto.
- `GetUpcomingTasksDue` — tareas con vencimiento en los próximos 7 días.
- `DeveloperDelayRiskPrediction` — predicción de riesgo de retraso por desarrollador.
- `InsertNewTask` — inserción de nueva tarea.

### Frontend

- Se eligió **Angular 18** (standalone components, lazy loading por rutas).
- Se usó **Angular Material 18** como biblioteca de componentes UI para mantener coherencia visual y aprovechar sus componentes de tabla, formulario y diálogo.
- Se implementó un **componente de tabla reutilizable** (`DataTableComponent`) que acepta columnas y datos de forma genérica y se usa en todas las vistas.
- Se implementó un **pipe personalizado** (`HighlightRiskPipe`) que transforma el valor numérico `HighRiskFlag` (0/1) en la etiqueta de texto `"High Risk"` / `"Low Risk"` para su visualización en la tabla de riesgo.
- La URL base de la API se centraliza en `src/environments/environment.ts` para facilitar el cambio entre entornos.
- La política CORS de la API permite únicamente el origen `http://localhost:4200` en desarrollo.

### Validación

La validación de la tarea nueva ocurre en dos capas:

- **Frontend (Angular)**: Reactive Forms con validadores síncronos por campo, mensajes de error descriptivos en el formulario.
- **Backend (Application layer)**: `CreateTaskValidator` estático verifica campos requeridos, rangos (`EstimatedComplexity` 1–5), enumeraciones válidas y que la fecha de vencimiento sea futura. Si hay errores, se devuelve un `400 Bad Request` con la lista de mensajes.

---

## Requisitos previos

| Herramienta | Versión mínima |
| --- | --- |
| .NET SDK | 8.0 |
| SQL Server | 2019 (Express o superior) |
| Node.js | 18.x |
| npm | 9.x |
| Angular CLI | 18.x |

Verificar instalaciones:

```bash
dotnet --version
node --version
npm --version
ng version
```

---

## Configuración de la base de datos

### 1. Ejecutar el script de setup

Abre **SQL Server Management Studio (SSMS)**, conecta a tu instancia de SQL Server y ejecuta el archivo:

```
DBSetup_TeamTasks.sql
```

Este script:

- Crea la base de datos `TeamTasksSample`.
- Crea las tablas `Developers`, `Projects` y `Tasks`.
- Inserta datos de prueba (5 desarrolladores, 3 proyectos, 20 tareas).
- Crea los stored procedures utilizados por la API.

### 2. Actualizar la cadena de conexión

Abre el archivo:

```
PruebaTecnica/PruebaTecnica/API backend (.NET)/API/appsettings.json
```

Modifica el valor de `DefaultConnection` para que apunte a tu instancia:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=TU_SERVIDOR\\SQLEXPRESS;Database=TeamTasksSample;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

Reemplaza `TU_SERVIDOR\\SQLEXPRESS` con el nombre de tu instancia SQL Server. Ejemplos comunes:

| Escenario | Valor |
| --- | --- |
| SQL Server Express local | `localhost\\SQLEXPRESS` |
| SQL Server Developer local | `localhost` |
| Instancia nombrada remota | `NOMBRE_PC\\NOMBRE_INSTANCIA` |

> Si usas autenticación SQL en lugar de Windows, reemplaza `Trusted_Connection=True` por `User Id=usuario;Password=contraseña;`.

---

## Configuración y ejecución de la API

### Opción A: desde Visual Studio 2022

1. Abre la solución `API backend (.NET).sln` ubicada en:

```
PruebaTecnica/PruebaTecnica/API backend (.NET)/
```

1. Establece **API** como proyecto de inicio.
2. Pulsa **F5** o el botón **Run**.

La API arrancará en:

- HTTPS: `https://localhost:64404`
- HTTP: `http://localhost:64405`

Swagger estará disponible automáticamente en `https://localhost:64404/swagger`.

### Opción B: desde la terminal

```bash
cd "PruebaTecnica/PruebaTecnica/API backend (.NET)/API"
dotnet run
```

Para especificar el perfil:

```bash
dotnet run --launch-profile API
```

### Verificar que la API está activa

Abre el navegador en `https://localhost:64404/swagger` — deberías ver la UI de Swagger con todos los endpoints listados.

---

## Configuración y ejecución de la SPA

La SPA fue desarrollada con **Angular 18** utilizando componentes standalone y lazy loading.

### 1. Verificar la URL de la API

Abre `frontend/src/environments/environment.ts` y confirma que `apiUrl` apunte a la URL donde corre la API:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:64404/api'
};
```

Si cambias el puerto de la API, actualiza este valor.

### 2. Instalar dependencias

```bash
cd frontend
npm install
```

### 3. Ejecutar en modo desarrollo

```bash
npm start
```

O equivalentemente:

```bash
ng serve
```

La aplicación quedará disponible en `http://localhost:4200`.

### 4. Compilar para producción

```bash
npm run build
```

Los archivos compilados se generan en `frontend/dist/frontend/`.

### Vistas disponibles

| Ruta | Descripción |
| --- | --- |
| `/dashboard` | Vista principal con las tres tablas del dashboard |
| `/projects/:id` | Tareas de un proyecto con filtros, paginación y detalle |
| `/new-task` | Formulario para crear una nueva tarea |

---

## Endpoints disponibles

### Proyectos

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `/api/projects` | Lista todos los proyectos con resumen de tareas |
| GET | `/api/projects/{id}/tasks` | Tareas de un proyecto (filtros: `status`, `assigneeId`; paginación: `page`, `pageSize`) |

### Tareas

| Método | Endpoint | Descripción |
| --- | --- | --- |
| POST | `/api/tasks` | Crea una nueva tarea con validación completa |

### Desarrolladores

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `/api/developers` | Lista todos los desarrolladores activos |

### Dashboard

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `/api/dashboard/developer-workload` | Carga de tareas abiertas por desarrollador activo |
| GET | `/api/dashboard/project-health` | Resumen de estado (total, abiertas, completadas) por proyecto |
| GET | `/api/dashboard/developer-delay-risk` | Predicción de riesgo de retraso por desarrollador activo |

---

## Gráficos

Se implementó el punto opcional **5. Gráficos** de la prueba técnica.

En la vista `/projects/:id` se incluye un gráfico de tipo **donut** que muestra la distribución de tareas por estado (To Do, In Progress, Blocked, Completed) para el proyecto actual.

### Detalles de implementación

- El gráfico se renderiza con **Chart.js 4.4.1**, cargado dinámicamente desde CDN sin dependencia en `package.json`.
- Se encapsuló en el componente reutilizable `TaskStatusChartComponent` ubicado en `shared/components/task-status-chart/`.
- Recibe como `@Input()` el arreglo completo de tareas del proyecto (`allTasks`), independiente de los filtros activos, para siempre mostrar el resumen real del proyecto.
- El centro del donut muestra el total de tareas del proyecto.
- La leyenda personalizada (fuera del canvas) muestra el conteo por estado con el color correspondiente.
- Compatible con el modo oscuro de la aplicación mediante `:host-context(body.dark-mode)`.

### Librería utilizada

| Librería | Versión | Carga |
| --- | --- | --- |
| Chart.js | 4.4.1 | CDN dinámico |

## Versiones de paquetes y librerías

### Backend (.NET)

| Paquete | Versión |
| --- | --- |
| .NET SDK / Runtime | 8.0 |
| Microsoft.AspNetCore.Http.Abstractions | 2.3.9 |
| Microsoft.AspNetCore.Mvc.Core | 2.3.9 |
| Microsoft.EntityFrameworkCore | 8.0.5 |
| Microsoft.EntityFrameworkCore.SqlServer | 8.0.5 |
| Microsoft.EntityFrameworkCore.Tools | 8.0.5 |
| Microsoft.EntityFrameworkCore.Design | 8.0.5 |
| Microsoft.Build.Utilities.Core | 18.3.3 |
| Swashbuckle.AspNetCore (Swagger) | 10.1.4 |

### Frontend (Angular)

| Paquete | Versión |
| --- | --- |
| Node.js | 18.x |
| Angular CLI | ^18.2.3 |
| @angular/core | ^18.2.0 |
| @angular/common | ^18.2.0 |
| @angular/forms | ^18.2.0 |
| @angular/router | ^18.2.0 |
| @angular/material | ^18.2.14 |
| @angular/animations | ^18.2.0 |
| @angular/platform-browser | ^18.2.0 |
| @angular/platform-server | ^18.2.0 |
| @angular/ssr | ^18.2.3 |
| rxjs | ~7.8.0 |
| tslib | ^2.3.0 |
| zone.js | ~0.14.10 |
| express | ^4.18.2 |
| TypeScript | ~5.5.2 |
| jasmine-core | ~5.2.0 |
| karma | ~6.4.0 |
| @types/jasmine | ~5.1.0 |
| @types/node | ^18.18.0 |
