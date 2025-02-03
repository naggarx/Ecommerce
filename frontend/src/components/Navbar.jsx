import {ShoppingCart , UserPlus , LogIn , LogOut , Lock} from 'lucide-react'
import {Link} from 'react-router-dom'
import {userUserStore} from '../stores/userUserStore';
import { useCartStore } from '../stores/useCartStore';
const Navbar = () => {
    const {user , logout} = userUserStore();
    const isAdmin = user?.role === 'admin';
    const {cart} = useCartStore();
    
    return (
        <header className='fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-40 transition-all duration-300 border-b border-blue-200/30'>
            <div className='container mx-auto px-4 py-3'>
                <div className='flex flex-wrap justify-between items-center'>
                    <Link to='/' className='text-2xl font-bold text-blue-600 items-center space-x-2 flex hover:text-blue-700 transition-colors'>
                        E-Commerce
                    </Link>
    
                    <nav className='flex flex-wrap items-center gap-4'>
                        <Link
                            to={"/"}
                            className='text-slate-600 hover:text-blue-600 transition-colors duration-300 ease-in-out'
                        >
                            Home
                        </Link>
                        {user && (
                            <Link
                                to={"/cart"}
                                className='relative group text-slate-600 hover:text-blue-600 transition-colors duration-300 ease-in-out'
                            >
                                <ShoppingCart className='inline-block mr-1 group-hover:text-blue-600' size={20} />
                                <span className='hidden sm:inline'>Cart</span>
                                {cart.length > 0 && (
                                    <span
                                        className='absolute -top-2 -left-2 bg-blue-500 text-white rounded-full px-2 py-0.5 
                                        text-xs group-hover:bg-blue-600 transition-colors duration-300'
                                    >
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        )}
                        {isAdmin && (
                            <Link
                                className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md font-medium
                                 transition-colors duration-300 ease-in-out flex items-center'
                                to={"/secret-dashboard"}
                            >
                                <Lock className='inline-block mr-1' size={18} />
                                <span className='hidden sm:inline'>Dashboard</span>
                            </Link>
                        )}
    
                        {user ? (
                            <button
                                className='bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 
                                rounded-md flex items-center transition-colors duration-300 ease-in-out'
                                onClick={logout}
                            >
                                <LogOut size={18} />
                                <span className='hidden sm:inline ml-2'>Log Out</span>
                            </button>
                        ) : (
                            <>
                                <Link
                                    to={"/signup"}
                                    className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 
                                    rounded-md flex items-center transition-colors duration-300 ease-in-out'
                                >
                                    <UserPlus className='mr-2' size={18} />
                                    Sign Up
                                </Link>
                                <Link
                                    to={"/login"}
                                    className='bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 
                                    rounded-md flex items-center transition-colors duration-300 ease-in-out'
                                >
                                    <LogIn className='mr-2' size={18} />
                                    Login
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar