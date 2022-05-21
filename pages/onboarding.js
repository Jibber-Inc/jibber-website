import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
      <meta property="og:image" content="https://joinjibber.com/appclip_icon_dark.png"/> 
      <meta name="apple-itunes-app" content="app-clip-bundle-id=com.Jibber-Inc.iOS.Clip, app-clip-display=card"/>
      </Head>
      <h1>Onboarding</h1>
    </>
  );
}
