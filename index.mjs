// index.mjs
import express from 'express'
import nunjucks from 'nunjucks'
import gamesRouter from "./routes/games.mjs"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const IN = process.env.IN || 'development' // development o production
const app = express()

nunjucks.configure('views', {             // directorio 'views' para las plantillas html
	autoescape: true,
	noCache: IN === 'development',       // true para desarrollo, sin cache
	watch: IN === 'development',       // reinicio con Ctrl-S
	express: app
})

app.use(express.static('public'))
app.set('view engine', 'html')

// Tarea 0

app.get('/hola', (req, res) => {          // test para el servidor
	res.send('Hola desde el servidor');
});


/* 
app.get('/', (req, res) => {               // test plantillas en: 
	res.render("index.html", {saludado:'Pepito'})           // ./views/index.html
})
*/


//Tarea 1

app.get('/', async (req, res) => {
	//Consultar juegos que tengan en su nombre la palabra buscada
	const juegos = await prisma.juego.findMany({

	})

	try {
		console.log(juegos[0])
		res.render("index.njk", {juegos})

	}
	catch (err) {
		console.error(err)
		res.status(500).send({ err }) // o usar una página de error personalizada
	}
})

app.get('/game', (req, res) => {
	res.render("game.njk")
})



//Tarea 4

app.use("/games", gamesRouter);

app.get('/buscar', (req, res) => {
	res.render("search.njk")
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Servidor ejecutandose en  http://localhost:${PORT} en ${IN}`);
})
