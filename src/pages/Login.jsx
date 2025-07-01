import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ setIsLogin }) => {
    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (input.password.trim() === '' || input.password.trim().length < 8) {
            validationErrors.password = 'Please Enter Valid Password';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        if (input.email === 'admin@gmail.com' && input.password === 'admin@123') {
            localStorage.setItem('isLogin', JSON.stringify(true));
            setIsLogin(true);
            navigate('/employees');
            toast.success('LoggedIn Successfully...');
        } else {
            toast.error('Please Enter Valid Email or Password...');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl px-8 py-10 sm:p-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-indigo-700">Welcome Back 👋</h1>
                    <p className="mt-2 text-gray-500">Please sign in to your account</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={input.email}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                            placeholder="admin@gmail.com"
                            pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                            title="Please enter a valid email address"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={input.password}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                            placeholder="admin@123"
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <p className="text-red-600 mt-1 text-sm font-medium">{errors.password}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-semibold transition-transform transform hover:scale-105 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
