// Importamos las librerías necesarias
import express from 'express'
import nunjucks from 'nunjucks'
import gamesRouter from "./routes/games.mjs"
import usersRouter from "./routes/usuarios.mjs"
import apiRouter from "./routes/api.mjs"
import { PrismaClient } from '@prisma/client'
import cookieParser from 'cookie-parser'
import jwt from "jsonwebtoken"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express";
import logger from "./logger.mjs"
import cors from 'cors'
import dotenv from 'dotenv';

const environment = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${environment}` });

// Configuración de la aplicación web
const prisma = new PrismaClient()
const app = express()

app.use(cors()) // para permitir el acceso a la API desde otros dominios

app.use(express.json()) // para recibir json
app.use(cookieParser()) // para 
app.use(express.urlencoded({ extended: true })) // para recibir formularios
app.use(express.static('public')) // para recibir archivos estáticos

const env = nunjucks.configure('views', {             // directorio 'views' para las plantillas html
	autoescape: true,
	noCache: environment === 'development',       // true para desarrollo, sin cache
	watch: environment === 'development',       // reinicio con Ctrl-S
	express: app
})

app.set('view engine', 'html')

// Middleware de autenticación
const autentificación = (req, res, next) => {
	const token = req.cookies.access_token;
	if (token) {
		const data = jwt.verify(token, process.env.SECRET_KEY);
		req.usuario = data.usuario   // en el request
		req.rol = data.rol
		res.locals.usuario = data.usuario  
		res.locals.rol = data.rol       // para que se tenga acceso en las plantillas
		console.log('En el request ', req.usuario, req.rol)
	}
	next()
}

app.use(autentificación)

/*
  ==========================
  Ruta de prueba
  ==========================
*/
app.get('/hola', (req, res) => {          // test para el servidor
	res.send('Holaa desde el servidor');
});

/*
  ==========================
  Ruta raíz (lista de juegos)
  ==========================
*/
app.get('/', async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1; // Página actual (default 1)
		const limit = 18; // Número de juegos por página
		const offset = (page - 1) * limit; // Offset para la consulta
		const totalJuegos = await prisma.juego.count(); // Total de juegos en la base de datos
	
		const totalPaginas = Math.ceil(totalJuegos / limit); // Total de páginas
		const juegos = await prisma.juego.findMany(
			{
				skip: offset,
				take: limit,
				orderBy: {
					id: 'asc'
				},
			
			}
		)
		res.render("index.njk", { juegos, page, totalPaginas, totalJuegos })
	}
	catch (err) {
		logger.error(`Error en /`)

		console.error(err)
		res.status(500).send({ err })
	}
})


/*
  ============================================
  Ruta para renderizar la página de error (prueba)
  ============================================
*/
app.get('/error', async (req, res) => {
	try {
		logger.error(`Error de ruta`)
		res.render("error.njk")
	}
	catch (err) {
		console.error(err)
		res.status(500).send({ err })
	}
})

/*
  ============================================
  Ruta para renderizar la página de búsqueda
  ============================================
*/
app.get('/buscar', (req, res) => {
	res.render("search.njk")
})

// Importamos las rutas de los juegos
app.use("/games", gamesRouter);

// Importamos las rutas de los usuarios
app.use('/usuarios', usersRouter)

// Importamos las rutas de APIs
app.use('/api', apiRouter)

//Configuramos Swagger
const options = {
	definition: {
	  openapi: "3.1.0",
	  info: {
		title: "LogRocket Express API with Swagger",
		version: "0.1.0",
		description:
		  "This is a simple CRUD API application made with Express and documented with Swagger",
		license: {
		  name: "MIT",
		  url: "https://spdx.org/licenses/MIT.html",
		},
		contact: {
		  name: "LogRocket",
		  url: "https://logrocket.com",
		  email: "info@email.com",
		},
	  },
	  servers: [
		{
		  url: "http://localhost:8000",
		},
	  ],
	},
	apis: ["./routes/api.mjs"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(specs)
  );

/** 
 * =================
 * Manejo de errores
 * =================
 */ 
// Middleware para manejar 404
app.use((req, res, next) => {
	logger.error(`Error de ruta`)

	res.status(404).render('error.njk');
  });
  
// Errores internos
app.use((err, req, res, next) => {
	console.error(err.stack);
	logger.error(`Error de ruta`)

	res.status(500).render('error.njk');
});

  

// Conexión a la base de datos
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Servidor ejecutándose en http://localhost:${PORT} [${environment}]`);
})