import React from 'react';
import Head from 'next/head';

export const Header = () => {
  return (
    <Head>
      <title>Jibber</title>
      <meta
        name='description'
        content='Jibber is a messaging app for those you are closest too. With a reimagined experience designed to encourage empathy and understanding.'
      />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};