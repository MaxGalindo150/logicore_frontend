'use client';

import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { _productsList, _clientsList } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ClientSpecificProductList } from '../client-specific-product-list';

// ----------------------------------------------------------------------

export function ClientProductsView({ id }) {
  const router = useRouter();

  const currentClient = useMemo(
    () => _clientsList.find((client) => client.id === id),
    [id]
  );

  const clientProducts = useMemo(
    () => _productsList.filter((product) => product.clientId === id),
    [id]
  );

  if (!currentClient) {
    return (
      <Box maxWidth="xl" sx={{ p: 3 }}>
        <Typography variant="h4">Cliente no encontrado</Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="xl" sx={{ p: 3 }}>
      <CustomBreadcrumbs
        heading={`Productos de ${currentClient.company}`}
        links={[
          { name: 'Panel de Control', href: paths.operator.root },
          { name: 'Clientes', href: paths.operator.clients.root },
          { name: currentClient.company, href: paths.operator.clients.edit(id) },
          { name: 'Productos' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={`${paths.operator.products.new}?clientId=${id}`}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Nuevo Producto
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {clientProducts.length === 0 ? (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 10,
            backgroundColor: 'background.neutral',
            borderRadius: 2,
          }}
        >
          <Iconify 
            icon="solar:box-outline" 
            sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} 
          />
          <Typography variant="h5" sx={{ mb: 1, color: 'text.primary' }}>
            No hay productos almacenados
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Este cliente no tiene productos almacenados en el sistema.
          </Typography>
          <Button
            component={RouterLink}
            href={`${paths.operator.products.new}?clientId=${id}`}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Agregar Primer Producto
          </Button>
        </Box>
      ) : (
        <ClientSpecificProductList clientFilter={id} />
      )}
    </Box>
  );
}