import express from "express"
const router = express.Router();

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

/*
  ==========================
  Ruta para buscar juegos
  ==========================
*/
router.get('/buscar', async (req, res) => {
  const busqueda = req.query.busqueda
  try {

    //Consultar juegos que tengan en su nombre la palabra buscada
    const juegos = await prisma.juego.findMany({
      where: {
        description: {
          search: busqueda,
          mode: 'insensitive',
        }
      },
      orderBy: {
        _relevance: {
          fields: ['name', 'description'],
          search: busqueda,
          sort: 'desc',
        }
      }
    })

    res.render('resultados.njk', { juegos, busqueda })
  } catch (err) {
    console.error(err)
    res.status(500).send({ err })
  }
})

/*
  ==========================
  Ruta para obtener un juego
  ==========================
*/
router.get('/game/:id', async (req, res) => {
  const id = parseInt(req.params.id) // id del juego

  try {
    const juego = await prisma.juego.findUnique({
      where: {
        id: id
      }
    })

    res.render("game.njk", {   juego: {
      ...juego,
      fechaFormateada: new Date(juego.date).toLocaleDateString('es-ES')
    } })
  }
  catch (err) {
    console.error(err)
    res.status(500).send({ err }) 
  }
})

export default router