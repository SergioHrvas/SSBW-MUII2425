import { chromium } from "playwright"  // o el que sea
import * as fs from 'fs';

const browser = await chromium.launch()
const page = await browser.newPage()

// lista de páginas con enlaces a 'obras-singulares'
const obras_singulares = [
  "https://www.museosdeandalucia.es/web/museoarqueologicodegranada/obras-singulares"
]


const enlaces_de_obras_singulares = []
const lista_info_para_BD = []

for (const pag of obras_singulares) {
  const urls = await Recupera_urls_de(pag)
  enlaces_de_obras_singulares.push(...urls)  // ... operador spread ES6
}
console.log("🚀 Hay ", enlaces_de_obras_singulares.length, ' páginas con obras singulares')

for (const url of enlaces_de_obras_singulares) {
  const info_obra = await Recupera_info_de(url)

  lista_info_para_BD.push(info_obra)
}

Guarda_en_disco('info_obras.json', lista_info_para_BD)

await browser.close();

async function Recupera_urls_de(pag) {
  const pags = []
  await page.goto(pag);
  const locators = page.locator('.descripcion > a')
  for (const locator of await locators.all()) {
    pags.push(await locator.getAttribute('href'))
  }
  return pags
}

async function Recupera_info_de(url) {
  await page.goto(url);

  //Sacamos el titulo
  const nameLocator = page.locator('.header-title > span')
  var name = await nameLocator.first().innerText()

  //Sacamos la imagen
  const imageLocator = page.locator('.wrap-img > img')
  var img = await imageLocator.first().getAttribute('src')

  //Sacamos el tipo y la descripción
  const infos = page.locator('.body-content > p')
  var tipo = await infos.nth(0).innerText();
  var descripcion = await infos.nth(4).innerText();

  //Sacamos procedencia
  var procedencia = await infos.nth(3).innerText();

  //Generamos JSON
  var json_data = {
    name,
    tipo,
    descripcion,
    procedencia,
    img
  }
  return json_data;
}

function Guarda_en_disco(name, list) {
  fs.writeFile(name, JSON.stringify(list, null, 2), 'utf8', () => {
    console.log(name + " guardado.")

  })

}