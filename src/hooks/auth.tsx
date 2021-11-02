import React, { createContext, useContext, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthReponse {
  type: string;
  params: {
    access_token: string;
  };
}

interface IAuthContextData {
  user: IUser;
  signInWithGoogle: () => void;
  signInWithApple: () => void;
  signOut: () => void;
  userStorageLoading: boolean;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const signInWithGoogle = async () => {
    try {
      const CLIENT_ID = process.env.CLIENT_ID;
      const REDIRECT_URI = process.env.REDIRECT_URI;
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params, type } = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthReponse;
      if (type === 'success') {
        const reponse = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await reponse.json();
        const useData = {
          id: String(userInfo.id),
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture,
        };
        setUser(useData);
        await AsyncStorage.setItem('@gofinance:user', JSON.stringify(useData));
      }
    } catch (error: any | string) {
      throw new Error(error);
    }
  };

  const signInWithApple = async () => {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credentials) {
        const useData = {
          id: String(credentials.user),
          email: credentials.email!,
          name: credentials.fullName!.givenName!,
          photo: `https://ui-avatars.com/api/?name=${credentials.fullName!
            .givenName!}&length=1`,
        };
        setUser(useData);
        await AsyncStorage.setItem('@gofinance:user', JSON.stringify(useData));
      }
    } catch (error: any | string) {
      throw new Error(error);
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('@gofinance:user');
    setUser({} as IUser);
  };

  async function loadData() {
    const response = await AsyncStorage.getItem('@gofinance:user');
    const userStorage = response ? JSON.parse(response) : {};
    setUser(userStorage);
    setUserStorageLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
