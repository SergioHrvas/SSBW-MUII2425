import {chromium} from "playwright"  // o el que sea
import * as fs from 'fs';

const browser = await chromium.launch()
const page    = await browser.newPage()

// lista de páginas con enlaces a 'obras-singulares'
const obras_singulares = [
  "https://www.mobygames.com/platform/switch/"
]


const enlaces_de_obras_singulares = []   
const lista_info_para_BD          = []

for (const pag of obras_singulares) {
  const urls = await Recupera_urls_de(pag)
  enlaces_de_obras_singulares.push(...urls)  // ... operador spread ES6
}
console.log("🚀 Hay ", enlaces_de_obras_singulares.length, ' páginas con juegos')

var i = 0
for (const url of enlaces_de_obras_singulares) {
  const info_obra = await Recupera_info_de(url)
  i++
  console.log(i + "/" + enlaces_de_obras_singulares.length + " (" + info_obra.name + ")")
  lista_info_para_BD.push(info_obra)
}	

Guarda_en_disco('info_juegos.json', lista_info_para_BD)
  
await browser.close();

async function Recupera_urls_de(pag) {
  const pags = []
  await page.goto(pag);
  const locators = page.locator('tbody > tr > .text-nowrap > a')
  for (const locator of await locators.all()) {
    pags.push(await locator.getAttribute('href'))
  }
  return pags
}

async function Recupera_info_de(url){

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



  var scoreLocator = page.locator('.mobyscore')
  var score = await scoreLocator.first().innerText() * 10
  
  
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
    score
  }
  return json_data;
}

function Guarda_en_disco(name, list){
  fs.writeFile(name, JSON.stringify(list, null, 2),'utf8', () => {
      console.log(name + " guardado.")

  })

}