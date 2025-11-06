import { z as zod } from 'zod';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { createClient, updateClient } from 'src/api/clients';

import { CLIENT_STATUS_OPTIONS } from 'src/_mock';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const ClientSchema = zod.object({
  firstName: zod.string().min(1, { message: 'Nombre es requerido!' }),
  lastName: zod.string().min(1, { message: 'Apellido es requerido!' }),
  email: zod
    .string()
    .min(1, { message: 'Email es requerido!' })
    .email({ message: 'Email debe ser válido!' }),
  phoneNumber: zod
    .string()
    .min(1, { message: 'Teléfono es requerido!' })
    .regex(/^[\+]?[1-9][\d]{0,15}$/, { message: 'Formato de teléfono inválido!' }),
  company: zod.string().min(1, { message: 'Empresa es requerida!' }),
  address: zod.string().min(1, { message: 'Dirección es requerida!' }),
  city: zod.string().min(1, { message: 'Ciudad es requerida!' }),
  state: zod.string().min(1, { message: 'Estado es requerido!' }),
  zipCode: zod.string().min(1, { message: 'Código postal es requerido!' }),
  // Campos opcionales
  status: zod.string(),
});

// ----------------------------------------------------------------------

export function ClientNewEditForm({ currentClient }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      status: currentClient?.status || 'activo',
      firstName: currentClient?.firstName || '',
      lastName: currentClient?.lastName || '',
      email: currentClient?.email || '',
      phoneNumber: currentClient?.phoneNumber || '',
      company: currentClient?.company || '',
      address: currentClient?.address || '',
      city: currentClient?.city || 'Zacatecas',
      state: currentClient?.state || 'Zacatecas',
      zipCode: currentClient?.zipCode || '',
      businessType: currentClient?.businessType || '',
      mainProducts: currentClient?.mainProductType || currentClient?.mainProducts || '',
      // expectedVolume: currentClient?.storageVolume ? String(currentClient?.storageVolume) : (currentClient?.expectedVolume || ''),
    }),
    [currentClient]
  );

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(ClientSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentClient) {
      reset(defaultValues);
    }
  }, [currentClient, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentClient) {
        // Actualizar cliente existente
        const payload = {
          company_name: data.company,
          first_name: `${data.firstName}`,
          last_name: `${data.lastName}`,
          email: data.email,
          phone_number: data.phoneNumber,
          address: data.address + ' CP ' + data.zipCode + ', ' + data.city + ', ' + data.state,
        };

        console.log('Updating client with payload:', payload);
        const res = await updateClient(currentClient.id, payload);
        console.log('Update response:', res);

        toast.success('Cliente actualizado exitosamente!');
      } else {
        // Crear nuevo cliente
        const payload = {
          user: {
            email: data.email,
            password: '12345678', // Contraseña por defecto, se recomienda cambiar después
            first_name: data.firstName,
            last_name: data.lastName,
            phone_number: data.phoneNumber,
            is_active: true,
          },
          client: {
            company_name: data.company,
            address: data.address + ' CP ' + data.zipCode + ', ' + data.city + ', ' + data.state,
          },
        };

        console.log('Sending payload:', payload);
        const res = await createClient(payload);
        console.log('Response:', res);

        toast.success('Cliente creado exitosamente!');
      }

      reset();
      router.push(paths.operator.clients.root);
    } catch (error) {
      console.error('Error saving client:', error);
      toast.error('Error al guardar cliente');
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Box
          rowGap={2.5}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
        >
          <Field.Text name="firstName" label="Nombre" />
          <Field.Text name="lastName" label="Apellido" />
          <Field.Text name="email" label="Email" />
          <Field.Text name="phoneNumber" label="Teléfono" placeholder="+52 492 123 4567" />
          <Field.Text name="company" label="Empresa / Razón Social" />
        </Box>

        <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

        <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>
          Dirección
        </Typography>

        <Box
          rowGap={2.5}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
        >
          <Field.Text name="address" label="Dirección completa" sx={{ gridColumn: '1 / -1' }} />
          <Field.Text name="city" label="Ciudad" />
          <Field.Text name="state" label="Estado" />
          <Field.Text name="zipCode" label="Código postal" />
        </Box>

        <Stack alignItems="flex-end" sx={{ mt: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={() => router.back()}>
              Cancelar
            </Button>

            <LoadingButton 
              type="submit" 
              variant="contained" 
              loading={isSubmitting}
              disabled={currentClient ? !isDirty : false}
            >
              {!currentClient ? 'Crear Cliente' : 'Guardar Cambios'}
            </LoadingButton>
          </Stack>
        </Stack>
      </Card>
    </Form>
  );
}