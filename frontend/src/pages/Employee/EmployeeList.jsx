import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../../api/employeeApi';
import Button from '../../components/form/Button';
import DataTable from '../../components/table/DataTable';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Load employees
  const load = () => {
    getEmployees()
      .then((r) => setEmployees(r.data))
      .catch(() => setError('Failed to load employees.'));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete employee "${name}"?`)) return;

    deleteEmployee(id)
      .then(load)
      .catch((err) =>
        alert(err.response?.data?.message || 'Delete failed.')
      );
  };

  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Employees</h2>
        <Button
          variant="primary"
          onClick={() => navigate('/employees/add')}
        >
          + Add Employee
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Reusable DataTable */}
      <DataTable
        columns={['#', 'Name', 'Email', 'Date of Birth', 'Age', 'Salary', 'Department', 'Actions']}
        data={employees}
        emptyMessage='No employees yet. Click "+ Add Employee" to get started.'
        renderRow={(e, i) => (
          <tr
            key={e.employeeId}
            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <td className="px-5 py-4 text-gray-400">{i + 1}</td>

            <td className="px-5 py-4 font-medium text-gray-800">
              {e.firstName} {e.lastName}
            </td>

            <td className="px-5 py-4 text-gray-600">{e.email}</td>

            <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
              {e.dateOfBirth?.split('T')[0]}
            </td>

            <td className="px-5 py-4">
              <span className="bg-purple-50 text-purple-700 text-xs font-medium px-2 py-0.5 rounded">
                {e.age} {/* Make sure your API sends formatted age like "3 years, 2 months, 13 days" */}
              </span>
            </td>

            <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
              ${Number(e.salary).toLocaleString()}
            </td>

            <td className="px-5 py-4">
              <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
                {e.departmentName}
              </span>
            </td>

            <td className="px-5 py-4 flex gap-2">
              <Button
                variant="edit"
                className="text-xs px-3 py-1.5"
                onClick={() => navigate(`/employees/edit/${e.employeeId}`)}
              >
                Edit
              </Button>

              <Button
                variant="danger"
                className="text-xs px-3 py-1.5"
                onClick={() =>
                  handleDelete(e.employeeId, `${e.firstName} ${e.lastName}`)
                }
              >
                Delete
              </Button>
            </td>
          </tr>
        )}
      />
    </div>
  );
}

export default EmployeeList;