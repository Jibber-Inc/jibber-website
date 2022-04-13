import Head from 'next/head';
import React, { useState } from 'react';
import axios from 'axios';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitingForm, setSubmitingForm] = useState(false);
  const [smsMessageSent, setSmsMessageSent] = useState(false);
  const [needsNumberVerification, setNeedsNumberVerification] = useState(false);
  const [countryCode, setCountryCode] = useState();

  React.useEffect(() => {
    const fetchIpData = async () => {
      const result = await axios.get(
        'https://api.ipregistry.co/?key=tn16dlddakjvm1'
      );
      setCountryCode(result?.data?.location?.country?.code);
    };
    fetchIpData();
  }, []);

  React.useEffect(() => {
    if (phoneNumber !== '') {
      setNeedsNumberVerification(
        !isValidPhoneNumber(phoneNumber)
      );
    }
  }, [phoneNumber]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const sendSmsText = async (phoneNumber) => {
      try {
        console.log(phoneNumber);
        await axios.post('/api/send-sms', { phoneNumber });
        setSmsMessageSent(true);
        setNeedsNumberVerification(false);
      } catch (error) {
        setNeedsNumberVerification(true);
        console.error(error); // silence
      }
      setSubmitingForm(false);
    };
    setSubmitingForm(true);
    sendSmsText(phoneNumber);
  };

  return (
    <>
      <Head>
        <title>Jibber</title>
        <meta
          name='description'
          content='Jibber is a messaging app for those you are closest too. With a reimagined experience designed to encourage empathy and understanding.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <form onSubmit={handleSubmit}>
        <div className='absolute -inset-0 overflow-hidden flex flex-col justify-center mx-auto px-4 dark:bg-black'>
          <h1 className='text-4xl m-5 sm:m-10 sm:block font-bold text-center dark:text-white'>
            Jibber
          </h1>
          <div className='flex justify-center w-full'>
            {smsMessageSent ? (
              <div className='flex justify-center items-center sm:justify-start flex-col sm:flex-row'>
                <span className='text-2xl text-green-500 font-semibold'>
                  Thank you!
                </span>
                <span className='flex items-center text-1xl font-semibold text-center mt-3 sm:mt-0 ml-0 sm:ml-5 dark:text-white'>
                  You will receive an SMS with an invite soon :)
                </span>
              </div>
            ) : (
              <div className='flex flex-col sm:flex-row w-full  md:w-5/6 lg:w-3/5'>
                {/* <input
                  className={`appearance-none border block w-full bg-grey-lighter text-grey-darker rounded py-3 px-4 mb-3 mr-0 sm:mb-0 sm:mr-3  ${
                    needsNumberVerification
                      ? 'border border-red-500 text-red-500'
                      : ''
                  }`}
                  id='phone-number'
                  type='tel'
                  placeholder='+1 617 253 5702'
                  autoComplete='tel'
                  defaultValue={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                /> */}
                <PhoneInput
                  id='phone-number'
                  className={`appearance-none border block w-full bg-grey-lighter text-grey-darker rounded py-3 px-4 mb-3 mr-0 sm:mb-0 sm:mr-3 bg-white ${needsNumberVerification
                    ? 'border border-red-500 text-red-500'
                    : ''
                    }`}
                  placeholder='+1 617 253 5702'
                  onChange={(value) => setPhoneNumber(value)}
                  defaultCountry={countryCode}

                />
                <button
                  className='py-3 px-20 flex items-center justify-center rounded-md bg-green-400 text-white w-full sm:w-auto disabled:opacity-40 transition duration-500 ease-in-out'
                  type='submit'
                  disabled={phoneNumber === '' || submitingForm || needsNumberVerification}
                >
                  {submitingForm ? (
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                  ) : (
                    <>Join the waitlist</>
                  )}
                </button>
              </div>
            )}
          </div>
          <div className='absolute left-0 bottom-5 font-normal text-gray-400 text-sm w-full flex justify-center'>
            {new Date().getFullYear()} - Jibber Inc all rights reserved
          </div>
        </div>
      </form>
    </>
  );
}
