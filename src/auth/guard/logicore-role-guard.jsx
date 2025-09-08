'use client';

import { useEffect } from 'react';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export function LogicoreRoleGuard({ children, allowedRoles = [], redirectTo }) {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user && allowedRoles.length > 0) {
      const hasPermission = allowedRoles.includes(user.role);
      
      if (!hasPermission) {
        // Redirigir según el rol del usuario
        if (user.role === 'operator') {
          router.push(redirectTo || paths.dashboard.operator);
        } else if (user.role === 'client') {
          router.push(redirectTo || paths.dashboard.root);
        } else {
          router.push(paths.dashboard.root);
        }
      }
    }
  }, [user, allowedRoles, router, redirectTo]);

  // Si no tiene permisos, no renderizar nada mientras se hace la redirección
  if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}