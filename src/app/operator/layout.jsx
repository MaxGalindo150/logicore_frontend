import { CONFIG } from 'src/config-global';
import { OperatorLayout } from 'src/layouts/operator';

import { AuthGuard, LogicoreRoleGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  if (CONFIG.auth.skip) {
    return <OperatorLayout>{children}</OperatorLayout>;
  }

  return (
    <AuthGuard>
      <LogicoreRoleGuard allowedRoles={['operator']}>
        <OperatorLayout>{children}</OperatorLayout>
      </LogicoreRoleGuard>
    </AuthGuard>
  );
}