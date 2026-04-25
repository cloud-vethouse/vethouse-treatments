"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || '';
        if (!uri)
            throw new Error('MONGODB_URI no está definido en el .env');
        await mongoose_1.default.connect(uri);
        console.log('MongoDB conectado exitosamente (MS3)');
    }
    catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1);
    }
};
exports.default = connectDB;
