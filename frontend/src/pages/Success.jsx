// import { useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const Success = () => {
//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get("session_id");

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState("");

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         if (sessionId) {
//           const { data } = await axios.get(`http://localhost:8000/api/v1/orders/session/${sessionId}`);
//           if (data && data._id) {
//             setOrder(data);
//           } else {
//             setErrorMsg("Order details are missing or invalid.");
//           }
//         } else {
//           setErrorMsg("Missing session ID in URL.");
//         }
//       } catch (error) {
//         console.error("❌ Failed to fetch order:", error);
//         setErrorMsg("Something went wrong while retrieving your order.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [sessionId]);

//   if (loading) {
//     return <p className="text-center py-10">Loading order details...</p>;
//   }

//   return (
//     <div className="p-6 text-center">
//       <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful 🎉</h1>

//       {errorMsg ? (
//         <p className="text-red-500">{errorMsg}</p>
//       ) : order ? (
//         <>
//           <p className="mb-4">Thank you for your purchase! Your order has been placed.</p>
//           <div className="mt-4 text-left max-w-md mx-auto bg-gray-100 p-4 rounded shadow">
//             <h2 className="text-lg font-semibold mb-2">🧾 Order Summary</h2>
//             <p><strong>Order ID:</strong> {order._id}</p>
//             <p><strong>Total:</strong> ${order.totalPrice?.toFixed(2)}</p>
//             <p><strong>Paid At:</strong> {new Date(order.paidAt).toLocaleString()}</p>
//             <p><strong>Payment ID:</strong> {order.paymentResult?.id}</p>
//             <p><strong>Status:</strong> {order.status}</p>
//           </div>
//         </>
//       ) : (
//         <p>Order not found.</p>
//       )}
//     </div>
//   );
// };

// export default Success;
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
          <p>Your order has been placed successfully.</p>
          <div className="mt-4 text-left max-w-md mx-auto bg-gray-100 p-4 rounded">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ${order.totalPrice?.toFixed(2)}</p>
            <p><strong>Paid At:</strong> {new Date(order.paidAt).toLocaleString()}</p>
            <p><strong>Payment ID:</strong> {order.paymentResult?.id}</p>
          </div>
        </>
      ) : (
        <p>Order not found.</p>
      )}
    </div>
  );
};

export default Success;
