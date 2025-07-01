import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmployee = () => {
    const [input, setInput] = useState({
        name: '', salary: '', department: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (input.name.trim() === '') {
            validationErrors.name = "Please Enter Valid Name";
        }

        if (input.salary < 1000) {
            validationErrors.salary = "Please Enter appropriate salary";
        }

        if (input.department === '') {
            validationErrors.department = "Please select a department";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const employeesDetail = { ...input, id: Date.now() };

        const employees = JSON.parse(localStorage.getItem("employees")) || [];
        employees.push(employeesDetail);

        localStorage.setItem("employees", JSON.stringify(employees));
        setInput({ name: '', salary: '', department: '' });
        navigate('/employees');
        toast.success("Employee Added Successfully...");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center p-6">
            <div className="bg-white shadow-xl rounded-lg w-full max-w-3xl p-8 space-y-6">
                <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">Add New Employee</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Employee Name</label>
                        <input
                            type="text"
                            id="name"
                            value={input.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600 font-medium">{errors.name}</p>}
                    </div>

                    {/* Salary Field */}
                    <div>
                        <label htmlFor="salary" className="block mb-1 text-sm font-medium text-gray-700">Salary</label>
                        <input
                            type="number"
                            id="salary"
                            value={input.salary}
                            onChange={handleChange}
                            placeholder="₹1000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.salary && <p className="mt-1 text-sm text-red-600 font-medium">{errors.salary}</p>}
                    </div>

                    {/* Department Field */}
                    <div>
                        <label htmlFor="department" className="block mb-1 text-sm font-medium text-gray-700">Department</label>
                        <select
                            id="department"
                            value={input.department}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Choose a Department</option>
                            <option value="1">Designing</option>
                            <option value="2">Development</option>
                            <option value="3">Finance</option>
                            <option value="4">Sales</option>
                        </select>
                        {errors.department && <p className="mt-1 text-sm text-red-600 font-medium">{errors.department}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
                        >
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
