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
  // Datos simplificados para MVP
  const trackingSteps = [
    {
      title: 'Pedido Confirmado',
      time: history?.orderTime,
      completed: true
    },
    {
      title: 'En Camino',
      time: history?.orderTime ? new Date(new Date(history.orderTime).getTime() + 24 * 60 * 60 * 1000) : null,
      completed: true
    },
    {
      title: 'Entregado',
      time: history?.orderTime ? new Date(new Date(history.orderTime).getTime() + 72 * 60 * 60 * 1000) : null,
      completed: false
    }
  ];

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
        <Box sx={{ color: 'text.disabled' }}>Fecha del Pedido</Box>
        {fDateTime(history?.orderTime)}
      </Stack>
      <Stack spacing={0.5}>
        <Box sx={{ color: 'text.disabled' }}>Estado Actual</Box>
        <Box sx={{ color: 'warning.main', fontWeight: 'medium' }}>En Camino</Box>
      </Stack>
      <Stack spacing={0.5}>
        <Box sx={{ color: 'text.disabled' }}>Tiempo Estimado</Box>
        <Box>24-48 horas</Box>
      </Stack>
    </Paper>
  );

  const renderTimeline = (
    <Timeline
      sx={{ p: 0, m: 0, [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 } }}
    >
      {trackingSteps.map((item, index) => {
        const isCompleted = item.completed;
        const isLast = index === trackingSteps.length - 1;

        return (
          <TimelineItem key={item.title}>
            <TimelineSeparator>
              <TimelineDot 
                color={isCompleted ? 'primary' : 'grey'} 
                variant={isCompleted ? 'filled' : 'outlined'}
              />
              {!isLast && <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: isCompleted ? 'text.primary' : 'text.disabled',
                  fontWeight: isCompleted ? 'medium' : 'normal'
                }}
              >
                {item.title}
              </Typography>

              {isCompleted && item.time && (
                <Box sx={{ color: 'text.disabled', typography: 'caption', mt: 0.5 }}>
                  {fDateTime(item.time)}
                </Box>
              )}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );

  return (
    <Card>
      <CardHeader title="Seguimiento del Pedido" />
      <Stack
        spacing={3}
        alignItems={{ md: 'flex-start' }}
        direction={{ xs: 'column-reverse', md: 'row' }}
        sx={{ p: 3 }}
      >
        {renderTimeline}
        {renderSummary}
      </Stack>
    </Card>
  );
}
