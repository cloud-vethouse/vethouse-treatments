import mongoose, { Schema, Document } from 'mongoose';

export interface IConsulta extends Document {
  id_cita?: number | null; // Totalmente opcional
  id_mascota: number;
  id_veterinario: number;
  fecha_atencion: Date;
  sintomas: string;
  diagnostico: string;
  tratamientos: any[]; // Flexibilizamos los tratamientos
}

const ConsultaSchema: Schema = new Schema({
  id_cita: { type: Number, default: null }, // Ya NO es required
  id_mascota: { type: Number, required: true },
  id_veterinario: { type: Number, required: true },
  fecha_atencion: { type: Date, default: Date.now },
  sintomas: { type: String, required: true },
  diagnostico: { type: String, required: true },
  tratamientos: [{
    tipo: { type: String },
    descripcion: { type: String },
    costo_referencial: { type: Number },
    estado: { type: String }
  }]
});

export default mongoose.model<IConsulta>('Consulta', ConsultaSchema);