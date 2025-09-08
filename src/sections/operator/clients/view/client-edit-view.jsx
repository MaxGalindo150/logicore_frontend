'use client';

import { useMemo } from 'react';

import Box from '@mui/material/Box';

import { paths } from 'src/routes/paths';

import { _clientsList } from 'src/_mock';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ClientNewEditForm } from '../client-new-edit-form';

// ----------------------------------------------------------------------

export function ClientEditView({ id }) {
  const currentClient = useMemo(
    () => _clientsList.find((client) => client.id === id),
    [id]
  );

  return (
    <Box maxWidth="xl" sx={{ p: 3 }}>
      <CustomBreadcrumbs
        heading="Editar cliente"
        links={[
          { name: 'Panel de Control', href: paths.operator.root },
          { name: 'Clientes', href: paths.operator.clients.root },
          { name: currentClient?.name || 'Cliente' },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <ClientNewEditForm currentClient={currentClient} />
    </Box>
  );
}