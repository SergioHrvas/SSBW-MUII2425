import { jsxs, jsx } from 'react/jsx-runtime';
import 'react';
import { Home, Gamepad, Search, LogIn } from 'lucide-react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    NavigationMenuPrimitive.Root,
    {
      "data-slot": "navigation-menu",
      "data-viewport": viewport,
      className: cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      ),
      ...props,
      children: [
        children,
        viewport && /* @__PURE__ */ jsx(NavigationMenuViewport, {})
      ]
    }
  );
}
function NavigationMenuList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.List,
    {
      "data-slot": "navigation-menu-list",
      className: cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Item,
    {
      "data-slot": "navigation-menu-item",
      className: cn("relative", className),
      ...props
    }
  );
}
cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
);
function NavigationMenuViewport({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "absolute top-full left-0 isolate z-50 flex justify-center"
      ),
      children: /* @__PURE__ */ jsx(
        NavigationMenuPrimitive.Viewport,
        {
          "data-slot": "navigation-menu-viewport",
          className: cn(
            "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
            className
          ),
          ...props
        }
      )
    }
  );
}
function NavigationMenuLink({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Link,
    {
      "data-slot": "navigation-menu-link",
      className: cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}

function Menu() {
  return /* @__PURE__ */ jsxs(NavigationMenu, { className: "border-b-2 border-b-slate-200 dark:border-b-slate-700 container mx-auto flex items-center", children: [
    /* @__PURE__ */ jsx("img", { src: "/img/logo.png", alt: "Logo", className: "h-10 w-auto mr-6" }),
    /* @__PURE__ */ jsxs(NavigationMenuList, { className: "grid grid-cols-4 flex-1", children: [
      /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsxs(NavigationMenuLink, { href: "/", className: "inline-flex flex-row items-center gap-3 text-xl py-8 w-full justify-center", children: [
        /* @__PURE__ */ jsx(Home, { className: "h-8 w-8" }),
        " Inicio"
      ] }) }),
      /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsxs(NavigationMenuLink, { href: "/", className: "inline-flex flex-row items-center gap-3 text-xl py-8 w-full justify-center", children: [
        /* @__PURE__ */ jsx(Gamepad, { className: "h-8 w-8" }),
        " Juegos"
      ] }) }),
      /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsxs(NavigationMenuLink, { href: "/buscar", className: "inline-flex flex-row items-center gap-3 text-xl py-8 w-full justify-center", children: [
        /* @__PURE__ */ jsx(Search, { className: "h-8 w-8" }),
        " Buscar"
      ] }) }),
      /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsxs(NavigationMenuLink, { href: "/login", className: "inline-flex flex-row items-center gap-3 text-xl py-8 w-full justify-center", children: [
        /* @__PURE__ */ jsx(LogIn, { className: "h-8 w-8" }),
        " Iniciar sesión"
      ] }) })
    ] })
  ] });
}

export { Menu as M, cn as c };
