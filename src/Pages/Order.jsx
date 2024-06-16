import { useEffect, useState } from 'react';
import { DashboardLayout } from '../Components/Layouts/DashboardLayout';
import { getOrders } from '../Services/orderService';
import { Link, useLocation } from 'react-router-dom';

export const Order = () => {
 const [orders, setOrders] = useState([]);

 const [success, setSuccess] = useState('');
 const location = useLocation();
 const message = location.state?.message;

 useEffect(() => {
  if (message) {
   setSuccess(message);
   const timer = setTimeout(() => {
    setSuccess('');
   }, 5000);

   return () => clearTimeout(timer);
  }
 }, [message]);

 useEffect(() => {
  getOrders((status, data) => {
   if (status) {
    setOrders(data);
   }
  });
 }, []);

 const [customerNameFilter, setCustomerNameFilter] = useState('');
 const [customerDateFilter, setCustomerDateFilter] = useState('');
 const [currentPage, setCurrentPage] = useState(1);
 const [itemsPerPage, setItemsPerPage] = useState(5);

 const filteredOrders = orders.filter((order) => {
  return order.customer_name.toLowerCase().includes(customerNameFilter.toLowerCase()) && order.created_at.includes(customerDateFilter);
 });

 const handlePageChange = (direction) => {
  const updatedCurrentPage = Math.max(Math.min(currentPage + direction, Math.ceil(filteredOrders.length / itemsPerPage)), 1);
  setCurrentPage(updatedCurrentPage);
 };

 const indexOfLastOrder = currentPage * itemsPerPage;
 const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
 const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

 const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

 const parseISODate = (isoDateString) => {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
 };
 const Pagination = () => {
  const renderPageNumbers = () => {
   const pageNumbers = [];
   for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
     <button
      key={i}
      className={i === currentPage ? 'bg-[#052A49] text-white px-4 py-2' : ' text-gray-700 px-4 py-2 border-x-2 border-[#052A49]'}
      onClick={() => setCurrentPage(i)}
     >
      {i}
     </button>
    );
   }

   return pageNumbers;
  };

  return (
   <div className="flex justify-between items-center mt-4">
    <div className="ml-4 flex items-center">
     <label htmlFor="itemsPerPage">Show</label>
     <select
      id="itemsPerPage"
      className="border-2 p-1 m-1 rounded-md"
      value={itemsPerPage}
      onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
     >
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
     </select>
     <p>per page of {orders.length} result</p>
    </div>
    <div className="border-2 border-[#052A49] rounded-md">
     <button onClick={() => handlePageChange(-1)} className=" text-gray-700 px-4 py-2 rounded-md">
      <i className="fa-solid fa-chevron-left"></i>
     </button>
     {renderPageNumbers()}
     <button onClick={() => handlePageChange(1)} className=" text-gray-700 px-4 py-2 rounded-md">
      <i className="fa-solid fa-chevron-right"></i>
     </button>
    </div>
   </div>
  );
 };

 return (
  <>
   <DashboardLayout title="Order Management">
    {success && (
     <div
      id="alert-border-2"
      className={`absolute right-0 -top-16 flex items-center p-4 mb-4 text-white max-w-xs rounded-md bg-[#27AE60] dark:text-green-400 dark:bg-gray-800 dark:border-green-800 shadow-alert-true`}
      role="alert"
     >
      <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
       <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="ms-3 text-sm font-medium">{success}</div>
     </div>
    )}
    <div className="mb-4 flex justify-between items-center">
     <div className="flex space-x-4">
      <div className="flex flex-col">
       <label htmlFor="customer">Customer Name</label>
       <div className="border rounded-md p-2 ">
        <input
         type="text"
         placeholder="Filter by customer name"
         name="customer"
         id="customer"
         value={customerNameFilter}
         onChange={(e) => setCustomerNameFilter(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass text-gray-600"></i>
       </div>
      </div>
      <div className="flex flex-col">
       <label htmlFor="create-date">Create Date</label>
       <div className="border rounded-md p-2 ">
        <input
         type="text"
         placeholder="Filter by order date"
         name="create-date"
         id="create-date"
         value={customerDateFilter}
         onChange={(e) => setCustomerDateFilter(e.target.value)}
        />
        <i className="fa-solid fa-calendar-days text-gray-600"></i>
       </div>
      </div>
     </div>
     <Link to={`/create`} className="bg-blue-500 text-white px-4 py-2 rounded-md">
      <span>Add New Order </span>
     </Link>
    </div>
    <table className="w-full text-sm text-left rtl:text-right text-[#052A49] dark:text-gray-400 border-2 ">
     <thead className="text-xs text-[#052A49] border-2 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
      <tr>
       <th scope="col" className="px-6 py-3">
        Order Id
       </th>
       <th scope="col" className="px-6 py-3">
        Customer
       </th>
       <th scope="col" className="px-6 py-3">
        Total products
       </th>
       <th scope="col" className="px-6 py-3">
        Total Price
       </th>
       <th scope="col" className="px-6 py-3">
        Order Date
       </th>
       <th scope="col" className="px-6 py-3">
        Action
       </th>
      </tr>
     </thead>
     <tbody>
      {currentOrders.map((order) => (
       <tr key={order.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-[#FAFDFF] even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
         {order.id}
        </th>
        <td className="px-6 py-4">{order.customer_name}</td>
        <td className="px-6 py-4">{order.total_products}</td>
        <td className="px-6 py-4">{order.total_price}</td>
        <td className="px-6 py-4">{parseISODate(order.created_at)}</td>
        <td className="px-6 py-4 text-2xl flex gap-8">
         <Link to={`/detail/${order.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          <i className="fa-regular fa-pen-to-square text-[#00B4FF]"></i>
         </Link>
         <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          <i className="fa-solid fa-rectangle-list text-[#00B4FF]"></i>
         </a>
         <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          <i className="fa-solid fa-trash text-[#FF0000]"></i>
         </a>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
    <Pagination />
   </DashboardLayout>
  </>
 );
};
