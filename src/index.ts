import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { swaggerUI } from '@hono/swagger-ui';
import 'dotenv/config';
import connectDB from './config/db';
import openApiSpec from './docs/openapi';
import consultaRoutes from './routes/consultaRoutes';

connectDB();

const app = new Hono();

app.get('/health', (c) => {
  return c.json({ 
    servicio: 'vethouse-clinica (ms3)', 
    estado: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.get('/openapi.json', (c) => c.json(openApiSpec));
app.get('/docs', swaggerUI({ url: '/openapi.json' }));

app.route('/api/v1/consultas', consultaRoutes);

const port = parseInt(process.env.PORT || "8002");
console.log(` Vethouse-treatments corriendo en http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});