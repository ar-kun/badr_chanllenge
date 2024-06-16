export const Sidebar = () => {
 return (
  <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-[#052A49]">
   <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
    <div className="mt-16 flex-1 flex flex-col">
     <nav className="flex-1 space-y-1">
      <a href="#" className="bg-[#084577] border-l-2 text-gray-300 hover:text-white group flex items-center px-2 py-2  text-xl">
       <span>
        <i className="fa-solid fa-clipboard-list me-3"></i>
       </span>
       Order Managenent
      </a>
     </nav>
     <div className="text-white p-5 border-t-2">
      <p>
       <i className="fa-solid fa-envelope"></i>
       <span> Support</span>
       <span className="block ms-5">cs@bosnet.com</span>
      </p>
     </div>
    </div>
   </div>
  </div>
 );
};
