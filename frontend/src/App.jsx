import {Navigate , Route , Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import {userUserStore} from './stores/userUserStore.js';
import { useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import AdminPage from './pages/AdminPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import { useCartStore } from './stores/useCartStore.js';
import PurchaseSuccessPage from './pages/PurchaseSuccessPage';
import PurchaseCancelPage from './pages/PurchaseCancelPage';
function App() {
  const {user , checkAuth, checkingAuth} = userUserStore();
  const {getCartItems} = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if(user)
    {
      getCartItems();
    }
  }, [user, getCartItems]);
  
  if(checkingAuth)
  {
    return <LoadingSpinner />
  }
  return (
    <div className='min-h-screen bg-gray-900 text-black relative overflow-hidden'>
      {/* White background with blue gradient */}
        <div className='absolute inset-0 overflow-hidden bg-white'>
          <div className='absolute inset-0'>
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(147,197,253,0.3)_0%,rgba(30,64,175,0.1)_45%,rgba(255,255,255,0)_100%)]' />
          </div>
        </div>

      <div className='relative z-50 flex flex-col min-h-screen'>
        <Navbar />
        <div className='flex-grow'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to = '/' /> } />
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to = '/' />  } />
            <Route path="/secret-dashboard" element={user?.role === 'admin' ? <AdminPage /> : <Navigate to = '/login' />} />
            <Route path='/category/:category' element={<CategoryPage />} />
            <Route path='/cart' element={user ? <CartPage /> : <Navigate to = '/login' />} />
            <Route
						path='/purchase-success'
						element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}/>
					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
          </Routes>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;

