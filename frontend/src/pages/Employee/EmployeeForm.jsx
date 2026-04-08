import { useEffect, useState }    from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, updateEmployee, getEmployeeById } from '../../api/employeeApi';
import { getDepartments } from '../../api/departmentApi';

const calcAge = (dob) => {
  if (!dob) return '';
  const today = new Date(), birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  if (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())) age--;
  return age < 0 ? '' : String(age);
};

const empty = { firstName:'', lastName:'', email:'', dateOfBirth:'', age:'', salary:'', departmentId:'' };

// Reusable field component — reduces repeated label+input+error markup
function Field({ label, children, error, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function EmployeeForm() {
  const { id }    = useParams();
  const isEditing = !!id;
  const navigate  = useNavigate();

  const [form, setForm]          = useState(empty);
  const [departments, setDepts]  = useState([]);
  const [errors, setErrors]      = useState({});
  const [serverError, setSrvErr] = useState('');
  const [loading, setLoading]    = useState(false);

  useEffect(() => {
    getDepartments().then(r => setDepts(r.data));
    if (isEditing) {
      getEmployeeById(id).then(r => {
        const d = r.data;
        const dob = d.dateOfBirth?.split('T')[0] || '';
        setForm({ firstName: d.firstName, lastName: d.lastName, email: d.email,
                  dateOfBirth: dob, age: calcAge(dob),
                  salary: d.salary, departmentId: String(d.departmentId) });
      }).catch(() => setSrvErr('Failed to load employee data.'));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors(p => ({ ...p, [name]: '' }));
    if (name === 'dateOfBirth')
      setForm(p => ({ ...p, dateOfBirth: value, age: calcAge(value) }));
    else
      setForm(p => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim())  e.firstName  = 'First name is required.';
    if (!form.lastName.trim())   e.lastName   = 'Last name is required.';
    if (!form.email.trim())      e.email      = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.dateOfBirth)       e.dateOfBirth = 'Date of birth is required.';
    else if (new Date(form.dateOfBirth) >= new Date()) e.dateOfBirth = 'DOB must be in the past.';
    if (!form.salary || Number(form.salary) <= 0) e.salary = 'Enter a valid salary.';
    if (!form.departmentId)      e.departmentId = 'Please select a department.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSrvErr('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      if (isEditing) await updateEmployee(id, form);
      else           await addEmployee(form);
      navigate('/employees');
    } catch (err) {
      setSrvErr(err.response?.data?.message || 'Something went wrong.');
    } finally { setLoading(false); }
  };

  // Shared input class builder — applies error styling when needed
  const inputClass = (name) =>
    `w-full px-3 py-2.5 text-sm border rounded-lg outline-none transition-colors ${
      errors[name]
        ? 'border-red-400 focus:border-red-500 bg-red-50'
        : 'border-gray-300 focus:border-blue-500 bg-white'
    }`;

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

          {/* First Name + Last Name side by side */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name" error={errors.firstName} required>
              <input name="firstName" value={form.firstName} onChange={handleChange}
                placeholder="e.g. John" className={inputClass('firstName')} />
            </Field>
            <Field label="Last Name" error={errors.lastName} required>
              <input name="lastName" value={form.lastName} onChange={handleChange}
                placeholder="e.g. Smith" className={inputClass('lastName')} />
            </Field>
          </div>

          {/* Email */}
          <Field label="Email Address" error={errors.email} required>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="e.g. john@company.com" className={inputClass('email')} />
          </Field>

          {/* DOB + Age side by side */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date of Birth" error={errors.dateOfBirth} required>
              <input type="date" name="dateOfBirth" value={form.dateOfBirth}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className={inputClass('dateOfBirth')} />
            </Field>
            <Field label="Age (auto-calculated)">
              <input
                value={form.age || ''}
                readOnly
                placeholder="Fill DOB first"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </Field>
          </div>

          {/* Salary */}
          <Field label="Salary" error={errors.salary} required>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" name="salary" value={form.salary} onChange={handleChange}
                placeholder="e.g. 75000" min="0" step="0.01"
                className={`${inputClass('salary')} pl-7`} />
            </div>
          </Field>

          {/* Department */}
          <Field label="Department" error={errors.departmentId} required>
            <select name="departmentId" value={form.departmentId} onChange={handleChange}
              className={inputClass('departmentId')}>
              <option value="">-- Select a Department --</option>
              {departments.map(d => (
                <option key={d.departmentId} value={d.departmentId}>
                  {d.departmentName} ({d.departmentCode})
                </option>
              ))}
            </select>
          </Field>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
              {loading ? 'Saving...' : isEditing ? 'Update Employee' : 'Save Employee'}
            </button>
            <button type="button" onClick={() => navigate('/employees')}
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm px-5 py-2.5 rounded-lg transition-colors">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;