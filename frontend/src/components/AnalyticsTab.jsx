import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import LoadingSpinner from "./LoadingSpinner";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center mt-12"><LoadingSpinner /></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color="from-blue-500 to-blue-700"
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          color="from-blue-500 to-indigo-700"
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
          color="from-blue-500 to-cyan-700"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="from-blue-500 to-sky-700"
        />
      </div>
      
      <motion.div
        className="bg-gray-800/60 rounded-xl p-6 shadow-xl border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <h3 className="text-xl font-semibold text-blue-400 mb-6">Sales & Revenue Overview</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF" 
              tick={{ fill: '#E5E7EB' }}
            />
            <YAxis 
              yAxisId="left" 
              stroke="#9CA3AF" 
              tick={{ fill: '#E5E7EB' }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#9CA3AF" 
              tick={{ fill: '#E5E7EB' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                color: '#E5E7EB'
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#60A5FA"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Sales"
              dot={{ fill: '#1E40AF' }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Revenue"
              dot={{ fill: '#1D4ED8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`relative overflow-hidden rounded-xl p-6 shadow-xl ${color} bg-gradient-to-br`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative z-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-blue-200 text-sm font-medium mb-2">{title}</p>
          <h3 className="text-white text-2xl font-bold">{value}</h3>
        </div>
        <div className="p-3 rounded-lg bg-black/10 backdrop-blur-sm">
          <Icon className="h-6 w-6 text-blue-300" />
        </div>
      </div>
    </div>
    <div className="absolute -bottom-8 -right-8 opacity-20">
      <Icon className="h-24 w-24 text-blue-200" />
    </div>
  </motion.div>
);

export default AnalyticsTab;