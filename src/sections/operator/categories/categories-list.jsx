import React, { useState } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { createCategory, updateCategory, deleteCategory } from 'src/api/categories';
import { toast } from 'src/components/snackbar';

// Definir el esquema de validación con zod
const categorySchema = zod.object({
  id: zod.number().optional(),
  name: zod.string().nonempty({ message: 'Title is required!' }),
  description: zod.string().optional(),
  durationInMonths: zod.number().min(1, { message: 'Duration must be at least 1 month' }),
  price: zod.number().min(0.01, { message: 'Price must be greater than 0' }),
  gymId: zod.number().optional(),
});

const formSchema = zod.object({
  items: zod.array(categorySchema),
});

const CategoriesList = ({ defaultValues }) => {
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    control,
    setValue,
    trigger,
    formState: { errors },
  } = methods;
  const { fields: formFields, append, remove } = useFieldArray({ control, name: 'items' });

  const [changedFields, setChangedFields] = useState({});

  const handleRemove = async (index) => {
    const item = methods.getValues(`items.${index}`);
    if (item.id) {
      await deleteCategory(item.id);
      toast.success('Category deleted');
    }
    remove(index);
  };

  const handleChange = (event, index, field) => {
    const value =
      field === 'durationInMonths' || field === 'price'
        ? parseFloat(event.target.value)
        : event.target.value;
    setValue(`items[${index}].${field}`, value);
    setChangedFields((prev) => ({ ...prev, [index]: true }));
  };

  const handleSave = async (index) => {
    const isValid = await trigger(`items.${index}`);
    if (isValid) {
      const item = methods.getValues(`items.${index}`);
      if (item.id) {
        // Editar membresía existente
        await updateCategory(item.id, item);
        toast.success('Category updated');
      } else {
        // Crear nueva membresía
        await createCategory(item);
        toast.success('Category created');
      }
      setChangedFields((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleAdd = () => {
    append({
      name: '',
      description: '',
      durationInMonths: 0,
      price: 0,
    });
    setChangedFields((prev) => ({ ...prev, [formFields.length]: true }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <FormProvider {...methods}>
        <form>
          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            {formFields.map((item, index) => (
              <Stack key={item.id || index} alignItems="flex-end" spacing={1.5}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                  <Field.Text
                    name={`items[${index}].name`}
                    label="Title"
                    InputLabelProps={{ shrink: true }}
                    sx={{ maxWidth: { md: 280 } }}
                    onChange={(event) => handleChange(event, index, 'name')}
                    error={!!errors.items?.[index]?.name}
                    helperText={errors.items?.[index]?.name?.message}
                  />

                  <Field.Text
                    name={`items[${index}].description`}
                    label="Description"
                    InputLabelProps={{ shrink: true }}
                    onChange={(event) => handleChange(event, index, 'description')}
                  />

                  <Field.Text
                    type="number"
                    name={`items[${index}].durationInMonths`}
                    label="Duration (months)"
                    placeholder="0"
                    InputLabelProps={{ shrink: true }}
                    sx={{ maxWidth: { md: 136 } }}
                    inputProps={{
                      style: { textAlign: 'center' },
                    }}
                    onChange={(event) => handleChange(event, index, 'durationInMonths')}
                    error={!!errors.items?.[index]?.durationInMonths}
                    helperText={errors.items?.[index]?.durationInMonths?.message}
                  />

                  <Field.Text
                    type="number"
                    name={`items[${index}].price`}
                    label="Price"
                    placeholder="0.00"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ maxWidth: { md: 96 } }}
                    onChange={(event) => handleChange(event, index, 'price')}
                    error={!!errors.items?.[index]?.price}
                    helperText={errors.items?.[index]?.price?.message}
                  />
                  {item.id && (
                    <Button color="error" variant="contained" onClick={() => handleRemove(index)}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </Button>
                  )}
                  {changedFields[index] && (
                    <Button color="primary" variant="contained" onClick={() => handleSave(index)}>
                      Save
                    </Button>
                  )}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </form>
      </FormProvider>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
      >
        <Button
          size="large"
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Agregar
        </Button>
      </Stack>
    </Box>
  );
};

export default CategoriesList;
