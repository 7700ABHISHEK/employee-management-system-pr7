import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmployeesTable = ({ employees, deleteEmployee, setEmployees }) => {

    const [sort, setSort] = useState(null)

    useEffect(() => {
        if (!sort) return;

        if (sort == "ASC") {
            const sortedEmployees = employees.sort((a, b) => a.salary - b.salary);
            setEmployees(sortedEmployees);
        } else {
            const sortedEmployees = employees.sort((a, b) => b.salary - a.salary);
            setEmployees(sortedEmployees);
        }
    }, [sort]);

    const getDepartment = (id) => {
        switch (id) {
            case 1:
                return "Designing";
            case 2:
                return "Development";
            case 3:
                return "Finance";
            case 4:
                return "Sales";
            default:
                return "Unknown";
        }
    };

    const handleDelete = (id) => {
        deleteEmployee(id);
    };

    const handleSort = () => {
        setSort(sort == "ASC" ? "DSC" : "ASC")
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Number
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 flex gap-5 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <p>Salary (₹)</p>
                            <div className="w-10 text-black cursor-pointer" onClick={handleSort}>
                                {
                                    sort == "ASC" ? <i class="ri-sort-asc"></i> : <i class="ri-sort-desc"></i>
                                }
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Department
                        </th>
                        <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-100">
                    {employees.map((employee, idx) => (
                        <tr
                            key={employee.id}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {idx + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {employee.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {Number(employee.salary).toLocaleString('en-IN')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {getDepartment(Number(employee.department))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm flex justify-center gap-4">
                                <Link
                                    to={`/edit-employee/${employee.id}`}
                                    className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(employee.id)}
                                    className="text-red-600 hover:text-red-800 font-semibold transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeesTable;
