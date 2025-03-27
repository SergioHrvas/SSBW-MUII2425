import jwt from "jsonwebtoken"
import express from "express"


const router = express.Router();

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from "bcryptjs"

router.get('/login', (req, res) => {
  res.render('login.njk')
})

router.post('/login', async (req, res) => {     // viene del formulario de login
  const { correo, password } = req.body

  try {

    // comprobar las credenciales en la BD:
    const user = await prisma.usuario.findFirst({
      where: {
        correo
      }
    })
    if (!user) {
      return res.render('login.njk', { error: 'Usuario no encontrado' })
    }

    // comprobar la contraseña
    const coincide = await bcrypt.compare(password, user.password)
    if (!coincide) {
      return res.render('login.njk', { error: 'Contraseña incorrecta' })
    }

    // genera el token jwt, con una clave secreta en .env
    const token = jwt.sign({ usuario: user.nombre, rol: user.rol }, process.env.SECRET_KEY)

    res.locals.usuario = user.nombre           // info para las plantillas en el response
    res.locals.rol = user.rol           // info para las plantillas en el response

    //Consultar juegos que tengan en su nombre la palabra buscada
    const juegos = await prisma.juego.findMany({

    })

    console.log("a", res.locals.usuario, res.locals.rol)
    // pone la cookie con el jwt	
    res.cookie('access_token', token, {
      httpOnly: true,                          // Evita acceso desde JavaScript del cliente
      secure: process.env.IN === 'production', // En producción aseguramos HTTPS
      maxAge: 7200000                          // 2 horas en milisegundos
    }).render('index.njk', { juegos }) // Redirige a la ruta que renderiza los juegos
  }
  catch (err) {
    console.error(err)
    return res.render('register.njk', { error: "Error interno." })
  }
})

router.get('/logout', (req, res) => {
  // eliminar la cookie
  res.locals.usuario = null
  res.locals.rol = null
  res.clearCookie('access_token').render('login.njk') // o donde sea
})

router.get('/register', (req, res) => {
  res.render('register.njk')
})

router.post('/register', async (req, res) => {  // viene del formulario de registro

  // comprobar que no existe el usuario
  const existe = await prisma.usuario.findFirst({
    where: {
      correo: req.body.correo
    }
  })
  if (existe) {
    return res.render('register.njk', { error: 'El correo ya está registrado.' })
  }

  // ciframos la contraseña
  const password = await bcrypt.hash(req.body.password, 10)

  try {
    // crear el usuario
    const user = await prisma.usuario.create({
      data: {
        nombre: req.body.nombre,
        correo: req.body.correo,
        password,
      }
    })

    res.render('login.njk') // o a una bienvenida

  }
  catch (err) {
    console.error(err)
    return res.render('register.njk', { error: "Error interno." })
  }
})

export default router