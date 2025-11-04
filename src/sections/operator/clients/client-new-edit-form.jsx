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

import { CLIENT_STATUS_OPTIONS } from 'src/_mock';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const ClientSchema = zod.object({
  name: zod.string().min(1, { message: 'Nombre del contacto es requerido!' }),
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
  // Campos específicos de LogiCore
  businessType: zod.string().min(1, { message: 'Giro del negocio es requerido!' }),
  mainProducts: zod.string().min(1, { message: 'Productos principales son requeridos!' }),
  // expectedVolume: zod.string().min(1, { message: 'Volumen esperado es requerido!' }),
  // Campos opcionales
  status: zod.string(),
});

// ----------------------------------------------------------------------

export function ClientNewEditForm({ currentClient }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      status: currentClient?.status || 'activo',
      name: currentClient?.name || '',
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      reset();
      toast.success(currentClient ? 'Cliente actualizado!' : 'Cliente creado exitosamente!');
      router.push(paths.operator.clients.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
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
          <Field.Text name="name" label="Nombre del contacto" />
          <Field.Text name="email" label="Email" />
          <Field.Text name="phoneNumber" label="Teléfono" placeholder="+52 492 123 4567" />
          <Field.Text name="company" label="Empresa / Razón Social" />
        </Box>

        <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

        <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>
          Información del Negocio
        </Typography>

        <Box
          rowGap={2.5}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
        >
          <Field.Text name="businessType" label="Giro del negocio" />
          {/* <Field.Text name="expectedVolume" label="Volumen esperado (m³)" /> */}
          <Field.Text
            name="mainProducts"
            label="Productos principales"
            multiline
            rows={3}
            sx={{ gridColumn: '1 / -1' }}
          />
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