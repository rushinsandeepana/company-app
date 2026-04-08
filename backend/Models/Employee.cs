namespace CompanyAPI.Models
{
    public class Employee
    {
        public int      EmployeeId     { get; set; }
        public string   FirstName      { get; set; } = string.Empty;
        public string   LastName       { get; set; } = string.Empty;
        public string   Email          { get; set; } = string.Empty;
        public DateTime DateOfBirth    { get; set; }
        public decimal  Salary         { get; set; }
        public int      DepartmentId   { get; set; }
        public string   DepartmentName { get; set; } = string.Empty;

        public int Age
        {
            get
            {
                var today = DateTime.Today;
                var age   = today.Year - DateOfBirth.Year;
                if (DateOfBirth.Date > today.AddYears(-age)) age--;
                return age;
            }
        }
    }
}