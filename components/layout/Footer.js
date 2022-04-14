import React from 'react';

export const Footer = () => {
  return (
    <div className='absolute left-0 bottom-5 font-normal text-gray-400 text-sm w-full flex justify-center'>
      {new Date().getFullYear()} - Jibber rights reserved
    </div>
  );
};