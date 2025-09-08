import { _mock } from 'src/_mock';

// To get the user from the <AuthContext/>, you can use

// Change:
// import { useMockedUser } from 'src/auth/hooks';
// const { user } = useMockedUser();

// To:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

const MOCK_USERS = {
  'cliente@logicore.mx': {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Carlos Mendoza',
    email: 'cliente@logicore.mx',
    photoURL: _mock.image.avatar(24),
    phoneNumber: '+52 492 123 4567',
    country: 'México',
    address: 'Calle Hidalgo 456',
    state: 'Zacatecas',
    city: 'Zacatecas',
    zipCode: '98000',
    about: 'Empresario zacatecano especializado en distribución regional.',
    role: 'client',
    isPublic: true,
  },
  'operador@logicore.mx': {
    id: '8864c717-587d-472a-929a-8e5f298024da-1',
    displayName: 'María González',
    email: 'operador@logicore.mx',
    photoURL: _mock.image.avatar(25),
    phoneNumber: '+52 492 987 6543',
    country: 'México',
    address: 'Av. López Mateos 123',
    state: 'Zacatecas',
    city: 'Zacatecas',
    zipCode: '98000',
    about: 'Operador de LogiCore especializado en gestión de inventarios y distribución.',
    role: 'operator',
    isPublic: false,
  }
};

export function useMockedUser() {
  // Para mantener compatibilidad, devuelve el usuario cliente por defecto
  const user = MOCK_USERS['cliente@logicore.mx'];
  return { user };
}

export function getMockedUserByEmail(email) {
  return MOCK_USERS[email] || null;
}
