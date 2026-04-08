USE [master]
GO
/****** Object:  Database [CompanyDB]    Script Date: 4/8/2026 11:30:55 PM ******/
CREATE DATABASE [CompanyDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'CompanyDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQL\DATA\CompanyDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'CompanyDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQL\DATA\CompanyDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [CompanyDB] SET COMPATIBILITY_LEVEL = 170
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CompanyDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CompanyDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CompanyDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CompanyDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CompanyDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CompanyDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [CompanyDB] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [CompanyDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CompanyDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CompanyDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CompanyDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CompanyDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CompanyDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CompanyDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CompanyDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CompanyDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [CompanyDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CompanyDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CompanyDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CompanyDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CompanyDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CompanyDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CompanyDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CompanyDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [CompanyDB] SET  MULTI_USER 
GO
ALTER DATABASE [CompanyDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CompanyDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [CompanyDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [CompanyDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [CompanyDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [CompanyDB] SET OPTIMIZED_LOCKING = OFF 
GO
ALTER DATABASE [CompanyDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [CompanyDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [CompanyDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [CompanyDB]
GO
/****** Object:  Table [dbo].[Departments]    Script Date: 4/8/2026 11:30:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departments](
	[DepartmentId] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentCode] [varchar](10) NOT NULL,
	[DepartmentName] [varchar](100) NOT NULL,
	[Description] [nvarchar](255) NULL,
	[CreatedAt] [datetime] NULL,
 CONSTRAINT [PK__Departme__B2079BED17515937] PRIMARY KEY CLUSTERED 
(
	[DepartmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ__Departme__6EA8896DC05D9F16] UNIQUE NONCLUSTERED 
(
	[DepartmentCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employees]    Script Date: 4/8/2026 11:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employees](
	[EmployeeId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[DateOfBirth] [date] NOT NULL,
	[Salary] [decimal](10, 2) NOT NULL,
	[DepartmentId] [int] NOT NULL,
	[CreatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[EmployeeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Departments] ADD  CONSTRAINT [DF__Departmen__Creat__4BAC3F29]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Employees] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Employees]  WITH CHECK ADD  CONSTRAINT [FK_Employees_Departments] FOREIGN KEY([DepartmentId])
REFERENCES [dbo].[Departments] ([DepartmentId])
GO
ALTER TABLE [dbo].[Employees] CHECK CONSTRAINT [FK_Employees_Departments]
GO
/****** Object:  StoredProcedure [dbo].[sp_AddDepartment]    Script Date: 4/8/2026 11:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_AddDepartment]
    @DepartmentCode VARCHAR(50),
    @DepartmentName VARCHAR(50),
    @Description VARCHAR(255) = NULL
AS
BEGIN
    INSERT INTO dbo.Departments(DepartmentCode, DepartmentName, Description)
    VALUES(@DepartmentCode, @DepartmentName, @Description)
END
GO
/****** Object:  StoredProcedure [dbo].[sp_AddEmployee]    Script Date: 4/8/2026 11:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[sp_AddEmployee]
    @FirstName    VARCHAR(50),
    @LastName     VARCHAR(50),
    @Email        VARCHAR(100),
    @DateOfBirth  DATE,
    @Salary       DECIMAL(10,2),
    @DepartmentId INT
AS BEGIN
    IF EXISTS (SELECT 1 FROM Employees WHERE Email = @Email)
    BEGIN
        RAISERROR('Email address already exists.', 16, 1)
        RETURN
    END
    INSERT INTO Employees (FirstName, LastName, Email, DateOfBirth, Salary, DepartmentId)
    VALUES (@FirstName, @LastName, @Email, @DateOfBirth, @Salary, @DepartmentId)
    SELECT SCOPE_IDENTITY() AS NewId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteDepartment]    Script Date: 4/8/2026 11:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[sp_DeleteDepartment]
    @DepartmentId INT
AS BEGIN
    IF EXISTS (SELECT 1 FROM Employees WHERE DepartmentId = @DepartmentId)
    BEGIN
        RAISERROR('Cannot delete: employees exist in this department.', 16, 1)
        RETURN
    END
    DELETE FROM Departments WHERE DepartmentId = @DepartmentId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteEmployee]    Script Date: 4/8/2026 11:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[sp_DeleteEmployee]
    @EmployeeId INT
AS BEGIN
    DELETE FROM Employees WHERE EmployeeId = @EmployeeId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllDepartments]    Script Date: 4/8/2026 11:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetAllDepartments]
AS
BEGIN
    SELECT 
        DepartmentId, 
        DepartmentCode, 
        DepartmentName,
        Description
    FROM Departments
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllEmployees]    Script Date: 4/8/2026 11:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- ════════════════════════════════════════
-- STEP 3: EMPLOYEE STORED PROCEDURES
-- ════════════════════════════════════════
CREATE   PROCEDURE [dbo].[sp_GetAllEmployees]
AS BEGIN
    SELECT
        e.EmployeeId,
        e.FirstName,
        e.LastName,
        e.Email,
        CONVERT(VARCHAR(10), e.DateOfBirth, 120) AS DateOfBirth,
        e.Salary,
        e.DepartmentId,
        d.DepartmentName,
        DATEDIFF(YEAR, e.DateOfBirth, GETDATE()) -
        CASE WHEN MONTH(e.DateOfBirth) > MONTH(GETDATE())
              OR (MONTH(e.DateOfBirth) = MONTH(GETDATE())
             AND DAY(e.DateOfBirth)   > DAY(GETDATE()))
             THEN 1 ELSE 0 END AS Age
    FROM   Employees e
    INNER JOIN Departments d ON e.DepartmentId = d.DepartmentId
    ORDER BY e.FirstName
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetDepartmentById]    Script Date: 4/8/2026 11:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetDepartmentById]
    @DepartmentId INT
AS
BEGIN
    SELECT 
        DepartmentId,
        DepartmentCode,
        DepartmentName,
        Description
    FROM Departments
    WHERE DepartmentId = @DepartmentId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetEmployeeById]    Script Date: 4/8/2026 11:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[sp_GetEmployeeById]
    @EmployeeId INT
AS BEGIN
    SELECT
        e.EmployeeId,
        e.FirstName,
        e.LastName,
        e.Email,
        CONVERT(VARCHAR(10), e.DateOfBirth, 120) AS DateOfBirth,
        e.Salary,
        e.DepartmentId,
        d.DepartmentName,
        DATEDIFF(YEAR, e.DateOfBirth, GETDATE()) AS Age
    FROM   Employees e
    INNER JOIN Departments d ON e.DepartmentId = d.DepartmentId
    WHERE  e.EmployeeId = @EmployeeId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateDepartment]    Script Date: 4/8/2026 11:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateDepartment]
    @DepartmentId INT,
    @DepartmentCode VARCHAR(50),
    @DepartmentName VARCHAR(50),
    @Description VARCHAR(255) = NULL
AS
BEGIN
    UPDATE dbo.Departments
    SET DepartmentCode = @DepartmentCode,
        DepartmentName = @DepartmentName,
        Description = @Description
    WHERE DepartmentId = @DepartmentId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateEmployee]    Script Date: 4/8/2026 11:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[sp_UpdateEmployee]
    @EmployeeId   INT,
    @FirstName    VARCHAR(50),
    @LastName     VARCHAR(50),
    @Email        VARCHAR(100),
    @DateOfBirth  DATE,
    @Salary       DECIMAL(10,2),
    @DepartmentId INT
AS BEGIN
    IF EXISTS (
        SELECT 1 FROM Employees
        WHERE  Email      = @Email
        AND    EmployeeId != @EmployeeId
    )
    BEGIN
        RAISERROR('Email already used by another employee.', 16, 1)
        RETURN
    END
    UPDATE Employees
    SET  FirstName    = @FirstName,
         LastName     = @LastName,
         Email        = @Email,
         DateOfBirth  = @DateOfBirth,
         Salary       = @Salary,
         DepartmentId = @DepartmentId
    WHERE EmployeeId = @EmployeeId
END
GO
USE [master]
GO
ALTER DATABASE [CompanyDB] SET  READ_WRITE 
GO