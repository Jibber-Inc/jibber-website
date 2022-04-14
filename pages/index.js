import Head from 'next/head';
import React, { useState } from 'react';
import { PhoneForm } from '../components/PhoneForm';
import { ThankYou } from '../components/ThankYou';

export default function Home() {
  const [joinClicked, setJoinClicked] = useState(false);
  const [smsMessageSent, setSmsMessageSent] = useState(false);

  return (
    <>
      <Head>
        <title>Jibber App</title>
        <meta
          name='description'
          content='The need to feel known is core to the human experience. That’s why we believe we can not advance as a society without a radical change to how we communicate online and we are doing so.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='absolute -inset-0 overflow-hidden flex flex-col justify-center mx-auto px-4 dark:bg-black'>
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
            <p className={'text-center dark:text-white'}>You get me</p>
            <button
              className='mx-auto py-3 mt-10 w-1/5 rounded-md bg-green-400 text-white disabled:opacity-40 transition duration-500 ease-in-out'
              type='button'
              onClick={() => setJoinClicked(true)}
            >
              Join the waitlist
            </button>
          </>
        }
      </div>

      <div className='absolute left-0 bottom-5 font-normal text-gray-400 text-sm w-full flex justify-center'>
        {new Date().getFullYear()} - Jibber rights reserved
      </div>
    </>
  );
}
