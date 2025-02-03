import {create} from 'zustand';
import toast from 'react-hot-toast';
import axios from '../lib/axios';

export const useProductStore = create( (set) => ({
    products: [],
    loading : false,
    setProducts: (products) => set({products}),

    createProduct: async (newProduct) => {
        set({loading: true});
        try {
            const res = await axios.post('/products', newProduct);
            set((state) => ({
                products: [...state.products, res.data],
                loading: false,
                
            }));
            toast.success('Product created successfully');
        } catch (error) {
            toast.error(error.response.data.error);
            set({loading: false});
        }
        set({loading: false});
    },

    fetchAllProducts: async () => {
        set({loading: true});
        try {
            const res = await axios.get('/products');
            set({products: res.data.products, loading: false});
        } catch (error) {
            toast.error(error.response.data.error || 'Failed to fetch products');
            set({loading: false});
        }
    },
    fetchProductsByCategory: async (category) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/products/category/${category}`);
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},
    deleteProduct: async (id) => {
        set({loading: true});
        try {
            await axios.delete(`/products/${id}`);
            set((state) => ({
                products: state.products.filter((product) => product._id !== id),
                loading: false,
            }));
            toast.success('Product deleted successfully');
        } catch (error) {
            toast.error(error.response.data.error);
            set({loading: false});
        }
    },

    toggleFeaturedProduct: async (id) => {
        set({loading: true});
        try {
            const res = await axios.patch(`/products/${id}`);
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === id ? {...product, isFeatured: res.data.isFeatured} : product
                ),
                loading: false,
            }));
            toast.success('Product updated successfully');
        } catch (error) {
            toast.error(error.response.data.error);
            set({loading: false});
        }
    
    },
    fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
		}
	},


}));
