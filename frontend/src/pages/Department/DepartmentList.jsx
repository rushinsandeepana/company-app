import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getDepartments,
  deleteDepartment
} from '../../api/departmentApi';

import Button from '../../components/form/Button';
import DataTable from '../../components/table/DataTable';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const load = () => {
    getDepartments()
      .then((r) => setDepartments(r.data))
      .catch(() => setError('Failed to load departments.'));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete department "${name}"?`)) return;

    deleteDepartment(id)
      .then(load)
      .catch((err) =>
        alert(err.response?.data?.message || 'Delete failed.')
      );
  };

  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-semibold text-gray-800">
          Departments
        </h2>

        <Button
          variant="primary"
          onClick={() => navigate('/departments/add')}
        >
          + Add Department
        </Button>

      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Reusable Table */}
      <DataTable
        columns={['#', 'Code', 'Department Name', 'Description', 'Actions']}
        data={departments}
        emptyMessage='No departments yet. Click "+ Add Department" to create one.'
        renderRow={(d, i) => (
          <tr
            key={d.departmentId}
            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <td className="px-5 py-4 text-gray-400">
              {i + 1}
            </td>

            <td className="px-5 py-4">
              <span className="bg-blue-50 text-blue-700 text-sm font-mono font-medium px-2 py-1 rounded">
                {d.departmentCode}
              </span>
            </td>

            <td className="px-5 py-4 font-medium text-gray-800">
              {d.departmentName}
            </td>

            <td className="px-5 py-4 text-gray-600">
              {d.description || '-'}
            </td>

            <td className="px-5 py-4 flex gap-2">

              <Button
                variant="edit"
                className="text-xs px-3 py-1.5"
                onClick={() =>
                  navigate(`/departments/edit/${d.departmentId}`)
                }
              >
                Edit
              </Button>

              <Button
                variant="danger"
                className="text-xs px-3 py-1.5"
                onClick={() =>
                  handleDelete(d.departmentId, d.departmentName)
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

export default DepartmentList;