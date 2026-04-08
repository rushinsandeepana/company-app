markdown# Company Management System

A full-stack web application for managing company departments and employees.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | ReactJS, Tailwind CSS, Axios      |
| Backend    | .NET 8 Web API, ADO.NET           |
| Database   | SQL Server 2019+, Stored Procedures |
| Version Control | Git + GitHub               |

---

## Project Structure
company-app/
├── backend/          → .NET Core Web API (port 5000)
│   └── CompanyAPI/
│       ├── Controllers/    → API endpoints
│       ├── Data/           → ADO.NET repositories
│       └── Models/         → C# model classes
├── frontend/         → ReactJS app (port 3000)
│   └── src/
│       ├── api/            → Axios API layer
│       ├── components/     → Shared components (Navbar)
│       └── pages/          → Department & Employee pages
└── database/         → SQL scripts
└── database.sql        → Tables + Stored Procedures

---

## Features

### Departments
- View all departments in a table
- Add new department (Code + Name)
- Edit existing department
- Delete department (blocked if employees exist)

### Employees
- View all employees with department name
- Add new employee with all required fields
- Age is **auto-calculated** from Date of Birth
- Edit existing employee
- Delete employee
- Department assigned via dropdown

### Validations
- All required fields checked on frontend
- Duplicate email and department code blocked on backend
- Cannot delete a department that has employees

---

## Getting Started

### Prerequisites

Make sure you have these installed:

| Tool | Version | Download |
|------|---------|----------|
| SQL Server | 2019+ Developer | [microsoft.com](https://www.microsoft.com/sql-server) |
| SSMS | Latest | [aka.ms/ssmsfullsetup](https://aka.ms/ssmsfullsetup) |
| .NET SDK | 8.x | [dotnet.microsoft.com](https://dotnet.microsoft.com) |
| Node.js | 20.x LTS | [nodejs.org](https://nodejs.org) |
| Git | Latest | [git-scm.com](https://git-scm.com) |

---

### Step 1 — Database Setup

1. Open **SQL Server Management Studio (SSMS)**
2. Connect to `localhost`
3. Click **New Query**
4. Open and run the file: `database/database.sql`
5. Verify by running: `EXEC sp_GetAllDepartments`

---

### Step 2 — Backend Setup

```bash
cd backend/CompanyAPI
dotnet restore
dotnet run
```

API will start at: `http://localhost:5000`

Test it: open `http://localhost:5000/api/department` in your browser — you should see `[]`.

> **Connection string** is in `backend/CompanyAPI/appsettings.json`.
> Default uses Windows Authentication — no password needed on local machine.

---

### Step 3 — Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create your environment file
cp .env.example .env

# Start the app
npm start
```

App will open at: `http://localhost:3000`

> `.env` is excluded from Git. Always create it from `.env.example` after cloning.

---

### Running All Three Together

Open **3 terminal windows**:

```bash
# Terminal 1 — Backend
cd backend/CompanyAPI && dotnet run

# Terminal 2 — Frontend  
cd frontend && npm start

# Terminal 3 — (SQL Server runs as Windows service automatically)
```

---

## API Endpoints

### Departments — `/api/department`

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | `/api/department`     | Get all departments  |
| GET    | `/api/department/{id}`| Get department by ID |
| POST   | `/api/department`     | Add new department   |
| PUT    | `/api/department/{id}`| Update department    |
| DELETE | `/api/department/{id}`| Delete department    |

### Employees — `/api/employee`

| Method | Endpoint            | Description        |
|--------|---------------------|--------------------|
| GET    | `/api/employee`     | Get all employees  |
| GET    | `/api/employee/{id}`| Get employee by ID |
| POST   | `/api/employee`     | Add new employee   |
| PUT    | `/api/employee/{id}`| Update employee    |
| DELETE | `/api/employee/{id}`| Delete employee    |

---

## Database Design

### Departments Table

| Column         | Type         | Constraint        |
|----------------|--------------|-------------------|
| DepartmentId   | INT          | PK, IDENTITY      |
| DepartmentCode | VARCHAR(10)  | NOT NULL, UNIQUE  |
| DepartmentName | VARCHAR(100) | NOT NULL          |
| CreatedAt      | DATETIME     | DEFAULT GETDATE() |

### Employees Table

| Column         | Type          | Constraint                   |
|----------------|---------------|------------------------------|
| EmployeeId     | INT           | PK, IDENTITY                 |
| FirstName      | VARCHAR(50)   | NOT NULL                     |
| LastName       | VARCHAR(50)   | NOT NULL                     |
| Email          | VARCHAR(100)  | NOT NULL, UNIQUE             |
| DateOfBirth    | DATE          | NOT NULL                     |
| Salary         | DECIMAL(10,2) | NOT NULL                     |
| DepartmentId   | INT           | FK → Departments.DepartmentId |
| CreatedAt      | DATETIME      | DEFAULT GETDATE()            |

> **Age** is never stored. It is always calculated from DateOfBirth.

---

## Stored Procedures

| Procedure              | Purpose                        |
|------------------------|--------------------------------|
| sp_GetAllDepartments   | Fetch all departments          |
| sp_GetDepartmentById   | Fetch one department           |
| sp_AddDepartment       | Insert new department          |
| sp_UpdateDepartment    | Update existing department     |
| sp_DeleteDepartment    | Delete (with employee check)   |
| sp_GetAllEmployees     | Fetch all with dept name + age |
| sp_GetEmployeeById     | Fetch one employee             |
| sp_AddEmployee         | Insert new employee            |
| sp_UpdateEmployee      | Update existing employee       |
| sp_DeleteEmployee      | Delete employee                |

---

## Assignment Requirements Checklist

- [x] System Design — 3-layer architecture
- [x] UI Design — ReactJS + Tailwind CSS
- [x] DB Design — SQL Server with FK relationship
- [x] ADO.NET libraries used throughout
- [x] Stored Procedures for all DB operations
- [x] Code/Component reuse — shared API layer, reusable Field component
- [x] Validations — frontend + backend
- [x] React Routing — 6 routes with react-router-dom

---

## Author

**Your Name**  
Your University / Institution  
your.email@example.com