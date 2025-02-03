import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";

import {userUserStore} from "../stores/userUserStore.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login , loading} = userUserStore();

  const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, password);
		login(email, password);
	};
  return (
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white min-h-screen'>
        <motion.div
            className='sm:mx-auto sm:w-full sm:max-w-md'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className='mt-6 text-center text-3xl font-extrabold text-blue-600'>Login To Your Account</h2>
        </motion.div>

        <motion.div
            className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <div className='bg-white border border-blue-100 py-8 px-4 shadow-md sm:rounded-lg sm:px-10'>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-slate-600'>
                            Email address
                        </label>
                        <div className='mt-1 relative rounded-md shadow-sm'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Mail className='h-5 w-5 text-blue-400' aria-hidden='true' />
                            </div>
                            <input
                                id='email'
                                type='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='block w-full px-3 py-2 pl-10 bg-white border border-slate-300 rounded-md 
                                shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 
                                focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                placeholder='you@example.com'
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor='password' className='block text-sm font-medium text-slate-600'>
                            Password
                        </label>
                        <div className='mt-1 relative rounded-md shadow-sm'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Lock className='h-5 w-5 text-blue-400' aria-hidden='true' />
                            </div>
                            <input
                                id='password'
                                type='password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='block w-full px-3 py-2 pl-10 bg-white border border-slate-300 rounded-md 
                                shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 
                                focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                placeholder='••••••••'
                            />
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='w-full flex justify-center py-2 px-4 border border-transparent 
                        rounded-md shadow-sm text-sm font-medium text-white bg-blue-600
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                          focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50'
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                                Loading...
                            </>
                        ) : (
                            <>
                                <LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
                                Login
                            </>
                        )}
                    </button>
                </form>

                <p className='mt-8 text-center text-sm text-slate-600'>
                    Not a member?{" "}
                    <Link 
                        to='/signup' 
                        className='font-medium text-blue-600 hover:text-blue-700 transition-colors'
                    >
                        Sign up now <ArrowRight className='inline h-4 w-4 ml-1' />
                    </Link>
                </p>
            </div>
        </motion.div>
    </div>
);
}

export default LoginPage