import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import {userUserStore} from '../stores/userUserStore';
const ProductCard = ({ product }) => {
    const { user } = userUserStore();
    const { addToCart } = useCartStore();
    const handleAddToCart = () => {

        if(!user )
        {
            toast.error('You need to login first', {
                icon: '🔒',
                style: {
                    backgroundColor: '#f59e0b', // Yellow-500
                    color: 'white',
                },
            });
            return;
        }
        else
        {
            addToCart(product);
        }
       
    };

    return (
        <div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-blue-900/50 shadow-lg bg-gradient-to-b from-gray-900 to-gray-800 hover:border-blue-800 transition-all duration-300'>
            <div className='relative mx-3 mt-3 flex h-72 overflow-hidden rounded-xl'>
                <img 
                    className='object-contain w-full h-full' 
                    src={product.image} 
                    alt={product.name} 
                />
                <div className='absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent' />
            </div>

            <div className='mt-4 px-5 pb-5'>
                <h5 className='text-xl font-semibold tracking-tight text-blue-400'>{product.name}</h5>
                <div className='mt-2 mb-5 flex items-center justify-between'>
                    <p>
                        <span className='text-3xl font-bold text-blue-300'>${product.price}</span>
                    </p>
                </div>
                <button
                    className='flex items-center justify-center rounded-lg bg-blue-700/80 px-5 py-3 text-center font-medium
                    text-white hover:bg-blue-600 w-full transition-all duration-200 transform hover:scale-[1.02] 
                    focus:outline-none focus:ring-2 focus:ring-blue-400'
                    onClick={handleAddToCart}
                >
                    <ShoppingCart size={20} className='mr-2' />
                    Add to cart
                </button>
            </div>
        </div>
    );
};
export default ProductCard;