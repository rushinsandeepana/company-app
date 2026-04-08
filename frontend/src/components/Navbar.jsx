import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const { pathname } = useLocation();

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`px-1 pb-1 text-sm font-medium border-b-2 transition-colors ${
        pathname.startsWith(to)
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-800'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white border-b border-gray-200 px-6">
      <div className="max-w-6xl mx-auto flex items-center h-14 gap-8">
        <span className="text-lg font-bold text-gray-900">CompanyApp</span>
        <div className="flex items-center gap-6 h-full">
          {navLink('/departments', 'Departments')}
          {navLink('/employees',   'Employees')}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;