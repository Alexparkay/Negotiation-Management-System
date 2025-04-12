// import React from 'react';
import { MdOutlineBusinessCenter } from 'react-icons/md';

const Footer = () => {
  return (
    <div className="w-full px-5 py-5 xl:m-0 mt-5 flex justify-between gap-2 font-semibold xl:text-sm">
      <span className="hidden xl:inline-flex text-sm">
        Marx Technology - Supplier Portal
      </span>
      <div className="flex gap-1 items-center">
        <span className="text-sm">© Marx Technology - Supplier Relationship Management</span>
        <MdOutlineBusinessCenter className="text-2xl xl:text-xl 2xl:text-2xl text-primary" />
      </div>
    </div>
  );
};

export default Footer;
