
import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { PhoneForm } from '../components/PhoneForm';
import { ThankYou } from '../components/ThankYou';

export default function Home() {
  const [joinClicked, setJoinClicked] = useState(false);
  const [smsMessageSent, setSmsMessageSent] = useState(false);

  return (
    <>
      <Header />

      <div className='absolute -inset-0 overflow-hidden flex flex-col justify-center mx-auto px-4 dark:bg-jibber-bg'>
        {joinClicked ?
          <div className='flex justify-center w-full'>
            {smsMessageSent ? (
              <ThankYou />
            ) : (
              <PhoneForm onMessageSent={setSmsMessageSent} />
            )}
          </div>
          :
          <>
            <h1 className='text-4xl my-3 sm:m-3 sm:block font-bold text-center dark:text-white'>
              Jibber
            </h1>
            <p className='text-center dark:text-white'>You get me.</p>
            <button
              className='mx-auto py-3 px-3 mt-10 sm:w-1/4 w-1/2 rounded-md bg-jibber text-white disabled:opacity-40 transition duration-500 ease-in-out'
              type='button'
              onClick={() => setJoinClicked(true)}
            >
              Join the waitlist
            </button>
          </>
        }
      </div>

      <Footer />
    </>
  );
}
