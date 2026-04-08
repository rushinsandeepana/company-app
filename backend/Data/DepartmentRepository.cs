using Microsoft.Data.SqlClient;
using System.Data;
using CompanyAPI.Models;

namespace CompanyAPI.Data
{
    public class DepartmentRepository
    {
        private readonly string _conn;

        public DepartmentRepository(IConfiguration config)
            => _conn = config.GetConnectionString("DefaultConnection")!;

        public List<Department> GetAll()
        {
            var list = new List<Department>();
            using var con = new SqlConnection(_conn);
            using var cmd = new SqlCommand("sp_GetAllDepartments", con)
                          { CommandType = CommandType.StoredProcedure };
            con.Open();
            using var r = cmd.ExecuteReader();
            while (r.Read())
                list.Add(new Department {
                    DepartmentId   = (int)r["DepartmentId"],
                    DepartmentCode = r["DepartmentCode"].ToString()!,
                    DepartmentName = r["DepartmentName"].ToString()!,
                    Description = r["Description"].ToString()!
                });
            return list;
        }

        public Department? GetById(int id)
        {
            using var con = new SqlConnection(_conn);
            using var cmd = new SqlCommand("sp_GetDepartmentById", con)
                          { CommandType = CommandType.StoredProcedure };
            cmd.Parameters.AddWithValue("@DepartmentId", id);
            con.Open();
            using var r = cmd.ExecuteReader();
            if (!r.Read()) return null;
            return new Department {
                DepartmentId   = (int)r["DepartmentId"],
                DepartmentCode = r["DepartmentCode"].ToString()!,
                DepartmentName = r["DepartmentName"].ToString()!,
                Description = r["Description"].ToString()!
            };
        }

        public void Add(Department d)
        {
            using var con = new SqlConnection(_conn);
            using var cmd = new SqlCommand("sp_AddDepartment", con)
                          { CommandType = CommandType.StoredProcedure };
            cmd.Parameters.AddWithValue("@DepartmentCode", d.DepartmentCode);
            cmd.Parameters.AddWithValue("@DepartmentName", d.DepartmentName);
            cmd.Parameters.AddWithValue("@Description", d.Description);
            con.Open();
            cmd.ExecuteNonQuery();
        }

        public void Update(Department d)
        {
            using var con = new SqlConnection(_conn);
            using var cmd = new SqlCommand("sp_UpdateDepartment", con)
                          { CommandType = CommandType.StoredProcedure };
            cmd.Parameters.AddWithValue("@DepartmentId",   d.DepartmentId);
            cmd.Parameters.AddWithValue("@DepartmentCode", d.DepartmentCode);
            cmd.Parameters.AddWithValue("@DepartmentName", d.DepartmentName);
            cmd.Parameters.AddWithValue("@Description", d.Description);
            con.Open();
            cmd.ExecuteNonQuery();
        }

        public void Delete(int id)
        {
            using var con = new SqlConnection(_conn);
            using var cmd = new SqlCommand("sp_DeleteDepartment", con)
                          { CommandType = CommandType.StoredProcedure };
            cmd.Parameters.AddWithValue("@DepartmentId", id);
            con.Open();
            cmd.ExecuteNonQuery();
        }
    }
}