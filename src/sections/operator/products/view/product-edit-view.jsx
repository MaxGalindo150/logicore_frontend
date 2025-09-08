'use client';

import { useMemo } from 'react';

import Box from '@mui/material/Box';

import { paths } from 'src/routes/paths';

import { _productsList } from 'src/_mock';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProductNewEditForm } from '../product-new-edit-form';

// ----------------------------------------------------------------------

export function ProductEditView({ id }) {
  const currentProduct = useMemo(
    () => _productsList.find((product) => product.id === id),
    [id]
  );

  return (
    <Box maxWidth="xl" sx={{ p: 3 }}>
      <CustomBreadcrumbs
        heading="Editar producto"
        links={[
          { name: 'Panel de Control', href: paths.operator.root },
          { name: 'Productos', href: paths.operator.products.root },
          { name: currentProduct?.name || 'Producto' },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <ProductNewEditForm currentProduct={currentProduct} />
    </Box>
  );
}