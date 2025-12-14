import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv"
dotenv.config();
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "School & Course API",
        version: "1.0.0",
        description: "API for managing students and courses",
    },
    servers: [
        {
            url: process.env.API_URL,
            description: "Local server",
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./src/routes/*.js"], // Quét JSDoc trong routes
};

const swaggerSpec = swaggerJsdoc(options);

export default (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
