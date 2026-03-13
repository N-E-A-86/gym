import { Product } from './types';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Proteína Whey Isolate',
    description: 'Proteína de suero de leche de alta pureza, 25g por servicio.',
    price: 45.99,
    category: 'suplementos',
    stock: 50,
    image: 'https://picsum.photos/seed/protein/400/400',
  },
  {
    id: '2',
    name: 'Creatina Monohidrato',
    description: 'Creatina micronizada para mejorar la fuerza y explosividad.',
    price: 24.50,
    category: 'suplementos',
    stock: 100,
    image: 'https://picsum.photos/seed/creatine/400/400',
  },
  {
    id: '3',
    name: 'Camiseta My Gym Team',
    description: 'Camiseta técnica transpirable con el logo del gimnasio.',
    price: 19.99,
    category: 'merch',
    stock: 30,
    image: 'https://picsum.photos/seed/shirt/400/400',
  },
  {
    id: '4',
    name: 'Multivitamínico Diario',
    description: 'Complejo de vitaminas y minerales esenciales para deportistas.',
    price: 15.00,
    category: 'vitaminas',
    stock: 80,
    image: 'https://picsum.photos/seed/vitamins/400/400',
  },
];
