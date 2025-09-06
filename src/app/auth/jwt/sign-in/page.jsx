import { CONFIG } from 'src/config-global';

import { CenteredSignInView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | Jwt - ${CONFIG.site.name}` };

export default function Page() {
  return <CenteredSignInView />;
}
