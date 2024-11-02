import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import fastifyCors from "@fastify/cors";
import { fastify } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

import { prisma } from "./lib/prisma/prisma";
import { deviceRoutes } from "./routes/device";
import { BadRequestError } from "./routes/_errors/bad-request-error";
import { deviceLogRoutes } from "./routes/deviceLog";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors);

// Função para verificar a conexão com o banco de dados
async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Conexão com o banco de dados estabelecida.");
  } catch (error) {
    console.error("Banco de dados desconectado:", error);
    error instanceof BadRequestError;
    process.exit(1);
  }
}

//Gerar a documentção da Api
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Hikvision",
      description: "Hikvision sistema de coleta de dados dos aparelhos.",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Desenvolvimento local",
      },
    ],
  },
  transform: jsonSchemaTransform,
});

//Registre suas rotas
app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});
app.register(deviceRoutes);
app.register(deviceLogRoutes);

// Definindo a porta de forma dinâmica
const PORT: number = Number(process.env.PORT) || 4000;

checkDatabaseConnection().then(() => {
  app.listen({ port: PORT }).then(() => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
