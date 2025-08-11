"use client";

import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useEffect, useState } from 'react';
import api from '../../lib/utils';

// Import chart components
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Component imports
import StatsOverview from './components/StatsOverview';
import OrdersManagement from './components/OrdersManagement';
import UsersManagement from './components/UsersManagement';
import ProductsManagement from './components/ProductsManagement';
import SaleBannersManagement from './components/SaleBannersManagement';
import GalleryManagement from './components/GalleryManagement';
import ReviewsManagement from './components/ReviewsManagement';

export default function AdminPanel() {
  const { isLoading, isSuperAdmin, token } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('stats');

  // Redirect to admin login if not authenticated as super admin
  useEffect(() => {
    if (!isLoading && !isSuperAdmin) {
      router.push('/admin/login');
    }
  }, [isLoading, isSuperAdmin, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isSuperAdmin) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your e-commerce platform</p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="stats">Dashboard</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="banners">Sale Banners</TabsTrigger>
            <TabsTrigger value="gallery">Carousel Images</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stats" className="mt-6">
            <StatsOverview token={token} />
          </TabsContent>
          
          <TabsContent value="orders" className="mt-6">
            <OrdersManagement token={token} />
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <UsersManagement token={token} />
          </TabsContent>
          
          <TabsContent value="products" className="mt-6">
            <ProductsManagement token={token} />
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <ReviewsManagement token={token} />
          </TabsContent>
          
          <TabsContent value="banners" className="mt-6">
            <SaleBannersManagement token={token} />
          </TabsContent>
          
          <TabsContent value="gallery" className="mt-6">
            <GalleryManagement token={token} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 