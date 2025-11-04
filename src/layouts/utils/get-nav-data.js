import { navData as clientNavData } from '../config-nav-dashboard';
import { operatorNavData } from '../config-nav-operator';

// ----------------------------------------------------------------------

export function getNavDataByRole(userRole) {
  switch (userRole) {
    case 'EMPLOYEE':
      return operatorNavData;
    case 'CLIENT':
    case 'admin':  // Por compatibilidad
    default:
      return clientNavData;
  }
}