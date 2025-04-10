import express from "express"
const router = express.Router();

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import logger from "../logger.mjs"
/**
 * @swagger
 * components:
 *   schemas:
 *     Juego:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "The Legend of Zelda"
 *         img:
 *           type: string
 *           example: "https://example.com/zelda.jpg"
 *         description:
 *           type: string
 *           example: "A legendary adventure game"
 *         score:
 *           type: integer
 *           example: 95
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2023-05-15T10:00:00Z"
 *         companies:
 *           type: string
 *           example: "Nintendo"
 *         genres:
 *           type: string
 *           example: "Adventure, Action"
 *     Usuario:
 *       type: object
 *       required:
 *         - correo
 *         - nombre
 *         - password
 *       properties:
 *         correo:
 *           type: string
 *           format: email
 *           description: Correo electrónico único del usuario (actúa como ID)
 *           example: "usuario@ejemplo.com"
 *         nombre:
 *           type: string
 *           description: Nombre completo del usuario
 *           example: "Juan Pérez"
 *         password:
 *           type: string
 *           format: password
 *           description: Contraseña del usuario
 *           example: "prueba"
 *         rol:
 *           type: string
 *           enum: [USUARIO, ADMINISTRADOR]
 *           description: Rol del usuario en el sistema
 *           default: USUARIO
 *           example: "USUARIO"
 *       example:
 *         correo: "usuario@ejemplo.com"
 *         nombre: "Juan Pérez"
 *         password: "$2a$10$N9qo8uLOickgx2ZMRZoMy..."
 *         rol: "USUARIO"
 */


/**
 * ==========================
 * Ruta para verificar que un usuario existe
 * ==========================
 * @swagger
 * /api/usuario/{correo}:
 *   get:
 *     tags:
 *       - Usuario
 *     summary: Verifica la existencia de un usuario por correo electrónico
 *     description: Comprueba si un usuario existe en la base de datos mediante su correo electrónico
 *     parameters:
 *       - in: path
 *         name: correo
 *         required: true
 *         description: Correo electrónico del usuario a verificar
 *         schema:
 *           type: string
 *           format: email
 *           example: usuario@ejemplo.com
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: string
 *                   description: Correo electrónico del usuario encontrado
 *                   example: "usuario@ejemplo.com"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "usuario@ejemplo.com not found"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error detallado
 *                   example: "Error en la conexión con la base de datos"
 */
router.get('/usuario/:correo', async (req, res) => {
    const correo = req.params.correo // Capturamos el correo desde los parametros

    try {

      logger.debug(`------------------------- GET USER ${correo}`)
  
      const usuario = await prisma.usuario.findUnique({
        where: {correo}
      })

  
      if (usuario) {
        res.status(200).json({ok:true, data:correo})
      } else {
        res.status(404).json({ok:false, msg:`${correo} not found`})
      }
  
    } catch (error) {
        logger.error(`Error en /api/usuario/${correo}`)
        res.status(500).json({ok:false, msg:error})
    }	
})

/**
 * ==========================
 * Ruta para ver el número de juegos
 * ==========================
 * @swagger
 * /api/juego/cuantos:
 *   get:
 *     tags:
 *       - Juego
 *     summary: Obtiene el número total de juegos
 *     description: Retorna la cantidad total de juegos registrados en el sistema
 *     responses:
 *       200:
 *         description: Número de juegos obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: integer
 *                   example: 42
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Error en la conexión con la base de datos"
 */
router.get('/juego/cuantos', async (req, res) => {
    try {
      logger.debug(`------------------------- GET JUEGO CUANTAS`)
  
      const num_juegos = await prisma.juego.count()
      res.status(200).json({ok:true, data: num_juegos})

    } catch (error) {
        logger.error(`Error en /api/juego/cuantas`)
        res.status(500).json({ok:false, msg:error})
    }	
})


/**
 * ==========================
 * Ruta para ver un juego específico
 * ==========================
 * @swagger
 * /api/juego/{id}:
 *   get:
 *     tags:
 *       - Juego
 *     summary: Obtiene un juego específico por ID
 *     description: Retorna los datos completos de un juego según su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico del juego
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Juego encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Juego'
 *       404:
 *         description: Juego no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Juego 1 not found"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Error en la conexión con la base de datos"
 */
router.get('/juego/:id', async (req, res) => {
    const id = parseInt(req.params.id) // Capturamos el ID desde los parametros

    try {

        logger.debug(`------------------------- GET JUEGO ${id}`)
    
        const juego = await prisma.juego.findUnique({
            where: {
              id: id
            }
        })
        if (juego) {
            res.status(200).json({ok:true, data:juego})
        } else {
            res.status(404).json({ok:false, msg:`Juego ${id} not found`})
        }
    } catch (error) {
        logger.error(`Error en /api/juego/${id}`)
        res.status(500).json({ok:false, msg:error})
    }	
})


/**
 * ==========================
 * Ruta para eliminar un juego específico
 * ==========================
 * @swagger
 * /api/juego/{id}:
 *   delete:
 *     tags:
 *       - Juego
 *     summary: Elimina un juego específico por ID
 *     description: Elimina permanentemente un juego del sistema según su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico del juego a eliminar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Juego eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Juego'
 *       404:
 *         description: Juego no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Juego 1 not found"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Error en la conexión con la base de datos"
 */
router.delete('/juego/:id', async (req, res) => {
    const id = parseInt(req.params.id) // Capturamos el ID desde los parametros

    try {

        logger.debug(`------------------------- DELETE JUEGO ${id}`)
    
        const juego = await prisma.juego.delete({
            where: {
              id: id
            }
          })

        if (juego) {
            res.status(200).json({ok:true, data:juego})
        } else {
            res.status(404).json({ok:false, msg:`Juego ${id} not found`})
        }
    } catch (error) {
        logger.error(`Error en /api/juego/${id}`)
        res.status(500).json({ok:false, msg:error})
    }	
})



/**
 * ==========================
 * Ruta para obtener los juegos de forma paginada
 * ==========================
 * @swagger
 * /api/juego:
 *   get:
 *     tags:
 *       - Juego
 *     summary: Obtiene juegos paginados
 *     description: Retorna una lista de juegos según el rango especificado
 *     parameters:
 *       - in: query
 *         name: desde
 *         required: true
 *         description: Índice inicial (basado en 0)
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: hasta
 *         required: true
 *         description: Índice final (no inclusive)
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Lista de juegos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Juego'
 *       404:
 *         description: No se encontraron juegos en el rango especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Juegos not found"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Error en la conexión con la base de datos"
 */
router.get('/juego', async (req, res) => {
    const min = parseInt(req.query.desde);
    const max = parseInt(req.query.hasta);

    try {

        logger.debug(`------------------------- GET JUEGO ${min} to ${max}`)
    
        const juegos = await prisma.juego.findMany(
            {
                skip: min,
                take: max - min,            
            }
        )

        if (juegos.length > 0) {
            res.status(200).json({ok:true, data: juegos})
        } else {
            res.status(404).json({ok:false, msg:`Juegos not found`})
        }
    } catch (error) {
        logger.error(`Error en /api/juego/?desde=${min}&hasta=${max}`)
        res.status(500).json({ok:false, msg:error})
    }	
})
export default router