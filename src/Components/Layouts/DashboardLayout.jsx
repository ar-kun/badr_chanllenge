/* eslint-disable react/prop-types */
import { Heading } from '../Fragments/Dashboard/Heading';
import { Sidebar } from '../Fragments/Dashboard/Sidebar';

export const DashboardLayout = ({ children, title }) => {
 return (
  <>
   <Heading>
    <Sidebar />
   </Heading>
   <main className="md:ml-64 mt-16">
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
     <h1 className="text-center text-3xl font-bold">{title}</h1>
     <div className="bg-white p-5 rounded-md my-5 relative">{children}</div>
    </div>
   </main>
   <footer className="md:ml-64 text-center -mt-5">©2021 Managed by PT. Bosnet Distribution Indonesia</footer>
  </>
 );
};
