const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Vethouse Treatments API',
    version: '1.0.0',
    description: 'Microservicio para registrar y consultar historial clinico de mascotas.'
  },
  tags: [
    { name: 'Health', description: 'Estado del servicio' },
    { name: 'Consultas', description: 'Gestion de consultas medicas' }
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Verificar estado del microservicio',
        responses: {
          '200': {
            description: 'Servicio disponible',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    servicio: { type: 'string', example: 'vethouse-clinica (ms3)' },
                    estado: { type: 'string', example: 'ok' },
                    timestamp: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/v1/consultas': {
      post: {
        tags: ['Consultas'],
        summary: 'Registrar una nueva consulta medica',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CrearConsultaRequest'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Consulta registrada correctamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    mensaje: { type: 'string', example: 'Consulta medica registrada con exito' },
                    data: { $ref: '#/components/schemas/Consulta' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Error de validacion o guardado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string', example: 'Error al guardar la consulta' },
                    detalle: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/v1/consultas/mascota/{id_mascota}': {
      get: {
        tags: ['Consultas'],
        summary: 'Obtener historial de consultas por mascota',
        parameters: [
          {
            name: 'id_mascota',
            in: 'path',
            required: true,
            description: 'ID numerico de la mascota',
            schema: {
              type: 'integer',
              example: 123
            }
          }
        ],
        responses: {
          '200': {
            description: 'Historial de consultas encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Consulta' }
                }
              }
            }
          },
          '500': {
            description: 'Error al buscar historial clinico',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string', example: 'Error al buscar el historial clinico' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Tratamiento: {
        type: 'object',
        required: ['tipo', 'descripcion'],
        properties: {
          tipo: { type: 'string', example: 'Medicacion' },
          descripcion: { type: 'string', example: 'Amoxicilina 250mg cada 12 horas por 7 dias' }
        }
      },
      CrearConsultaRequest: {
        type: 'object',
        required: ['id_cita', 'id_mascota', 'id_veterinario', 'sintomas', 'diagnostico'],
        properties: {
          id_cita: { type: 'integer', example: 1001 },
          id_mascota: { type: 'integer', example: 123 },
          id_veterinario: { type: 'integer', example: 15 },
          fecha_atencion: { type: 'string', format: 'date-time', example: '2026-04-25T13:00:00.000Z' },
          sintomas: { type: 'string', example: 'Fiebre y decaimiento' },
          diagnostico: { type: 'string', example: 'Infeccion respiratoria leve' },
          tratamientos: {
            type: 'array',
            items: { $ref: '#/components/schemas/Tratamiento' }
          }
        }
      },
      Consulta: {
        allOf: [
          { $ref: '#/components/schemas/CrearConsultaRequest' },
          {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '680b9fd6f8a8f4ef26b44752' },
              __v: { type: 'integer', example: 0 }
            }
          }
        ]
      }
    }
  }
};

export default openApiSpec;
