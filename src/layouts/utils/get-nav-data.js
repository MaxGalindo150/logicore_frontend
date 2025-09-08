import { navData as clientNavData } from '../config-nav-dashboard';
import { operatorNavData } from '../config-nav-operator';

// ----------------------------------------------------------------------

export function getNavDataByRole(userRole) {
  switch (userRole) {
    case 'operator':
      return operatorNavData;
    case 'client':
    case 'admin':  // Por compatibilidad
    default:
      return clientNavData;
  }
}