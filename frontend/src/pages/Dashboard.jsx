import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationMenu from '../components/NavigationMenu';
import { Heart, Package, User, LogOut } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myComments, setMyComments] = useState([]);
  const [myCorrections, setMyCorrections] = useState([]);
  const navigate = useNavigate();

 

  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('currentUser');

    if (!token || !userData) {
      toast.error('You must be logged in to access the dashboard');
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      fetch('http://localhost:3000/api/shop/orders', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setOrders(Array.isArray(data) ? data : []);
        });

      fetch('http://localhost:3000/api/shop/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setWishlist(Array.isArray(data) ? data : []);
        });

      // Load user's comments
      fetch('http://localhost:3000/api/comment/mine', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setMyComments(Array.isArray(data) ? data : []));

      // Load user's corrections
      fetch('http://localhost:3000/api/correction/mine', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setMyCorrections(Array.isArray(data) ? data : []));
    } catch (err) {
      console.error('Error parsing user or loading data', err);
      toast.error('Something went wrong loading your dashboard.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationMenu />
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <NavigationMenu />

      <section className="bg-gradient-to-b from-gray-800 to-gray-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full mr-6 flex items-center justify-center">
              <User className="w-10 h-10 text-gray-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user.username}!</h1>
              <p className="text-gray-300">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <LogOut className="mr-2" size={16} />
            Logout
          </button>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
            {wishlist.length > 0 ? (
              wishlist.map((item) => (
                <div key={item.id} className="flex items-center p-4 bg-gray-50 rounded-lg mb-2">
                  <img
                    src={item.Product?.image || 'https://via.placeholder.com/50'}
                    alt={item.Product?.name}
                    className="w-12 h-12 object-cover rounded mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{item.Product?.name}</p>
                    <p className="text-sm text-gray-600">${item.Product?.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Your wishlist is empty.</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="p-4 bg-gray-50 rounded-lg mb-2">
                  <div className="flex justify-between">
                    <p className="font-semibold">{order.Product?.name}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      order.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                  <p className="text-sm text-gray-600">Total: ${order.totalPrice}</p>
                  <p className="text-xs text-gray-500">Ordered: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">You have no orders.</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Comments</h2>
            {myComments.length > 0 ? (
              myComments.map((c) => (
                <div key={c.id} className="p-4 bg-gray-50 rounded-lg mb-2">
                  <div className="flex justify-between">
                    <p className="font-semibold">{c.page}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${c.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {c.isApproved ? 'approved' : 'pending'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{c.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">You have not submitted any comments.</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Corrections</h2>
            {myCorrections.length > 0 ? (
              myCorrections.map((cr) => (
                <div key={cr.id} className="p-4 bg-gray-50 rounded-lg mb-2">
                  <div className="flex justify-between">
                    <p className="font-semibold">{cr.page} - {cr.section}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${cr.status === 'approved' ? 'bg-green-100 text-green-800' : cr.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {cr.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1"><strong>Suggested:</strong> {cr.suggestedContent}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">You have not submitted any corrections.</p>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Profile</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
