'use client';

import Box from '@mui/material/Box';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProductNewEditForm } from '../product-new-edit-form';

// ----------------------------------------------------------------------

export function ProductCreateView() {
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

      <ProductNewEditForm />
    </Box>
  );
}