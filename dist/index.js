"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const swagger_ui_1 = require("@hono/swagger-ui");
require("dotenv/config");
const db_1 = __importDefault(require("./config/db"));
const openapi_1 = __importDefault(require("./docs/openapi"));
const consultaRoutes_1 = __importDefault(require("./routes/consultaRoutes"));
(0, db_1.default)();
const app = new hono_1.Hono();
app.get('/health', (c) => {
    return c.json({
        servicio: 'vethouse-clinica (ms3)',
        estado: 'ok',
        timestamp: new Date().toISOString()
    });
});
app.get('/openapi.json', (c) => c.json(openapi_1.default));
app.get('/docs', (0, swagger_ui_1.swaggerUI)({ url: '/openapi.json' }));
app.route('/api/v1/consultas', consultaRoutes_1.default);
const port = parseInt(process.env.PORT || "8002");
console.log(` Vethouse-treatments corriendo en http://localhost:${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port
});
