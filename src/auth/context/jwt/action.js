'use client';

import axios, { endpoints } from 'src/utils/axios';
import { getMockedUserByEmail } from 'src/auth/hooks/use-mocked-user';

import { setSession } from './utils';
import { STORAGE_KEY } from './constant';

// Mock credentials para desarrollo
const MOCK_CREDENTIALS = {
  'cliente@logicore.mx': '@cliente123',
  'operador@logicore.mx': '@operador123',
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }) => {
  try {
    // Mock authentication para desarrollo
    if (MOCK_CREDENTIALS[email] && MOCK_CREDENTIALS[email] === password) {
      const user = getMockedUserByEmail(email);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      
      // Generar un JWT mock válido (header.payload.signature)
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ 
        email, 
        userId: user.id, 
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 horas en segundos
      }));
      const signature = 'mock-signature';
      const mockToken = `${header}.${payload}.${signature}`;
      
      // Almacenar el usuario en sessionStorage para que lo pueda leer el provider
      sessionStorage.setItem('mockUser', JSON.stringify(user));
      
      setSession(mockToken);
      return;
    }
    
    // Si no es credencial mock, usar API real
    // throw new Error('Credenciales inválidas');
  
    const params = { email, password };
    console.log('Signing in with params MAX ES PUTO:', params);
    const res = await axios.post(endpoints.auth.signIn, params);
    console.log('Response from sign in MAX ES PUTISIMOOO:', res);
    const { accessToken } = res.data;
    if (!accessToken) {
      throw new Error('Access token not found in response');
    }
    setSession(accessToken);
    
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({ email, password, firstName, lastName }) => {
  const params = {
    email,
    password,
    firstName,
    lastName,
  };

  try {
    const res = await axios.post(endpoints.auth.signUp, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    sessionStorage.setItem(STORAGE_KEY, accessToken);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
