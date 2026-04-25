"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const faker_1 = require("@faker-js/faker");
const Consulta_1 = __importDefault(require("../models/Consulta"));
const TOTAL_CONSULTAS = 18000;
const MAX_MASCOTA_ID = 8000;
const MAX_VETERINARIO_ID = 80;
async function runSeed() {
    const uri = process.env.MONGODB_URI || '';
    if (!uri) {
        throw new Error('MONGODB_URI no esta definido en el .env');
    }
    await mongoose_1.default.connect(uri);
    console.log('[MS3 Seeder] Mongo conectado');
    console.log('[MS3 Seeder] Limpiando coleccion consultas...');
    await Consulta_1.default.deleteMany({});
    const tipos = ['Vacunacion', 'Desparasitacion', 'Cirugia', 'Radiografia', 'Laboratorio', 'Terapia'];
    const docs = [];
    for (let i = 0; i < TOTAL_CONSULTAS; i++) {
        const totalTratamientos = faker_1.faker.number.int({ min: 1, max: 3 });
        docs.push({
            id_cita: faker_1.faker.number.int({ min: 1, max: 12000 }),
            id_mascota: faker_1.faker.number.int({ min: 1, max: MAX_MASCOTA_ID }),
            id_veterinario: faker_1.faker.number.int({ min: 1, max: MAX_VETERINARIO_ID }),
            fecha_atencion: faker_1.faker.date.recent({ days: 365 }),
            sintomas: faker_1.faker.lorem.sentence({ min: 6, max: 12 }),
            diagnostico: faker_1.faker.lorem.sentence({ min: 6, max: 12 }),
            tratamientos: Array.from({ length: totalTratamientos }).map(() => ({
                tipo: faker_1.faker.helpers.arrayElement(tipos),
                descripcion: faker_1.faker.lorem.sentence({ min: 8, max: 14 })
            }))
        });
        if (docs.length === 1000) {
            await Consulta_1.default.insertMany(docs);
            docs.length = 0;
            console.log(`[MS3 Seeder] Progreso: ${i + 1}/${TOTAL_CONSULTAS}`);
        }
    }
    if (docs.length > 0) {
        await Consulta_1.default.insertMany(docs);
    }
    const total = await Consulta_1.default.countDocuments();
    console.log(`[MS3 Seeder] Seed completo: ${total} consultas`);
    await mongoose_1.default.disconnect();
}
runSeed()
    .then(() => process.exit(0))
    .catch((err) => {
    console.error('[MS3 Seeder] Error:', err);
    process.exit(1);
});
