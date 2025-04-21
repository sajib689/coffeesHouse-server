'use client'
import { useGetCoffeeByIdQuery } from '@/features/coffees/coffeesApi';
import { useCreateOrderMutation } from '@/features/orders/ordersApi';
import Loader from '@/util/Loader';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { AuthContext } from '@/context/AuthProvider';

const CoffeeDetailsPage = () => {
  const { id } = useParams()

    const router = useRouter();
      const { user } = useContext(AuthContext);
      const { data: coffee, isLoading, error } = useGetCoffeeByIdQuery(id);
      const [createOrder, { isLoading: isOrdering }] = useCreateOrderMutation();
    
      const [address, setAddress] = useState({
        street: '',
        city: '',
        postalCode: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
      };
    
      const handleBuyNow = async () => {
        if (!user || !coffee) return;
    
        const order = {
          productName: coffee.name,
          price: coffee.price,
          email: user.email,
          image: coffee.image,
          city: address.city,
          postalCode: address.postalCode,
          street: address.street,
          status: 'pending', // default status
        };
    
        try {
          const res = await createOrder(order).unwrap();
          toast.success(`Thanks for your order, ${user.displayName || 'Customer'}!`);
          // Optional: Reset form
          setAddress({ street: '', city: '', postalCode: '' });
          router.push('/orders')
        } catch (err) {
          console.error('Failed to place order:', err);
          toast.error('Something went wrong while placing your order.');
        }
      };
    
      const isFormComplete = address.street && address.city && address.postalCode;
    
      if (isLoading && isOrdering) {
        return <Loader />
      }
    
      if (error || !coffee) {
        return <p className="text-center text-red-500 mt-10">Failed to load coffee details.</p>;
      }
    
    return (
         <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Coffee Info */}
              <Toaster position="top-center" reverseOrder={false} />
        
              <div>
                <div className="relative w-full h-80 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={coffee?.image}
                    alt={coffee?.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
                <h1 className="text-3xl font-bold text-[#6F4F37] mb-2">{coffee?.name}</h1>
                <p className="text-gray-500 mb-1">Category: {coffee?.category}</p>
                <p className="text-lg text-gray-700 mb-4">{coffee?.description}</p>
                <p className="text-2xl font-bold text-[#6F4F37] mb-6">${coffee?.price}</p>
              </div>
        
              {/* User Info + Address Form + Buy Button */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-[#6F4F37] mb-4">User Information</h2>
                {user ? (
                  <div className="space-y-2 mb-6">
                    <p><strong>Name:</strong> {user?.displayName || "N/A"}</p>
                    <p><strong>Email:</strong> {user?.email || "N/A"}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 mb-6">No user is logged in.</p>
                )}
        
                <h3 className="text-xl font-medium text-[#6F4F37] mb-2">Shipping Address</h3>
                <form className="space-y-4 mb-6">
                  <input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    value={address.street}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-[#6F4F37]"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-[#6F4F37]"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={address.postalCode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-[#6F4F37]"
                  />
                </form>
        
                <button
                  onClick={handleBuyNow}
                  disabled={!isFormComplete || isOrdering}
                  className={`w-full px-6 py-3 rounded-lg transition ${isFormComplete && !isOrdering ? 'bg-[#6F4F37] text-white hover:bg-[#4e3f29]' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                >
                  {isOrdering ? "Processing..." : "Buy Now"}
                </button>
              </div>
            </div>
    );
};

export default CoffeeDetailsPage;