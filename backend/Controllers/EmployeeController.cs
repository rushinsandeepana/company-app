using Microsoft.AspNetCore.Mvc;
using CompanyAPI.Data;
using CompanyAPI.Models;

namespace CompanyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeRepository _repo;
        public EmployeeController(EmployeeRepository repo) => _repo = repo;

        [HttpGet]
        public IActionResult GetAll()
        {
            try   { return Ok(_repo.GetAll()); }
            catch (Exception ex) { return StatusCode(500, new { message = ex.Message }); }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var emp = _repo.GetById(id);
            return emp == null ? NotFound(new { message = "Employee not found." }) : Ok(emp);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Employee emp)
        {
            try
            {
                _repo.Add(emp);
                return Ok(new { message = "Employee added successfully." });
            }
            catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Employee emp)
        {
            emp.EmployeeId = id;
            try
            {
                _repo.Update(emp);
                return Ok(new { message = "Employee updated successfully." });
            }
            catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _repo.Delete(id);
                return Ok(new { message = "Employee deleted successfully." });
            }
            catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
        }
    }
}