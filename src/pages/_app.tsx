import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Amplify, AuthModeStrategyType } from 'aws-amplify';
import awsmobile from '../aws-exports';
import { useEffect, useState } from 'react';
import { UserContext } from '../contexts/user/user';
import AuthProvider from '../components/lib/auth/AuthProvider';
import { CartProvider } from "react-use-cart";

Amplify.configure({
  ...awsmobile,
  ssr: true,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
  }
});

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>


  )
}

export default MyApp
