import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, updateEmployee, getEmployeeById } from '../../api/employeeApi';
import { getDepartments } from '../../api/departmentApi';
import InputLabel from '../../components/form/InputLabel';
import TextInput from '../../components/form/TextInput';
import SelectInput from '../../components/form/SelectInput';
import Button from '../../components/form/Button';

// Calculate age as "X years, Y months and Z days"
const calcAge = (dob) => {
  if (!dob) return '';
  const today = new Date();
  const birth = new Date(dob);
  if (birth > today) return '';

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const yearStr = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
  const monthStr = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';
  const dayStr = days > 0 ? `${days} day${days > 1 ? 's' : ''}` : '';

  let ageString = '';
  if (yearStr) ageString += yearStr;
  if (monthStr) ageString += ageString ? `, ${monthStr}` : monthStr;
  if (dayStr) ageString += ageString ? ` and ${dayStr}` : dayStr;

  return ageString || '0 days';
};

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  dateOfBirth: '',
  age: '',
  salary: '',
  departmentId: ''
};

function EmployeeForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDepartments()
      .then(res => setDepartments(res.data))
      .catch(() => setServerError('Failed to load departments.'));

    if (isEditing) {
      getEmployeeById(id)
        .then(res => {
          const d = res.data;
          const dob = d.dateOfBirth?.split('T')[0] || '';
          setForm({
            firstName: d.firstName,
            lastName: d.lastName,
            email: d.email,
            dateOfBirth: dob,
            age: calcAge(dob),
            salary: d.salary,
            departmentId: String(d.departmentId)
          });
        })
        .catch(() => setServerError('Failed to load employee data.'));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: '' }));

    if (name === 'dateOfBirth') {
      setForm(prev => ({ ...prev, dateOfBirth: value, age: calcAge(value) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim()) e.lastName = 'Last name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.dateOfBirth) e.dateOfBirth = 'Date of birth is required.';
    else if (new Date(form.dateOfBirth) >= new Date()) e.dateOfBirth = 'DOB must be in the past.';
    if (!form.salary || Number(form.salary) <= 0) e.salary = 'Enter a valid salary.';
    if (!form.departmentId) e.departmentId = 'Please select a department.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      if (isEditing) await updateEmployee(id, form);
      else await addEmployee(form);
      navigate('/employees');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {isEditing ? 'Edit Employee' : 'Add Employee'}
      </h2>

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
          {serverError}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <InputLabel value="First Name" required />
              <TextInput
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="e.g. John"
                className={`w-full ${errors.firstName ? 'border-red-400 focus:border-red-500 bg-red-50' : ''}`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <InputLabel value="Last Name" required />
              <TextInput
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="e.g. Smith"
                className={`w-full ${errors.lastName ? 'border-red-400 focus:border-red-500 bg-red-50' : ''}`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <InputLabel value="Email Address" required />
            <TextInput
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. john@company.com"
              className={`w-full ${errors.email ? 'border-red-400 focus:border-red-500 bg-red-50' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* DOB & Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <InputLabel value="Date of Birth" required />
              <TextInput
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className={`w-full ${errors.dateOfBirth ? 'border-red-400 focus:border-red-500 bg-red-50' : ''}`}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
            </div>
            <div>
  <InputLabel value="Age (auto-calculated)" />
  <div
    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
  >
    {form.age || 'Fill DOB first'}
  </div>
</div>
          </div>

          <div>
            <InputLabel value="Salary" required />
            <TextInput
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="e.g. 75000"
              min="0"
              step="0.01"
              className={`w-full ${errors.salary ? 'border-red-400 focus:border-red-500 bg-red-50' : ''}`}
            />
            {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary}</p>}
          </div>

          <div>
            <InputLabel value="Department" required />
            <SelectInput
              name="departmentId"
              value={form.departmentId}
              onChange={handleChange}
              className={errors.departmentId ? 'border-red-400 focus:border-red-500 bg-red-50' : ''}
            >
              <option value="">-- Select a Department --</option>
              {departments.map(d => (
                <option key={d.departmentId} value={d.departmentId}>
                  {d.departmentName} ({d.departmentCode})
                </option>
              ))}
            </SelectInput>
            {errors.departmentId && <p className="text-red-500 text-xs mt-1">{errors.departmentId}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving...' : isEditing ? 'Update Employee' : 'Save Employee'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/employees')}>
              Cancel
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;