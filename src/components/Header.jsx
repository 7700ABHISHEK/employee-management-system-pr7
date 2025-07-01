import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({ setIsLogin }) => {
    const isLogin = JSON.parse(localStorage.getItem('isLogin'));
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.setItem("isLogin", JSON.stringify(false));
        setIsLogin(false);
        navigate("/");
    };

    const navLinkClass = (path) =>
        `${pathname === path || (path === '/employees' && pathname.includes('/employee'))
            ? 'text-teal-600 font-semibold'
            : 'text-gray-700 hover:text-teal-600'} transition`;

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex justify-between items-center py-4">
                    
                    <Link to="/" className="flex items-center space-x-2">
                        <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" className="h-8" />
                        <span className="text-xl font-bold text-gray-800">Flowbite</span>
                    </Link>

                        
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            type="button"
                            className="text-gray-700 hover:text-teal-600 focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Nav Links */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className={navLinkClass('/')}>Home</Link>
                        <Link to="/about" className={navLinkClass('/about')}>About</Link>
                        <Link to="/service" className={navLinkClass('/service')}>Services</Link>
                        <Link to="/contact" className={navLinkClass('/contact')}>Contact</Link>
                        {isLogin && (
                            <Link to="/employees" className={navLinkClass('/employees')}>Employees</Link>
                        )}
                        {isLogin ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
                            >
                                Log Out
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700 transition"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden flex flex-col space-y-3 pb-4 border-t pt-4">
                        <Link to="/" className={navLinkClass('/')} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                        <Link to="/about" className={navLinkClass('/about')} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                        <Link to="/service" className={navLinkClass('/service')} onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
                        <Link to="/contact" className={navLinkClass('/contact')} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                        {isLogin && (
                            <Link to="/employees" className={navLinkClass('/employees')} onClick={() => setIsMobileMenuOpen(false)}>Employees</Link>
                        )}
                        {isLogin ? (
                            <button
                                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
                            >
                                Log Out
                            </button>
                        ) : (
                            <button
                                onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }}
                                className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700 transition"
                            >
                                Login
                            </button>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
