import { chromium } from "playwright"  // o el que sea
import * as fs from 'fs';

const browser = await chromium.launch()
const page = await browser.newPage()

// lista de páginas con enlaces a 'juegos'
const juegos_pages = [
  "https://www.mobygames.com/platform/switch/",
  "https://www.mobygames.com/platform/switch/page:1/",
  "https://www.mobygames.com/platform/switch/page:2/",
  "https://www.mobygames.com/platform/switch/page:3/",
]

const enlaces_de_juegos = []
const lista_info_para_BD = []

// Recuperamos los enlaces de cada página y los guardamos en un array
for (const pag of juegos_pages) {
  const urls = await Recupera_urls_de(pag)
  enlaces_de_juegos.push(...urls)  // ... operador spread ES6
}

console.log("🚀 Hay ", enlaces_de_juegos.length, ' páginas con juegos')

var i = 0
for (const url of enlaces_de_juegos) {
  const info_juego = await Recupera_info_de(url)
  i++
  console.log(i + "/" + enlaces_de_juegos.length + " (" + info_juego.name + ")")
  lista_info_para_BD.push(info_juego)
}

Guarda_en_disco('info_juegos.json', lista_info_para_BD)

await browser.close();


/** 
  *
  * Funciones
  *
**/

// Recupera los enlaces de cada página
async function Recupera_urls_de(pag) {
  const pags = []
  await page.goto(pag);
  const locators = page.locator('tbody > tr > .text-nowrap > a')
  for (const locator of await locators.all()) {
    pags.push(await locator.getAttribute('href'))
  }
  return pags
}

// Recupera la información de cada juego
async function Recupera_info_de(url) {

  await page.goto(url);


  //Sacamos el titulo
  const nameLocator = page.locator('.mb > h1')
  var name = await nameLocator.first().innerText()


  // Intentar obtener la descripción desde el primer selector con un timeout de 1 segundo
  let descripcion = await page.locator('#gameOfficialDescription').textContent({ timeout: 1000 }).catch(() => null);

  // Si no se encontró, intenta con el segundo selector, también con un timeout de 1 segundo
  if (!descripcion) {
    descripcion = await page.locator('#gameDescription').textContent({ timeout: 1000 }).catch(() => null);
  }

  if (descripcion) {
    descripcion = descripcion.split('\n') // Divide en líneas
      .slice(2) // Elimina las dos primeras líneas
      .join(' ') // Une las líneas restantes con espacios
      .replace(/official descriptions?/gi, '')
      .trim() // Elimina espacios en los extremos
      .replace(/\s+/g, ' '); // Reemplaza múltiples espacios por uno solo
  }


  //Sacamos la puntuación
  var scoreLocator = page.locator('.mobyscore')
  var score = await scoreLocator.first().innerText() * 10


  // Sacamos la fecha de lanzamiento
  const dateContainer = page.locator('dt:has-text("Released") + dd');
  const dateText = await dateContainer.locator('a').first().innerText();

  // Convertir la fecha al formato español
  // Formato: "DD/MM/YYYY"
  const fecha = new Date(dateText);
  const fechaFormateada = fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });

  //Sacamos la compañía
  var companyLocator = page.locator('dt:has-text("Developers") + dd')
  var company = await companyLocator.allTextContents()

  // Limpiar los textos (eliminar espacios en blanco)
  const cleanedCompany = company.map(comp => comp.trim());

  // Extraer los géneros
  // Localizar el contenedor de géneros
  const genreContainer = page.locator('dt:has-text("Genre") + dd');

  // Extraer todos los textos de los enlaces de géneros
  const genres = await genreContainer.locator('a').allTextContents();

  // Limpiar los textos (eliminar espacios en blanco)
  const cleanedGenres = genres.map(genre => genre.trim());

  //Sacamos la imagen
  const imageUrlLocator = page.locator('.info-box > div > #cover')
  var imgUrl = await imageUrlLocator.first().getAttribute('href')

  await page.goto(imgUrl)

  var imgLocator = page.locator('figure > .img-fluid')
  var img = await imgLocator.first().getAttribute('src')

  //Generamos JSON
  var json_data = {
    name,
    img,
    descripcion,
    score,
    date: fechaFormateada,
    companies: cleanedCompany,
    genres: cleanedGenres
  }
  return json_data;
}

// Guarda la lista de juegos en disco
function Guarda_en_disco(name, list) {
  fs.writeFile(name, JSON.stringify(list, null, 2), 'utf8', () => {
    console.log(name + " guardado.")
  })
}