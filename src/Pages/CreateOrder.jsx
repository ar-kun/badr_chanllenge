import { useEffect, useState } from 'react';
import { DashboardLayout } from '../Components/Layouts/DashboardLayout';
import { getProducts } from '../Services/productService';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../Services/orderService';

export const CreateOrder = () => {
 const [products, setProducts] = useState([]);
 const [productDetails, setProductDetails] = useState([{}]);
 const [success, setSuccess] = useState('');
 const [submit, setSubmit] = useState(false);
 const navigate = useNavigate();

 useEffect(() => {
  getProducts((status, data) => {
   if (status) {
    setProducts(data);
   }
  });
 }, []);

 const handleProductChange = (e, index) => {
  const productId = e.target.value;
  const updatedProductDetails = [...productDetails];
  updatedProductDetails[index] = {
   ...updatedProductDetails[index],
   product_id: parseInt(productId),
   price: products.find((product) => product.id === parseInt(productId))?.price || 0,
  };
  setProductDetails(updatedProductDetails);
 };

 const handleQuantityChange = (e, index) => {
  const quantity = e.target.value;
  const updatedProductDetails = [...productDetails];
  updatedProductDetails[index] = {
   ...updatedProductDetails[index],
   quantity: parseInt(quantity),
  };
  setProductDetails(updatedProductDetails);
 };

 const calculateTotalPrice = (price, quantity) => {
  return price * quantity;
 };

 const handleAddMoreProduct = () => {
  setProductDetails([...productDetails, {}]);
 };

 const handleCreateOrder = (e) => {
  e.preventDefault();
  const data = {
   customer_name: e.target.customer_name.value,
   products: productDetails
    .map((product) => ({
     product_id: product.product_id,
     quantity: product.quantity,
    }))
    .filter((product) => product.product_id && product.quantity),
  };
  createOrder(data, (status, data) => {
   if (status) {
    setSuccess(data.success);
    setSubmit(true);
    e.target.customer_name.value = '';
    setProductDetails([{ product_id: '', quantity: '' }]);
    if (data.success) {
     navigate('/', { state: { message: 'Your data has been successfully saved.' } });
    }
   }
  });
 };

 return (
  <>
   <DashboardLayout title="Add New Order">
    {submit && (
     <div
      id="alert-border-2"
      className={`absolute right-0 -top-16 flex items-center p-4 mb-4 text-white max-w-xs rounded-md ${
       success
        ? 'bg-[#27AE60] dark:text-green-400 dark:bg-gray-800 dark:border-green-800 shadow-alert-true'
        : 'bg-[#EB5757] dark:text-red-400 dark:bg-gray-800 dark:border-red-800 shadow-alert-false'
      }`}
      role="alert"
     >
      <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
       <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="ms-3 text-sm font-medium">{success ? 'Your data has been successfully saved.' : 'You should fill all of mandatory field.'}</div>
     </div>
    )}
    <form onSubmit={handleCreateOrder} className="w-full max-w-full">
     <div className="flex flex-col">
      <div className="flex flex-wrap w-1/2">
       <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="customer_name">
         Customer Name
        </label>
        <input
         className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
         id="customer_name"
         name="customer_name"
         type="text"
         placeholder="Input customer name"
        />
       </div>
      </div>
      <hr className="my-5" />
      {productDetails.map((product, index) => (
       <div key={index} className="w-full flex flex-wrap my-2">
        <h2 className="text-slate-400 text-sm mx-3 w-full mb-2">Product Detail</h2>
        <div className="w-full md:w-1/2 px-3 my-2 md:mb-0">
         <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`product_name_${index}`}>
          Product Name
         </label>
         <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id={`product_name_${index}`}
          name={`product_name_${index}`}
          value={product.product_id || ''}
          onChange={(e) => handleProductChange(e, index)}
         >
          <option value="" disabled>
           Select product name
          </option>
          {products.map((product) => (
           <option key={product.id} value={product.id}>
            {product.name}
           </option>
          ))}
         </select>
        </div>
        <div className="w-full md:w-1/2 px-3 my-2 md:mb-0">
         <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`price_${index}`}>
          Price
         </label>
         <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id={`price_${index}`}
          name={`price_${index}`}
          disabled={!product.product_id}
         >
          <option value="" disabled selected={!product.product_id}>
           {product.product_id ? 'Select price' : 'You need select product name'}
          </option>
          <option value={product.price}>{product.price}</option>
         </select>
        </div>
        <div className="w-full md:w-1/2 px-3 my-2 md:mb-0">
         <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`quantity_${index}`}>
          Quantity
         </label>
         <input
          type="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id={`quantity_${index}`}
          name={`quantity_${index}`}
          value={product.quantity || ''}
          onChange={(e) => handleQuantityChange(e, index)}
          placeholder="Input quantity"
         />
        </div>
        <div className="w-full md:w-1/2 px-3 my-2 md:mb-0">
         <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`total_price_${index}`}>
          Total Product Price
         </label>
         <input
          type="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id={`total_price_${index}`}
          placeholder="You need to input quantity"
          value={product.quantity ? calculateTotalPrice(product.price, product.quantity) : ''}
          disabled={!product.quantity}
         />
        </div>
       </div>
      ))}
      <div
       type="button"
       onClick={handleAddMoreProduct}
       className="max-w-xs my-2 text-white bg-[#052A49] hover:bg-[#14446c] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-14 py-2.5 text-center dark:bg-[#052A49] dark:hover:bg-[#208be1] dark:focus:ring-[#052A49] mx-3"
      >
       Add More Product
      </div>
      <hr className="my-5" />
      <div className="flex flex-wrap w-1/2">
       <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-total-order-price">
         Total Order Price
        </label>
        <input
         className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
         id="grid-total-order-price"
         type="text"
         placeholder="Total Order Price"
         value={productDetails.reduce((acc, curr) => acc + (curr.quantity ? calculateTotalPrice(curr.price, curr.quantity) : 0), 0)}
         readOnly
        />
       </div>
      </div>
      <div className="mt-10">
       <button
        type="submit"
        className="text-white bg-[#1BA8DF] hover:bg-[#1580ab] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-14 py-2.5 text-center dark:bg-[#1BA8DF] dark:hover:bg-[#11b3f3] dark:focus:ring-[#1BA8DF] mx-3"
       >
        Save
       </button>
       <Link
        to={`/`}
        className="text-gray-700 bg-white hover:bg-[#43caff] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-14 py-2.5 text-center dark:bg-white dark:hover:bg-[#11b3f3] dark:focus:ring-whibg-white border-2"
       >
        Back
       </Link>
      </div>
     </div>
    </form>
   </DashboardLayout>
  </>
 );
};
