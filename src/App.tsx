import React, { useState } from 'react';
import { Phone, Clock, ShoppingBag, MessageCircle } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Fresh Vegetables Pack",
    price: 599,
    category: "Groceries",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "Essential Fruits Bundle",
    price: 799,
    category: "Groceries",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    name: "Basic Grocery Pack",
    price: 999,
    category: "Essentials",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400"
  }
];

function App() {
  const [name, setName] = useState('');
  const [apartment, setApartment] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const handleWhatsAppOrder = () => {
    const selectedItems = products
      .filter(p => selectedProducts.includes(p.id))
      .map(p => p.name)
      .join(", ");

    const message = `New Order!\n
Name: ${name}
Apartment: ${apartment}
Phone: ${phone}
Items: ${selectedItems}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/254742568427?text=${encodedMessage}`, '_blank');
  };

  const toggleProduct = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Quick Essentials Delivery</h1>
          <div className="flex items-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>30 Min Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Order in 2 mins</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Products Grid */}
        <h2 className="text-2xl font-semibold mb-6">Available Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {products.map(product => (
            <div 
              key={product.id}
              className={`border rounded-lg overflow-hidden cursor-pointer transition-all
                ${selectedProducts.includes(product.id) ? 'ring-2 ring-green-500' : ''}`}
              onClick={() => toggleProduct(product.id)}
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-green-600 font-medium">₹{product.price}</p>
                <p className="text-sm text-gray-600">{product.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-semibold mb-6">Quick Order Form</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apartment/Address
              </label>
              <input
                type="text"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Your Address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Your Phone Number"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppOrder}
          disabled={!name || !apartment || !phone || selectedProducts.length === 0}
          className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MessageCircle className="w-5 h-5" />
          Order Now on WhatsApp
        </button>

        {/* Contact Info */}
        <div className="mt-8 text-center text-gray-600">
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" />
            <span>Call us: 0742568427</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;