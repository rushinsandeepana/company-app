import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar         from './components/Navbar';
import DepartmentList from './pages/Department/DepartmentList';
import DepartmentForm from './pages/Department/DepartmentForm';
import EmployeeList   from './pages/Employee/EmployeeList';
import EmployeeForm   from './pages/Employee/EmployeeForm';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-6xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/"                     element={<Navigate to="/departments" />} />
            <Route path="/departments"          element={<DepartmentList />} />
            <Route path="/departments/add"      element={<DepartmentForm />} />
            <Route path="/departments/edit/:id" element={<DepartmentForm />} />
            <Route path="/employees"            element={<EmployeeList />} />
            <Route path="/employees/add"        element={<EmployeeForm />} />
            <Route path="/employees/edit/:id"   element={<EmployeeForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;