import { test, expect } from '@playwright/test';

test('Título de la página', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await expect(page).toHaveTitle(/SWITCHERS/);
});
			
test('Busco Zelda', async ({ page }) => {
  await page.goto('http://localhost:8000/games/buscar?busqueda=zelda');
  await expect(page.getByText('The Legend of Zelda: Breath of the Wild')).toBeVisible();
});
			
test('Login Pepito', async ({ page }) => {
  await page.goto('http://localhost:8000/usuarios/login');
			
  await page.fill("#correo", "user@example.com");
  await page.fill("#password", "string");
  await page.click("#login");  
  await expect(page.getByRole('heading', { name: 'JUEGOS DE SWITCH' })).toBeVisible();
});