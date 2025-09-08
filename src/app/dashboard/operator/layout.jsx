import { LogicoreRoleGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export default function OperatorLayout({ children }) {
  return (
    <LogicoreRoleGuard allowedRoles={['operator']}>
      {children}
    </LogicoreRoleGuard>
  );
}