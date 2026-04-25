import 'dotenv/config';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Consulta from '../models/Consulta';

const TOTAL_CONSULTAS = 18000;
const MAX_MASCOTA_ID = 8000;
const MAX_VETERINARIO_ID = 80;

async function runSeed() {
  const uri = process.env.MONGODB_URI || '';
  if (!uri) {
    throw new Error('MONGODB_URI no esta definido en el .env');
  }

  await mongoose.connect(uri);
  console.log('[MS3 Seeder] Mongo conectado');

  console.log('[MS3 Seeder] Limpiando coleccion consultas...');
  await Consulta.deleteMany({});

  const tipos = ['Vacunacion', 'Desparasitacion', 'Cirugia', 'Radiografia', 'Laboratorio', 'Terapia'];

  const docs: any[] = [];
  for (let i = 0; i < TOTAL_CONSULTAS; i++) {
    const totalTratamientos = faker.number.int({ min: 1, max: 3 });

    docs.push({
      id_cita: faker.number.int({ min: 1, max: 12000 }),
      id_mascota: faker.number.int({ min: 1, max: MAX_MASCOTA_ID }),
      id_veterinario: faker.number.int({ min: 1, max: MAX_VETERINARIO_ID }),
      fecha_atencion: faker.date.recent({ days: 365 }),
      sintomas: faker.lorem.sentence({ min: 6, max: 12 }),
      diagnostico: faker.lorem.sentence({ min: 6, max: 12 }),
      tratamientos: Array.from({ length: totalTratamientos }).map(() => ({
        tipo: faker.helpers.arrayElement(tipos),
        descripcion: faker.lorem.sentence({ min: 8, max: 14 })
      }))
    });

    if (docs.length === 1000) {
      await Consulta.insertMany(docs);
      docs.length = 0;
      console.log(`[MS3 Seeder] Progreso: ${i + 1}/${TOTAL_CONSULTAS}`);
    }
  }

  if (docs.length > 0) {
    await Consulta.insertMany(docs);
  }

  const total = await Consulta.countDocuments();
  console.log(`[MS3 Seeder] Seed completo: ${total} consultas`);
  await mongoose.disconnect();
}

runSeed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[MS3 Seeder] Error:', err);
    process.exit(1);
  });
