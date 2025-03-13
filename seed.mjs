// seed.mjs
import { readFileSync, readFile } from "fs"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { createWriteStream } from "fs";
import { Readable } from "stream";

function toSlug(filename) {
    return filename.replace(/^(\d{6,8}-)/, '') // Elimina los primeros 6/7 números seguidos de un guion
        .replace(/[^a-zA-Z0-9.-]+/g, '-')     // Reemplaza espacios y caracteres especiales por guiones (mantiene puntos)
        .replace(/-+/g, '-')                  // Elimina guiones repetidos
        .toLowerCase();                        // Convierte todo a minúsculas
}


const juegos = leer_desde('./info_juegos.json')

juegos.forEach( async ({img, name, descripcion, score}) => {

    const url = img;
    const fileName = toSlug(url.split("/").pop());
    console.log(fileName)
    const resp = await fetch(url);
    if (resp.ok && resp.body) {
    let writer = createWriteStream(`./public/img/${fileName}`);
      Readable.fromWeb(resp.body).pipe(writer);
    }

    // guardar en la BD los datos
    prisma.juego.create({
        data: {
            name,
            descripcion,
            score,
            img: fileName
        }
    }).then(() => {
        console.log('Juego guardado')
    }).catch((error) => {
        console.log('Error al guardar el juego', error)
    })

});

function leer_desde(archivo_url) {
    const contenido = readFileSync(archivo_url, 'utf-8')
    return JSON.parse(contenido)
}