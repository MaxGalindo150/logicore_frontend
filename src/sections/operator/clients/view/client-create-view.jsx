'use client';

import Box from '@mui/material/Box';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ClientNewEditForm } from '../client-new-edit-form';

// ----------------------------------------------------------------------

export function ClientCreateView() {
  return (
    <Box maxWidth="xl" sx={{ p: 3 }}>
      <CustomBreadcrumbs
        heading="Crear nuevo cliente"
        links={[
          { name: 'Panel de Control', href: paths.operator.root },
          { name: 'Clientes', href: paths.operator.clients.root },
          { name: 'Nuevo cliente' },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <ClientNewEditForm />
    </Box>
  );
}