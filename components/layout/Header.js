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
      <link rel='icon' href='/favicon.png' />
      <meta property="og:image" content="https://joinjibber.com/appclip_icon_dark.png"/> 
      <meta name="apple-itunes-app" content="app-clip-bundle-id=com.Jibber-Inc.iOS.Clip, app-clip-display=card, app-id=1602024272"/>
    </Head>
  );
};