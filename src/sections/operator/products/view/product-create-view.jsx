'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import Box from '@mui/material/Box';

import { paths } from 'src/routes/paths';

import { _clientsList } from 'src/_mock';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProductNewEditForm } from '../product-new-edit-form';

// ----------------------------------------------------------------------

export function ProductCreateView() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get('clientId');

  const prefilledClient = useMemo(() => {
    if (!clientId) return null;
    
    const client = _clientsList.find(c => c.id === clientId);
    if (!client) return null;
    
    return {
      id: client.id,
      label: `${client.company} - ${client.name}`,
      company: client.company,
      name: client.name
    };
  }, [clientId]);

  return (
    <Box maxWidth="xl" sx={{ p: 3 }}>
      <CustomBreadcrumbs
        heading="Crear nuevo producto"
        links={[
          { name: 'Panel de Control', href: paths.operator.root },
          { name: 'Productos', href: paths.operator.products.root },
          { name: 'Nuevo producto' },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <ProductNewEditForm prefilledClient={prefilledClient} />
    </Box>
  );
}