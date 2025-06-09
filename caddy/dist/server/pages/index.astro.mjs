import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B_PuTSvK.mjs';
import 'kleur/colors';
import { $ as $$Main } from '../chunks/main_D4kIq5Dv.mjs';
import { c as cn, M as Menu } from '../chunks/Menu_DumWImAm.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import useSWR from 'swr';
export { renderers } from '../renderers.mjs';

function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}

function Juego({ id, titulo, descripcion, img }) {
  return /* @__PURE__ */ jsxs(Card, { className: "max-w-sm max-h-[32rem] shadow-lg rounded-lg overflow-hidden bg-white flex flex-col", children: [
    /* @__PURE__ */ jsx("a", { href: `/game/${id}`, className: "relative h-40 w-full flex-shrink-0 block", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: `/img/${img}`,
        alt: titulo,
        className: "object-cover w-full h-full transition-transform duration-300 hover:scale-105"
      }
    ) }),
    /* @__PURE__ */ jsx("a", { href: `/game/${id}`, className: "", children: /* @__PURE__ */ jsx(CardHeader, { className: "pb-2 pt-4 px-4 flex-shrink-0", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg font-semibold text-gray-800", children: titulo }) }) }),
    /* @__PURE__ */ jsx(CardContent, { className: "px-4 pb-4 overflow-auto flex-1", children: /* @__PURE__ */ jsx(CardDescription, { className: "text-gray-600 break-words whitespace-pre-line", children: descripcion }) })
  ] });
}

const fetcher = (url) => fetch(url).then((res) => res.json());
const pageSize = 9;
function Contenido() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/api/juego/?desde=${currentPage * pageSize}&hasta=${(currentPage + 1) * pageSize}`,
    fetcher,
    { refreshInterval: 1e3 }
  );
  if (error) return /* @__PURE__ */ jsx("div", { children: "Fallo al cargar" });
  if (isLoading) return /* @__PURE__ */ jsx("div", { children: "Cargando..." });
  if (!data || !data.data) return /* @__PURE__ */ jsx("div", { children: "No hay datos disponibles." });
  const juegos = data.data.juegos ?? [];
  const totalPages = data.data.pages ?? 1;
  data.data.page ?? 0;
  console.log(data);
  if (juegos.length === 0 && currentPage > 0) {
    setCurrentPage((prev) => Math.max(0, prev - 1));
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center mt-10 mb-10 text-white space-y-4", children: [
    juegos.reduce((rows, j, idx) => {
      if (idx % 3 === 0) rows.push([]);
      rows[rows.length - 1].push(j);
      return rows;
    }, []).map((row, rowIdx) => /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-4", children: row.map((j) => /* @__PURE__ */ jsx(Juego, { id: j.id, titulo: j.name, descripcion: j.description, img: j.img }, j.id)) }, rowIdx)),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center mt-4 space-x-2", children: [
      currentPage > 0 && /* @__PURE__ */ jsx(
        "button",
        {
          className: "bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer",
          onClick: () => setCurrentPage((prev) => Math.max(0, prev - 1)),
          disabled: currentPage === 0,
          children: "Anterior"
        }
      ),
      currentPage < totalPages - 1 && /* @__PURE__ */ jsx(
        "button",
        {
          className: "bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer",
          onClick: () => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1)),
          disabled: currentPage >= totalPages - 1,
          children: "Siguiente"
        }
      )
    ] })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Main, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Menu", Menu, {})} ${renderComponent($$result2, "Contenido", Contenido, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/Contenido", "client:component-export": "default" })} ${maybeRenderHead()}<footer class="mt-12 bg-gray-100 dark:bg-gray-800 py-6 px-4 rounded-lg shadow text-center"> <p class="text-gray-600 dark:text-gray-300 text-sm">© 2023 - Todos los derechos reservados</p> <p class="text-gray-500 dark:text-gray-400 text-xs mt-1">
Desarrollado por
<a href="http://github.com/SergioHrvas" class="text-blue-600 dark:text-blue-400 hover:underline ml-1">Sergio</a> </p> </footer> ` })}`;
}, "/home/sergio/Documentos/Master/SSBW/astro-app/src/pages/index.astro", void 0);

const $$file = "/home/sergio/Documentos/Master/SSBW/astro-app/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
