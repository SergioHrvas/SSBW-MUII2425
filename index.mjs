// index.mjs
import express from 'express'
import nunjucks from 'nunjucks'
import gamesRouter from "./routes/games.mjs"
import usersRouter from "./routes/usuarios.mjs"
import { PrismaClient } from '@prisma/client'
import cookieParser from 'cookie-parser'
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

app.get('/juego/:id', async (req, res) => {
	 const id = parseInt(req.params.id) // id del juego
	 const juego = await prisma.juego.findUnique({
		where: {
			id: id
		}
	 })

	 try {
		 res.render("game.njk", { juego })
	 }
	 catch (err) {
		 console.error(err)
		 res.status(500).send({ err }) // o usar una página de error personalizada
	 }
})

//Tarea 5
app.use('/usuarios', usersRouter)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Servidor ejecutandose en  http://localhost:${PORT} en ${IN}`);
})


// middleware de autenticación
const autentificación = (req, res, next) => {
	const token = req.cookies.access_token;
	if (token) {
	  const data = jwt.verify(token, process.env.SECRET_KEY);
	  req.usuario        = data.usuario   // en el request
	  req.rol            = data.rol
	  res.locals.usuario = data.usuario   // en el response para
	  res.locals.rol     = data.rol       // para que se tenga acceso en las plantillas
	  console.log('En el request ', req.usuario, req.rol)
	}
	next()
  }
  

  app.use(autentificación)