import { CONFIG } from 'src/config-global';
import { ClientLayout } from 'src/layouts/client';

import { AuthGuard, LogicoreRoleGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  if (CONFIG.auth.skip) {
    return <ClientLayout>{children}</ClientLayout>;
  }

  return (
    <AuthGuard>
      <LogicoreRoleGuard allowedRoles={['client', 'admin']}>
        <ClientLayout>{children}</ClientLayout>
      </LogicoreRoleGuard>
    </AuthGuard>
  );
}