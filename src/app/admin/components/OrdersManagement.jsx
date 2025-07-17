"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import api from '../../../lib/utils';

function OrderStatusBadge({ status }) {
  const getVariant = (status) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'cancelled': return 'destructive';
      case 'pending': return 'secondary';
      default: return 'outline';
    }
  };
  
  return <Badge variant={getVariant(status)}>{status}</Badge>;
}

export default function OrdersManagement({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState({});

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/admin/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const updateStatus = async (id, status) => {
    setUpdating((u) => ({ ...u, [id]: true }));
    try {
      await api.patch(`/admin/orders/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setUpdating((u) => ({ ...u, [id]: false }));
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-lg">Loading orders...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-red-500">Error loading orders: {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders Management</CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage customer orders and update their status
        </p>
      </CardHeader>
      <CardContent>
        {!orders.length ? (
          <div className="text-center py-8 text-muted-foreground">
            No orders found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 text-left font-medium">Order ID</th>
                  <th className="p-3 text-left font-medium">Customer</th>
                  <th className="p-3 text-left font-medium">Items</th>
                  <th className="p-3 text-left font-medium">Total</th>
                  <th className="p-3 text-left font-medium">Status</th>
                  <th className="p-3 text-left font-medium">Date</th>
                  <th className="p-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">#{order.id}</td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{order.users?.name || 'N/A'}</div>
                        <div className="text-xs text-muted-foreground">{order.users?.email}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="max-w-xs">
                        {order.order_items.map(item => (
                          <div key={item.id} className="text-xs">
                            {item.products?.name} × {item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 font-medium">₹{parseFloat(order.total_amount).toLocaleString()}</td>
                    <td className="p-3">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                      <br />
                      {new Date(order.created_at).toLocaleTimeString()}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        {order.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="default"
                              disabled={updating[order.id]} 
                              onClick={() => updateStatus(order.id, 'delivered')}
                            >
                              {updating[order.id] ? 'Updating...' : 'Mark Delivered'}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              disabled={updating[order.id]} 
                              onClick={() => updateStatus(order.id, 'cancelled')}
                            >
                              {updating[order.id] ? 'Updating...' : 'Cancel'}
                            </Button>
                          </>
                        )}
                        {order.status !== 'pending' && (
                          <span className="text-xs text-muted-foreground">
                            No actions available
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 