import mongoose, { Schema, Document } from 'mongoose';

export interface IConsulta extends Document {
  id_cita: number;
  id_mascota: number;
  id_veterinario: number;
  fecha_atencion: Date;
  sintomas: string;
  diagnostico: string;
  tratamientos: Array<{
    tipo: string;
    descripcion: string;
  }>;
}

const ConsultaSchema: Schema = new Schema({
  id_cita: { type: Number, required: true },
  id_mascota: { type: Number, required: true },
  id_veterinario: { type: Number, required: true },
  fecha_atencion: { type: Date, default: Date.now },
  sintomas: { type: String, required: true },
  diagnostico: { type: String, required: true },
  tratamientos: [{
    tipo: { type: String, required: true },
    descripcion: { type: String, required: true }
  }]
});

export default mongoose.model<IConsulta>('Consulta', ConsultaSchema);