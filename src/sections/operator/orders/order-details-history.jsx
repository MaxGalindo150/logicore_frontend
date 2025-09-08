import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';

import { fDateTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export function OrderDetailsHistory({ history }) {
  const renderTimeline = (
    <Timeline
      sx={{
        p: 0,
        m: 0,
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {history?.timeline?.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot 
              color={index === 0 ? 'primary' : 'grey'}
              variant={index === 0 ? 'filled' : 'outlined'}
            />
            {index < history.timeline.length - 1 && <TimelineConnector />}
          </TimelineSeparator>

          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="subtitle2">
              {item.title}
            </Typography>

            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              {fDateTime(item.time)}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );

  const renderSummary = (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        gap: 2,
        minWidth: 260,
        flexShrink: 0,
        borderRadius: 2,
        display: 'flex',
        typography: 'body2',
        borderStyle: 'dashed',
        flexDirection: 'column',
      }}
    >
      <Stack spacing={0.5}>
        <Box sx={{ color: 'text.disabled' }}>Fecha de Creación</Box>
        {fDateTime(history?.orderTime)}
      </Stack>
      
      {history?.paymentTime && (
        <Stack spacing={0.5}>
          <Box sx={{ color: 'text.disabled' }}>Procesado</Box>
          {fDateTime(history.paymentTime)}
        </Stack>
      )}
      
      {history?.deliveryTime && (
        <Stack spacing={0.5}>
          <Box sx={{ color: 'text.disabled' }}>En Tránsito</Box>
          {fDateTime(history.deliveryTime)}
        </Stack>
      )}
      
      {history?.completionTime && (
        <Stack spacing={0.5}>
          <Box sx={{ color: 'text.disabled' }}>Completado</Box>
          {fDateTime(history.completionTime)}
        </Stack>
      )}
    </Paper>
  );

  return (
    <Card>
      <CardHeader title="Historial de la Orden" />

      <Stack
        spacing={3}
        alignItems={{ md: 'flex-start' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 3 }}
      >
        {renderTimeline}

        {renderSummary}
      </Stack>
    </Card>
  );
}