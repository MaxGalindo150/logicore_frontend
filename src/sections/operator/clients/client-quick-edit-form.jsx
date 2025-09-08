import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { CLIENT_STATUS_OPTIONS, SERVICE_TYPE_OPTIONS } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const ClientQuickEditSchema = zod.object({
  name: zod.string().min(1, { message: 'Nombre es requerido' }),
  email: zod
    .string()
    .min(1, { message: 'Email es requerido' })
    .email({ message: 'Email debe ser válido' }),
  phoneNumber: zod.string().min(1, { message: 'Teléfono es requerido' }),
  company: zod.string().min(1, { message: 'Empresa es requerida' }),
  city: zod.string().min(1, { message: 'Ciudad es requerida' }),
  status: zod.string().min(1, { message: 'Estado es requerido' }),
  serviceType: zod.string().min(1, { message: 'Tipo de servicio es requerido' }),
});

// ----------------------------------------------------------------------

export function ClientQuickEditForm({ currentClient, open, onClose }) {
  const defaultValues = useMemo(
    () => ({
      name: currentClient?.name || '',
      email: currentClient?.email || '',
      phoneNumber: currentClient?.phoneNumber || '',
      company: currentClient?.company || '',
      city: currentClient?.city || '',
      status: currentClient?.status || '',
      serviceType: currentClient?.serviceType || '',
    }),
    [currentClient]
  );

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(ClientQuickEditSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      onClose();
      toast.success('Cliente actualizado correctamente');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Edición Rápida</DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Esta es una edición rápida. Para cambios completos, usa el formulario de edición completo.
          </Alert>

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
          >
            <Field.Text name="name" label="Nombre del contacto" />

            <Field.Text name="email" label="Email" />

            <Field.Text name="phoneNumber" label="Teléfono" />

            <Field.Text name="company" label="Empresa" />

            <Field.Text name="city" label="Ciudad" />

            <Field.Select name="status" label="Estado">
              {CLIENT_STATUS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field.Select>

            <Field.Select name="serviceType" label="Tipo de servicio" sx={{ gridColumn: '1 / -1' }}>
              {SERVICE_TYPE_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field.Select>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Actualizar
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}