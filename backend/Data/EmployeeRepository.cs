using Microsoft.Data.SqlClient;
using System.Data;
using CompanyAPI.Models;

namespace CompanyAPI.Data
{
    public class EmployeeRepository
    {
        private readonly string _conn;

        public EmployeeRepository(IConfiguration config)
            => _conn = config.GetConnectionString("DefaultConnection")!;

        // Reusable mapper — avoids duplicate mapping code across methods
        private static Employee Map(SqlDataReader r) => new Employee
        {
            EmployeeId     = (int)r["EmployeeId"],
            FirstName      = r["FirstName"].ToString()!,
            LastName       = r["LastName"].ToString()!,
            Email          = r["Email"].ToString()!,
            DateOfBirth    = DateTime.Parse(r["DateOfBirth"].ToString()!),
            Salary         = (decimal)r["Salary"],
            DepartmentId   = (int)r["DepartmentId"],
            DepartmentName = r["DepartmentName"].ToString()!
        };

        public List<Employee> GetAll()
        {
            var list = new List<Employee>();
            using var con = new SqlConnection(_conn);
            using var cmd = new SqlCommand("sp_GetAllEmployees", con)
                          { CommandType = CommandType.StoredProcedure };
            con.Open();
            using var r = cmd.ExecuteReader();
            while (r.Read()) list.Add(Map(r));
            return list;
        }

        public Employee? GetById(int id)
        {
            using var con = new SqlConnection(_conn);
            using var cmd = new SqlCommand("sp_GetEmployeeById", con)
                          { CommandType = CommandType.StoredProcedure };
            cmd.Parameters.AddWithValue("@EmployeeId", id);
            con.Open();
            using var r = cmd.ExecuteReader();
            return r.Read() ? Map(r) : null;
        }

        public void Add(Employee e)
        {
            using var con = new SqlConnection(_conn);
            using var cmd = new SqlCommand("sp_AddEmployee", con)
                          { CommandType = CommandType.StoredProcedure };
            cmd.Parameters.AddWithValue("@FirstName",    e.FirstName);
            cmd.Parameters.AddWithValue("@LastName",     e.LastName);
            cmd.Parameters.AddWithValue("@Email",        e.Email);
            cmd.Parameters.AddWithValue("@DateOfBirth",  e.DateOfBirth.ToString("yyyy-MM-dd"));
            cmd.Parameters.AddWithValue("@Salary",       e.Salary);
            cmd.Parameters.AddWithValue("@DepartmentId", e.DepartmentId);
            con.Open();
            cmd.ExecuteNonQuery();
        }

        public void Update(Employee e)
        {
            using var con = new SqlConnection(_conn);
            using var cmd = new SqlCommand("sp_UpdateEmployee", con)
                          { CommandType = CommandType.StoredProcedure };
            cmd.Parameters.AddWithValue("@EmployeeId",   e.EmployeeId);
            cmd.Parameters.AddWithValue("@FirstName",    e.FirstName);
            cmd.Parameters.AddWithValue("@LastName",     e.LastName);
            cmd.Parameters.AddWithValue("@Email",        e.Email);
            cmd.Parameters.AddWithValue("@DateOfBirth",  e.DateOfBirth.ToString("yyyy-MM-dd"));
            cmd.Parameters.AddWithValue("@Salary",       e.Salary);
            cmd.Parameters.AddWithValue("@DepartmentId", e.DepartmentId);
            con.Open();
            cmd.ExecuteNonQuery();
        }

        public void Delete(int id)
        {
            using var con = new SqlConnection(_conn);
            using var cmd = new SqlCommand("sp_DeleteEmployee", con)
                          { CommandType = CommandType.StoredProcedure };
            cmd.Parameters.AddWithValue("@EmployeeId", id);
            con.Open();
            cmd.ExecuteNonQuery();
        }
    }
}