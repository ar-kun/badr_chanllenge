import { useEffect, useState } from 'react';
import { DashboardLayout } from '../Components/Layouts/DashboardLayout';
import { useParams } from 'react-router-dom';
import { getOrder } from '../Services/orderService';

export const DetailOrder = () => {
 const [order, setOrder] = useState([]);
 const { OrderId } = useParams();

 useEffect(() => {
  if (OrderId) {
   getOrder(OrderId, (status, data) => {
    if (status) {
     setOrder(data);
    }
   });
  }
 }, [OrderId]);

 const calculateTotalOrder = (products) => {
  return products.reduce((total, product) => {
   return total + product.quantity * product.product_price;
  }, 0);
 };

 const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
   style: 'currency',
   currency: 'IDR',
  }).format(amount);
 };

 return (
  <>
   <DashboardLayout title="Order Detail">
    <div className="relative overflow-x-auto">
     <dl className="mx-5 mb-5 pb-5 max-w-full text-gray-900 border-b-2 border-gray-200 dark:text-white dark:divide-gray-700">
      <div className="flex flex-col pb-3">
       <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Order ID</dt>
       <dd className="text-lg font-semibold">{order.id}</dd>
      </div>
      <div className="flex flex-col py-3">
       <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Customer Name</dt>
       <dd className="text-lg font-semibold">{order.customer_name}</dd>
      </div>
      <div className="flex flex-col pt-3">
       <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Total Order Price</dt>
       <dd className="text-lg font-semibold">{formatCurrency(calculateTotalOrder(order.products))}</dd>
      </div>
     </dl>

     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
       <tr>
        <th scope="col" className="px-6 py-3">
         Product name
        </th>
        <th scope="col" className="px-6 py-3">
         Quantity
        </th>
        <th scope="col" className="px-6 py-3">
         Price
        </th>
        <th scope="col" className="px-6 py-3">
         Total Product Price
        </th>
       </tr>
      </thead>
      <tbody>
       {order.products.map((item) => (
        <tr key={item.product_id} className="bg-white dark:bg-gray-800">
         <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          Apple MacBook Pro 17
         </th>
         <td className="px-6 py-4">{item.quantity}</td>
         <td className="px-6 py-4">{formatCurrency(item.product_price)}</td>
         <td className="px-6 py-4">{formatCurrency(item.quantity * item.product_price)}</td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   </DashboardLayout>
  </>
 );
};
