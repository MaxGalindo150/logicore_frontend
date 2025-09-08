import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const CLIENT_STATUS_OPTIONS = [
  { value: 'activo', label: 'Activo' },
  { value: 'inactivo', label: 'Inactivo' },
  { value: 'suspendido', label: 'Suspendido' },
];

export const SERVICE_TYPE_OPTIONS = [
  { value: 'almacenamiento', label: 'Almacenamiento' },
  { value: 'distribucion', label: 'Distribución' },
  { value: 'integral', label: 'Servicio Integral' },
  { value: 'temporal', label: 'Almacenamiento Temporal' },
];

// ----------------------------------------------------------------------

const CLIENT_NAMES = [
  'Distribuidora del Norte SA de CV',
  'Minera Zacatecana',
  'Agro Productos del Centro',
  'Manufacturas Industriales',
  'Comercializadora Regional',
  'Textiles y Confecciones',
  'Alimentos Procesados del Bajío',
  'Construcciones y Materiales',
  'Tecnología e Innovación',
  'Servicios Logísticos Avanzados',
  'Productos Químicos Especializados',
  'Metalmecánica Industrial',
  'Empaques y Envases',
  'Distribución Farmacéutica',
  'Autopartes y Componentes',
  'Electrónicos y Computación',
  'Muebles y Decoración',
  'Bebidas y Refrescos',
  'Cosméticos y Cuidado Personal',
  'Deportes y Recreación',
];

const COMPANIES = [
  'Grupo Industrial del Norte',
  'Minera San Rafael',
  'AgroCentro México',
  'Manufacturas Zacatecas',
  'Comercial Regional',
  'Textiles Modernos',
  'AlimentosBajío SA',
  'Constructora del Centro',
  'TecnoInnovación',
  'LogiExpress',
  'QuímicosPro',
  'MetalWorks',
  'EmpaquesTotales',
  'FarmaDistribución',
  'AutoComponentes',
  'ElectroTech',
  'MuebleríaElite',
  'BebidasRefresh',
  'CosméticasBella',
  'DeportesPro',
];

const CONTACT_NAMES = [
  'Ing. Carlos Mendoza García',
  'Lic. María Elena Rodríguez',
  'Ing. José Luis Hernández',
  'Lic. Ana Patricia Vázquez',
  'Ing. Roberto Carlos Sánchez',
  'Lic. Laura Isabel González',
  'Ing. Miguel Ángel Torres',
  'Lic. Sofía Alejandra Morales',
  'Ing. Fernando Raúl Jiménez',
  'Lic. Carmen Rosa Delgado',
  'Ing. Alejandro Ruiz Castillo',
  'Lic. Mónica Beatriz Herrera',
  'Ing. Ricardo Enrique López',
  'Lic. Gabriela Luz Martínez',
  'Ing. Arturo Daniel Flores',
  'Lic. Verónica Isabel Ramírez',
  'Ing. Sergio Eduardo Moreno',
  'Lic. Diana Patricia Cruz',
  'Ing. Francisco Javier Silva',
  'Lic. Claudia Elena Vargas',
];

// ----------------------------------------------------------------------

const PRODUCT_TYPES = [
  'Gorras', 'Tenis', 'Frutas', 'Electrónicos', 'Ropa',
  'Herramientas', 'Libros', 'Juguetes', 'Cosméticos', 'Alimentos',
  'Medicinas', 'Autopartes', 'Muebles', 'Deportes', 'Bebidas',
  'Químicos', 'Textiles', 'Metales', 'Plásticos', 'Cerámicos'
];

const BUSINESS_TYPES = [
  'Comercialización', 'Manufactura', 'Distribución', 'Minería', 'Agricultura',
  'Textil', 'Alimentos', 'Construcción', 'Tecnología', 'Logística',
  'Química', 'Metalmecánica', 'Farmacéutica', 'Automotriz', 'Electrónica',
  'Mueblería', 'Bebidas', 'Cosmética', 'Deportiva', 'Industrial'
];

export const _clientsList = CLIENT_NAMES.map((name, index) => ({
  id: _mock.id(index),
  clientId: `CLT-${String(index + 1000).padStart(4, '0')}`,
  name: CONTACT_NAMES[index],
  company: COMPANIES[index],
  email: _mock.email(index),
  phoneNumber: `+52 492 ${String(Math.floor(Math.random() * 900) + 100)} ${String(Math.floor(Math.random() * 9000) + 1000)}`,
  avatarUrl: _mock.image.avatar(index),
  country: 'México',
  state: 'Zacatecas',
  city: ['Zacatecas', 'Guadalupe', 'Fresnillo', 'Jerez', 'Río Grande'][Math.floor(Math.random() * 5)],
  address: `${['Av. López Mateos', 'Blvd. López Portillo', 'Calle Hidalgo', 'Av. González Ortega', 'Calle Tacuba'][Math.floor(Math.random() * 5)]} ${Math.floor(Math.random() * 999) + 100}`,
  zipCode: `9800${Math.floor(Math.random() * 9)}`,
  status: ['activo', 'inactivo', 'suspendido'][Math.floor(Math.random() * 3)],
  productsStored: Math.floor(Math.random() * 50) + 1,
  mainProductType: PRODUCT_TYPES[index % PRODUCT_TYPES.length],
  businessType: BUSINESS_TYPES[index % BUSINESS_TYPES.length],
  contractDate: _mock.time(index),
  monthlyRate: Math.floor(Math.random() * 50000) + 10000,
  storageVolume: Math.floor(Math.random() * 1000) + 50,
  isVerified: _mock.boolean(index),
  createdAt: _mock.time(index),
  lastActivity: _mock.time(index + 10),
}));