import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 shadow">
      <div className="p-4 text-xl font-bold text-center text-gray-800 dark:text-white">
        Admin Dashboard
      </div>
      <nav className="mt-10">
        <NavLink to="/" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Dashboard</NavLink>
        <NavLink to="/calendar" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Calendar</NavLink>
        <NavLink to="/kanban" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Kanban</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;