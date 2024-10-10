import React from 'react';
import Link from 'next/link';
const Navbar = () => {
  return (
    <nav className="bg-transparent p-4">
      <ul className="flex justify-center gap-x-12">
        <li className='border-2 px-8 py-2'>
          <Link href="/" className="text-blue-500 font-bold hover:opacity-80 hover:scale-110">
            Home
          </Link>
        </li>
        <li className='border-2 px-8 py-2 bg-wheat-500'>
          <Link href="/CreateOrder" className="text-blue-500 font-bold hover:opacity-90">
            Create Order
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
