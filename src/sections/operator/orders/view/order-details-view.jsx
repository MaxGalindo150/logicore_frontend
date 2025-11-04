'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import { WAREHOUSE_ORDER_STATUS_OPTIONS } from 'src/_mock';

import { OrderDetailsInfo } from '../order-details-info';
import { OrderDetailsItems } from '../order-details-item';
import { OrderDetailsToolbar } from '../order-details-toolbar';
import { OrderDetailsHistory } from '../order-details-history';

// ----------------------------------------------------------------------

export function OrderDetailsView({ order }) {
  const [status, setStatus] = useState(order?.status);

  const handleChangeStatus = useCallback((newValue) => {
    setStatus(newValue);
  }, []);

  return (
    <Box maxWidth="xl" sx={{ p: 3 }}>
      <OrderDetailsToolbar
        backLink={paths.operator.orders.root}
        orderNumber={order?.orderNumber}
        createdAt={order?.createdAt}
        status={status}
        onChangeStatus={handleChangeStatus}
        statusOptions={WAREHOUSE_ORDER_STATUS_OPTIONS}
      />

      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            <OrderDetailsItems
              items={order?.items}
              totalWeight={order?.totalWeight}
              destination={order?.destination}
              // volume={order?.volume}
            />

            <OrderDetailsHistory history={order?.history} />
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <OrderDetailsInfo
            customer={order?.customer}
            delivery={order?.delivery}
            shippingAddress={order?.shippingAddress}
            notes={order?.notes}
          />
        </Grid>
      </Grid>
    </Box>
  );
}