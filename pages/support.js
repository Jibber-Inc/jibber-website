
import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export default function Support() {

  return (
    <>
      <Header />
      <div className='absolute -inset-0 overflow-hidden flex flex-col justify-center mx-auto px-4 dark:bg-jibber-bg'>
        <h1 className='text-4xl my-3 sm:m-3 sm:block font-bold text-center dark:text-white'>
          Support
        </h1>
        <p className='text-center dark:text-white'>Please don’t hesitate to contact us for any further assistance.</p>
        <a
          className='text-center mx-auto py-3 px-3 mt-10 sm:w-1/4 w-1/2 rounded-md bg-jibber text-white disabled:opacity-40 transition duration-500 ease-in-out'
          href="mailto:benji@joinjibber.com"
        >
          Contact
        </a>
      </div>
      <Footer />
    </>
  );
}
