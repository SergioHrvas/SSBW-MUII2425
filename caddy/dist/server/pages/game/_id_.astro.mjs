import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B_PuTSvK.mjs';
import 'kleur/colors';
import { $ as $$Main } from '../../chunks/main_D4kIq5Dv.mjs';
import { M as Menu } from '../../chunks/Menu_DumWImAm.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import useSWR from 'swr';
export { renderers } from '../../renderers.mjs';

const fetcher = (url) => fetch(url).then((res) => res.json());
function Contenido({ gameId }) {
  const [idGame, setIdGame] = useState(gameId);
  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/api/juego/${idGame}`,
    fetcher,
    { refreshInterval: 1e3 }
  );
  if (error) return /* @__PURE__ */ jsx("div", { children: "Fallo al cargar" });
  if (isLoading) return /* @__PURE__ */ jsx("div", { children: "Cargando..." });
  if (!data || !data.data) return /* @__PURE__ */ jsx("div", { children: "No hay datos disponibles." });
  const juego = data.data ?? "";
  const fechaFormateada = new Date(juego.date).toLocaleDateString();
  return /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row justify-center items-start gap-8", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full lg:w-1/2 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "bg-white p-0 rounded-lg overflow-hidden w-full max-w-md", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: `/img/${juego.img}`,
        alt: `Portada de ${juego.nombre}`,
        className: "w-full aspect-[5/8] object-cover rounded"
      }
    ) }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full lg:w-1/2", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-gray-800 to-blue-900 p-6 rounded-xl text-white", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6", children: juego.nombre }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-800", children: "🗓️ Fecha de lanzamiento" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: fechaFormateada })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 text-center", children: [
          /* @__PURE__ */ jsxs("p", { className: "font-bold text-gray-800", children: [
            "⭐ Puntuación: ",
            juego.score,
            " / 100"
          ] }),
          /* @__PURE__ */ jsx(
            "progress",
            {
              value: juego.score,
              max: "100",
              className: "w-full h-2 rounded overflow-hidden"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-800 mb-2", children: "🎮 Géneros" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-2", children: /* @__PURE__ */ jsx("span", { className: "bg-blue-500 text-white px-3 py-1 rounded-full text-sm", children: juego.genres }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-800 mb-2", children: "👨‍💻 Desarrolladores" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-2", children: /* @__PURE__ */ jsx("span", { className: "bg-blue-500 text-white px-3 py-1 rounded-full text-sm", children: juego.companies }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: "📜 Descripción" }),
        /* @__PURE__ */ jsx("p", { className: "max-h-48 overflow-y-auto pr-2", children: juego.description })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: juego.url,
            className: "bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg text-center font-medium flex-1 transition-colors",
            children: "🎮 Ver en Nintendo eShop"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: juego.url,
            className: "bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-center font-medium flex-1 transition-colors",
            children: "🛒 Añadir al carrito"
          }
        )
      ] })
    ] }) })
  ] }) });
}

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const gameId = id ? Number(id) : void 0;
  return renderTemplate`${renderComponent($$result, "Layout", $$Main, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Menu", Menu, {})} ${typeof gameId === "number" ? renderTemplate`${renderComponent($$result2, "GamePage", Contenido, { "client:load": true, "gameId": gameId, "client:component-hydration": "load", "client:component-path": "@/components/GamePage", "client:component-export": "default" })}` : renderTemplate`${maybeRenderHead()}<p>Error: Invalid game ID</p>`}<footer class="mt-12 bg-gray-100 dark:bg-gray-800 py-6 px-4 rounded-lg shadow text-center"> <p class="text-gray-600 dark:text-gray-300 text-sm">© 2023 - Todos los derechos reservados</p> <p class="text-gray-500 dark:text-gray-400 text-xs mt-1">
Desarrollado por
<a href="http://github.com/SergioHrvas" class="text-blue-600 dark:text-blue-400 hover:underline ml-1">Sergio</a> </p> </footer> ` })}`;
}, "/home/sergio/Documentos/Master/SSBW/astro-app/src/pages/game/[id].astro", void 0);

const $$file = "/home/sergio/Documentos/Master/SSBW/astro-app/src/pages/game/[id].astro";
const $$url = "/game/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
