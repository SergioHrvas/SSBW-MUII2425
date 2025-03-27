import express from "express"
const router = express.Router();

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

router.get('/buscar', async (req, res) => {
  const busqueda = req.query.busqueda
  try {

    //Consultar juegos que tengan en su nombre la palabra buscada
    const juegos = await prisma.juego.findMany({
      where: {
        descripcion: {
          search: busqueda,
          mode: 'insensitive', // Default value: default
        }
      },
      orderBy: {
        _relevance: {
          fields: ['name', 'descripcion'],
          search: busqueda,
          sort: 'desc',
        }
      }
    })

    res.render('resultados.njk', { juegos, busqueda })
  } catch (err) {
    console.error(err)
    res.status(500).send({ err }) // o usar una página de error personalizada
  }
})
export default router