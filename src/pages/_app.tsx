import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Amplify, AuthModeStrategyType } from 'aws-amplify';
import awsmobile from '../aws-exports';
import { useEffect, useState } from 'react';
import { UserContext } from '../contexts/user/user';
import { CognitoUser } from 'amazon-cognito-identity-js';


Amplify.configure({
  ...awsmobile,
  ssr: true,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
  }
});

function MyApp({ Component, pageProps }: AppProps) {

  const [user, setUser] = useState<CognitoUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}

export default MyApp
