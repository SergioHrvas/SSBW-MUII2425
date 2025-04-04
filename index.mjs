// Importamos las librerías necesarias
import express from 'express'
import nunjucks from 'nunjucks'
import gamesRouter from "./routes/games.mjs"
import usersRouter from "./routes/usuarios.mjs"
import { PrismaClient } from '@prisma/client'
import cookieParser from 'cookie-parser'
import jwt from "jsonwebtoken"

// Configuración de la aplicación web
const prisma = new PrismaClient()
const IN = process.env.IN || 'development' // development o production
const app = express()

app.use(express.json()) // para recibir json
app.use(cookieParser()) // para 
app.use(express.urlencoded({ extended: true })) // para recibir formularios
app.use(express.static('public')) // para recibir archivos estáticos

nunjucks.configure('views', {             // directorio 'views' para las plantillas html
	autoescape: true,
	noCache: IN === 'development',       // true para desarrollo, sin cache
	watch: IN === 'development',       // reinicio con Ctrl-S
	express: app
})

app.use(express.static('public'))
app.set('view engine', 'html')

// Middleware de autenticación
const autentificación = (req, res, next) => {
	const token = req.cookies.access_token;
	if (token) {
		const data = jwt.verify(token, process.env.SECRET_KEY);
		req.usuario = data.usuario   // en el request
		req.rol = data.rol
		res.locals.usuario = data.usuario   // en el response para
		res.locals.rol = data.rol       // para que se tenga acceso en las plantillas
	}
	next()
}

app.use(autentificación)

// Endpoint de prueba)
app.get('/hola', (req, res) => {          // test para el servidor
	res.send('Hola desde el servidor');
});

// Página principal (lista de juegos)
app.get('/', async (req, res) => {
	const juegos = await prisma.juego.findMany()
	try {
		res.render("index.njk", { juegos })
	}
	catch (err) {
		console.error(err)
		res.status(500).send({ err })
	}
})


// Página de búsqueda
app.get('/buscar', (req, res) => {
	res.render("search.njk")
})

// Importamos las rutas de los juegos
app.use("/games", gamesRouter);

// Importamos las rutas de los usuarios
app.use('/usuarios', usersRouter)

// Conexión a la base de datos
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Servidor ejecutandose en  http://localhost:${PORT} en ${IN}`);
})