namespace CompanyAPI.Models
{
    public class Department
    {
        public int    DepartmentId   { get; set; }
        public string DepartmentCode { get; set; } = string.Empty;
        public string DepartmentName { get; set; } = string.Empty;
    }
}