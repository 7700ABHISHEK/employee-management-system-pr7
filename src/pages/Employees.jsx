import { useNavigate } from "react-router-dom";
import EmployeesTable from "../components/EmployeesTable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState({
        search: '', department: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("employees")) || [];
        setEmployees(data);
    }, []);

    const deleteEmployee = (id) => {
        const updatedEmployee = employees.filter((employee) => employee.id !== id);
        setEmployees(updatedEmployee);
        localStorage.setItem("employees", JSON.stringify(updatedEmployee));
        toast.success("Employee Deleted Successfully...");
    };

    const filteredArr = employees.filter((employee) => {
        if (filter.search === '') {
            return employee;
        } else {
            return employee.name.toLowerCase().includes(filter.search.toLowerCase())
        }
    }).filter((employee) => {
        return filter.department === '' ? true : employee.department == filter.department
    })

    console.log(filter);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6">
            <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                    <h1 className="text-4xl font-bold text-indigo-700">Employee Details</h1>
                    <div className="flex gap-5">
                        <select
                            id="department"
                            value={filter.department}
                            onChange={(e) => {
                                setFilter({ ...filter, [e.target.id]: e.target.value })
                            }}
                            className="px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Choose a Department</option>
                            <option value="1">Designing</option>
                            <option value="2">Development</option>
                            <option value="3">Finance</option>
                            <option value="4">Sales</option>
                        </select>
                        <input
                            type="text"
                            id="search"
                            value={filter.search}
                            className="w-52 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                            placeholder="Search Your Employee"
                            onChange={(e) => {
                                setFilter({ ...filter, [e.target.id]: e.target.value });
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => navigate("/add-employees")}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                        >
                            + Add Employee
                        </button>
                    </div>
                </div>

                {filteredArr.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg">
                        <EmployeesTable employees={filteredArr} deleteEmployee={deleteEmployee} setEmployees={setEmployees} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                        <img
                            src="/NO-Employee.webp"
                            alt="No Employee"
                            className="w-60 h-auto mb-6 opacity-90"
                        />
                        <h2 className="text-2xl font-semibold text-gray-700">
                            No Employees Found
                        </h2>
                        <p className="text-gray-500 mt-2 text-center max-w-md">
                            You haven't added any employee with this name. Click the button above to start adding employee details.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Employees;
