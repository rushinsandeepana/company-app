using Microsoft.AspNetCore.Mvc;
using CompanyAPI.Data;
using CompanyAPI.Models;

namespace CompanyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly DepartmentRepository _repo;
        public DepartmentController(DepartmentRepository repo) => _repo = repo;

        [HttpGet]
        public IActionResult GetAll()
        {
            try   { return Ok(_repo.GetAll()); }
            catch (Exception ex) { return StatusCode(500, new { message = ex.Message }); }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var dept = _repo.GetById(id);
            return dept == null ? NotFound(new { message = "Department not found." }) : Ok(dept);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Department dept)
        {
            if (string.IsNullOrWhiteSpace(dept.DepartmentCode))
                return BadRequest(new { message = "Department Code is required." });
            if (string.IsNullOrWhiteSpace(dept.DepartmentName))
                return BadRequest(new { message = "Department Name is required." });
            try
            {
                _repo.Add(dept);
                return Ok(new { message = "Department added successfully." });
            }
            catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Department dept)
        {
            if (string.IsNullOrWhiteSpace(dept.DepartmentCode))
                return BadRequest(new { message = "Department Code is required." });
            if (string.IsNullOrWhiteSpace(dept.DepartmentName))
                return BadRequest(new { message = "Department Name is required." });
            dept.DepartmentId = id;
            try
            {
                _repo.Update(dept);
                return Ok(new { message = "Department updated successfully." });
            }
            catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _repo.Delete(id);
                return Ok(new { message = "Department deleted successfully." });
            }
            catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
        }
    }
}