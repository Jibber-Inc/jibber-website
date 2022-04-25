import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { LoadingIcon } from './icons/Loading';
import 'react-phone-number-input/style.css';

export const PhoneForm = ({ onMessageSent }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitingForm, setSubmitingForm] = useState(false);
  const [needsNumberVerification, setNeedsNumberVerification] = useState(false);
  const [countryCode, setCountryCode] = useState();

  useEffect(() => {
    const fetchIpData = async () => {
      const result = await axios.get(
        'https://api.ipregistry.co/?key=tn16dlddakjvm1'
      );
      setCountryCode(result?.data?.location?.country?.code);
    };
    fetchIpData();
  }, []);

  useEffect(() => {
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
        onMessageSent(true);
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
    <form className={'w-full'} onSubmit={handleSubmit}>
      <h1 className='text-4xl my-3 sm:m-3 sm:block font-bold text-center dark:text-white'>
        Enter your phone number.
      </h1>
      <p className={'text-center dark:text-white mb-10'}>(iPhone only)</p>
      <div className='flex flex-col sm:flex-row w-full md:w-5/6 lg:w-3/5 m-auto'>
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
          className='py-3 w-full sm:w-48 flex items-center justify-center rounded-md bg-jibber text-white disabled:opacity-40 transition duration-500 ease-in-out'
          type='submit'
          disabled={phoneNumber === '' || submitingForm || needsNumberVerification}
        >
          {submitingForm ? (
            <LoadingIcon />
          ) : (
            <>Join</>
          )}
        </button>
      </div>
    </form>
  );
};