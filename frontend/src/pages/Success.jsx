import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../redux/constants";
const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrCreateOrder = async () => {
      if (!sessionId) return;

      try {
        // ✅ Step 1: Create the order first
        await axios.post(`${BASE_URL}/api/v1/orders/create-from-session`, { session_id: sessionId });

        // ✅ Step 2: Then fetch the order
        const { data } = await axios.get(`${BASE_URL}/api/v1/orders/session/${sessionId}`);
        setOrder(data);
      } catch (error) {
        console.error("Failed to create or fetch order", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateOrder();
  }, [sessionId]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful 🎉</h1>
      {order ? (
        <>

  <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-green-600">✅ Payment Successful</h1>
      <p className="text-gray-600 mt-2">Thank you for your purchase, {order.paymentResult?.email_address}!</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">📦 Order Summary</h2>
        <p><span className="font-medium">Order ID:</span> {order._id}</p>
        <p><span className="font-medium">Payment ID:</span> {order.paymentResult?.id}</p>
        <p><span className="font-medium">Paid At:</span> {new Date(order.paidAt).toLocaleString()}</p>
        <p><span className="font-medium">Total Amount:</span> <span className="text-green-600 font-bold">${order.totalPrice?.toFixed(2)}</span></p>
        <p>
          <span className="font-medium">Status:</span>{" "}
          <span className="inline-block px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded">
            {order.status}
          </span>
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">📦 Shipping Address</h2>
        <p><span className="font-medium">City:</span> {order.shippingAddress?.city}</p>
        <p><span className="font-medium">Country:</span> {order.shippingAddress?.country}</p>
        <p><span className="font-medium">Postal Code:</span> {order.shippingAddress?.postalCode}</p>
      </div>
    </div>

    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">🛒 Ordered Items</h2>
      <div className="space-y-4">
        {order.orderItems.map((item) => (
          <div key={item._id} className="flex items-center gap-4 border p-4 rounded-md">
            <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded" />
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-500">Brand: {item.brand?.name}</p>
              <p className="text-sm">Quantity: {item.quantity}</p>
              <p className="text-sm text-green-600 font-semibold">${item.price?.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

        </>
      ) : (
        <p>Order not found.</p>
      )}
    </div>
  );
};

export default Success;
