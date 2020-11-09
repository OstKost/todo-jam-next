import React from 'react';

export default function Navbar({ user }) {
  return (
    <nav className='flex justify-between'>
      <p className='text-2xl font-bold text-gray-800'>My Todos</p>
      <div className='flex'>
        {user && (
          <a
            href='/api/logout'
            className='rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 ml-2'
          >
            Logout
          </a>
        )}
        {!user && (
          <a
            href='/api/login'
            className='rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 ml-2'
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
