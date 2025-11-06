'use client';

import { useState, useEffect, useMemo } from 'react';

import Box from '@mui/material/Box';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { getClientById } from 'src/api/clients';

import { ClientNewEditForm } from '../client-new-edit-form';

// ----------------------------------------------------------------------

export function ClientEditView({ id }) {
  const [currentClient, setCurrentClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClient = async () => {
      try {
        console.log('Loading client with ID:', id);
        const response = await getClientById(id);
        console.log('API response:', response);

        // Verificar la estructura de la respuesta
        if (!response || !response.id) {
          throw new Error('Respuesta inválida de la API');
        }

        const client = response;
        console.log('Client data:', client);

        // Transformar los datos al formato que espera el formulario
        const transformedClient = {
          id: client.id,
          clientId: client.display_id,
          firstName: client.cliente ? client.cliente.split(' ')[0] : '',
          lastName: client.cliente ? client.cliente.split(' ').slice(1).join(' ') : '',
          email: client.cliente_email || '',
          phoneNumber: client.telefono || '',
          company: client.empresa || '',
          address: client.direccion || '',
          city: 'Zacatecas', // valor por defecto
          state: 'Zacatecas', // valor por defecto
          status: client.estado === 'Activo' ? 'activo' : 'inactivo',
        };

        console.log('Transformed client:', transformedClient);
        setCurrentClient(transformedClient);
      } catch (error) {
        console.error('Error loading client:', error);
        console.error('Error details:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadClient();
    }
  }, [id]);

  return (
    <Box maxWidth="xl" sx={{ p: 3 }}>
      <CustomBreadcrumbs
        heading="Editar cliente"
        links={[
          { name: 'Panel de Control', href: paths.operator.root },
          { name: 'Clientes', href: paths.operator.clients.root },
          { name: currentClient?.company || 'Cliente' },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
          <Box>Cargando datos del cliente...</Box>
        </Box>
      ) : (
        <ClientNewEditForm currentClient={currentClient} />
      )}
    </Box>
  );
}