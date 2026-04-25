import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import 'dotenv/config';
import connectDB from './config/db';
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

app.route('/api/v1/consultas', consultaRoutes);

const port = parseInt(process.env.PORT || "8002");
console.log(` Vethouse-treatments corriendo en http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});