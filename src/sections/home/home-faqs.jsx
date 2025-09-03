import { useState } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionDetails, { accordionDetailsClasses } from '@mui/material/AccordionDetails';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatPlusIcon, FloatTriangleDownIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const FAQs = [
  {
    question: '¿Qué tipos de productos pueden almacenar en LogiCore?',
    answer: (
      <Typography>
        Podemos almacenar una amplia variedad de productos, incluyendo materias primas, productos terminados, mercancía general, productos con control de temperatura, y productos industriales. Contamos con espacios especializados para cada tipo de mercancía.
      </Typography>
    ),
  },
  {
    question: '¿Cómo funciona la integración con mi sistema ERP?',
    answer: (
      <Box component="ul" sx={{ pl: 3, listStyleType: 'disc' }}>
        <li>Realizamos un análisis de tu sistema actual</li>
        <li>Configuramos la integración usando APIs estándar</li>
        <li>Sincronización de inventarios en tiempo real</li>
        <li>Reportes automáticos y actualizaciones de stock</li>
        <li>Soporte técnico durante todo el proceso</li>
      </Box>
    ),
  },
  {
    question: '¿Cuáles son los tiempos de entrega en Zacatecas?',
    answer: (
      <Box component="ul" sx={{ pl: 3, listStyleType: 'disc' }}>
        <li>Entregas locales en Zacatecas: 24-48 horas</li>
        <li>Entregas urgentes: el mismo día</li>
        <li>Entregas regionales: 2-3 días hábiles</li>
        <li>Entregas a nivel nacional: 5-7 días hábiles</li>
      </Box>
    ),
  },
  {
    question: '¿Ofrecen seguimiento en tiempo real de mi inventario?',
    answer: (
      <Typography>
        Sí, nuestro sistema digital te permite monitorear tu inventario las 24 horas. Tendrás acceso a reportes en tiempo real, notificaciones de movimientos, alertas de stock mínimo y un dashboard completo para gestionar tus productos.
      </Typography>
    ),
  },
  {
    question: '¿Qué medidas de seguridad tienen para proteger mis productos?',
    answer: (
      <Box component="ul" sx={{ pl: 3, listStyleType: 'disc' }}>
        <li>Vigilancia 24/7 con cámaras de seguridad</li>
        <li>Control de acceso con códigos únicos</li>
        <li>Seguros para proteger tu mercancía</li>
        <li>Sistemas contra incendios</li>
        <li>Personal capacitado en manejo de productos</li>
      </Box>
    ),
  },
  {
    question: '¿Puedo escalar mi espacio de almacenamiento según crezca mi negocio?',
    answer: (
      <Typography>
        Absolutamente. Una de nuestras principales ventajas es la flexibilidad. Puedes aumentar o reducir tu espacio de almacenamiento según las necesidades de tu negocio, sin comprometerte con espacios fijos o inversiones en infraestructura.
      </Typography>
    ),
  },
];

// ----------------------------------------------------------------------

export function HomeFAQs({ sx, ...other }) {
  const [expanded, setExpanded] = useState(FAQs[0].question);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderDescription = (
    <SectionTitle
      caption="Preguntas Frecuentes"
      title="Tenemos las"
      txtGradient="respuestas"
      sx={{ textAlign: 'center' }}
    />
  );

  const renderContent = (
    <Stack
      spacing={1}
      sx={{
        mt: 8,
        mx: 'auto',
        maxWidth: 720,
        mb: { xs: 5, md: 8 },
      }}
    >
      {FAQs.map((item, index) => (
        <Accordion
          key={item.question}
          component={m.div}
          variants={varFade({ distance: 24 }).inUp}
          expanded={expanded === item.question}
          onChange={handleChange(item.question)}
          sx={{
            borderRadius: 2,
            transition: (theme) =>
              theme.transitions.create(['background-color'], {
                duration: theme.transitions.duration.short,
              }),
            '&::before': { display: 'none' },
            '&:hover': {
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
            },
            '&:first-of-type, &:last-of-type': { borderRadius: 2 },
            [`&.${accordionClasses.expanded}`]: {
              m: 0,
              borderRadius: 2,
              boxShadow: 'none',
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
            },
            [`& .${accordionSummaryClasses.root}`]: {
              py: 3,
              px: 2.5,
              minHeight: 'auto',
              [`& .${accordionSummaryClasses.content}`]: {
                m: 0,
                [`&.${accordionSummaryClasses.expanded}`]: { m: 0 },
              },
            },
            [`& .${accordionDetailsClasses.root}`]: { px: 2.5, pt: 0, pb: 3 },
          }}
        >
          <AccordionSummary
            expandIcon={
              <Iconify
                width={20}
                icon={expanded === item.question ? 'mingcute:minimize-line' : 'mingcute:add-line'}
              />
            }
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography variant="h6"> {item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>{item.answer}</AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );

  const renderContact = (
    <Stack
      alignItems="center"
      sx={{
        px: 3,
        py: 8,
        textAlign: 'center',
        background: (theme) =>
          `linear-gradient(270deg, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)})`,
      }}
    >
      <m.div variants={varFade().in}>
        <Typography variant="h4">¿Tienes más preguntas?</Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography sx={{ mt: 2, mb: 3, color: 'text.secondary' }}>
          Describe tu caso específico para recibir la asesoría más precisa sobre nuestros servicios logísticos
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Button
          color="inherit"
          variant="contained"
          href="mailto:info@logicore.mx?subject=[Consulta] sobre servicios LogiCore"
          startIcon={<Iconify icon="fluent:mail-24-filled" />}
        >
          Contáctanos
        </Button>
      </m.div>
    </Stack>
  );

  return (
    <Stack component="section" sx={{ ...sx }} {...other}>
      <MotionViewport sx={{ py: 10, position: 'relative' }}>
        <TopLines />

        <Container>
          {renderDescription}
          {renderContent}
        </Container>

        <Stack sx={{ position: 'relative' }}>
          <BottomLines />
          {renderContact}
        </Stack>
      </MotionViewport>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function TopLines() {
  return (
    <>
      <Stack
        spacing={8}
        alignItems="center"
        sx={{
          top: 64,
          left: 80,
          position: 'absolute',
          transform: 'translateX(-15px)',
        }}
      >
        <FloatTriangleDownIcon sx={{ position: 'static', opacity: 0.12 }} />
        <FloatTriangleDownIcon
          sx={{
            position: 'static',
            opacity: 0.24,
            width: 30,
            height: 15,
          }}
        />
      </Stack>
      <FloatLine vertical sx={{ top: 0, left: 80 }} />
    </>
  );
}

function BottomLines() {
  return (
    <>
      <FloatLine sx={{ top: 0, left: 0 }} />
      <FloatLine sx={{ bottom: 0, left: 0 }} />
      <FloatPlusIcon sx={{ top: -8, left: 72 }} />
      <FloatPlusIcon sx={{ bottom: -8, left: 72 }} />
    </>
  );
}
