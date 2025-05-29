import 'kleur/colors';
import { o as decodeKey } from './chunks/astro/server_B_PuTSvK.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CNX1FlI8.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/sergio/Documentos/Master/SSBW/astro-app/","cacheDir":"file:///home/sergio/Documentos/Master/SSBW/astro-app/node_modules/.astro/","outDir":"file:///home/sergio/Documentos/Master/SSBW/astro-app/dist/","srcDir":"file:///home/sergio/Documentos/Master/SSBW/astro-app/src/","publicDir":"file:///home/sergio/Documentos/Master/SSBW/astro-app/public/","buildClientDir":"file:///home/sergio/Documentos/Master/SSBW/astro-app/dist/client/","buildServerDir":"file:///home/sergio/Documentos/Master/SSBW/astro-app/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.B_3k2x1c.css"}],"routeData":{"route":"/markdown-page","isIndex":false,"type":"page","pattern":"^\\/markdown-page\\/?$","segments":[[{"content":"markdown-page","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/markdown-page.md","pathname":"/markdown-page","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.B_3k2x1c.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/sergio/Documentos/Master/SSBW/astro-app/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/sergio/Documentos/Master/SSBW/astro-app/src/pages/markdown-page.md",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/markdown-page@_@md":"pages/markdown-page.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CdkzHXbK.mjs","/home/sergio/Documentos/Master/SSBW/astro-app/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/home/sergio/Documentos/Master/SSBW/astro-app/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BfI41akJ.mjs","@/components/Contenido":"_astro/Contenido.C9rP-jip.js","@astrojs/react/client.js":"_astro/client.WTQKsNj6.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.B_3k2x1c.css","/favicon.svg","/_astro/Contenido.C9rP-jip.js","/_astro/client.WTQKsNj6.js","/_astro/index.BuPc0TuZ.js","/img/1000xresist-nintendo-switch-front-cover.jpg","/img/13-sentinels-aegis-rim-playstation-4-front-cover.jpg","/img/30xx-windows-front-cover.jpg","/img/a-short-hike-windows-front-cover.jpg","/img/a-space-for-the-unbound-xbox-one-front-cover.jpg","/img/ace-attorney-investigations-collection-windows-apps-front-cover.png","/img/advance-wars-12-re-boot-camp-nintendo-switch-front-cover.jpg","/img/ai-the-somnium-files-nirvana-initiative-nintendo-switch-front-co.jpg","/img/ai-the-somnium-files-windows-front-cover.jpg","/img/alien-isolation-windows-front-cover.jpg","/img/animal-crossing-new-horizons-nintendo-switch-front-cover.jpg","/img/animal-well-windows-front-cover.jpg","/img/anonymouscode-playstation-4-front-cover.png","/img/ape-out-windows-front-cover.jpg","/img/apollo-justice-ace-attorney-trilogy-windows-apps-front-cover.jpg","/img/arranger-a-role-puzzling-adventure-android-front-cover.png","/img/assault-android-cactus-linux-front-cover.jpg","/img/astral-chain-nintendo-switch-front-cover.jpg","/img/atari-50-the-anniversary-celebration-xbox-one-front-cover.jpg","/img/atelier-ryza-3-alchemist-of-the-end-the-secret-key-nintendo-swit.jpg","/img/axiom-verge-ps-vita-front-cover.jpg","/img/baba-is-you-linux-front-cover.jpg","/img/bakeru-nintendo-switch-front-cover.jpg","/img/balatro-xbox-one-front-cover.png","/img/bayonetta-2-wii-u-front-cover.jpg","/img/bayonetta-3-nintendo-switch-front-cover.jpg","/img/bayonetta-origins-cereza-and-the-lost-demon-nintendo-switch-fron.jpg","/img/beacon-pines-windows-front-cover.jpg","/img/bioshock-the-collection-xbox-one-front-cover.png","/img/blaster-master-zero-iii-xbox-one-front-cover.jpg","/img/blazblue-central-fiction-special-edition-nintendo-switch-front-c.png","/img/botany-manor-windows-apps-front-cover.jpg","/img/cadence-of-hyrule-crypt-of-the-necrodancer-featuring-the-legend-.jpg","/img/capcom-fighting-collection-playstation-4-front-cover.jpg","/img/castlevania-advance-collection-nintendo-switch-front-cover.jpg","/img/castlevania-dominus-collection-xbox-series-front-cover.png","/img/cave-story-nintendo-switch-front-cover.png","/img/celeste-linux-front-cover.jpg","/img/chained-echoes-windows-apps-front-cover.jpg","/img/chicken-police-paint-it-red-playstation-4-front-cover.jpg","/img/child-of-light-complete-edition-ps-vita-front-cover.jpg","/img/cocoon-playstation-5-front-cover.jpg","/img/coffee-talk-episode-2-hibiscus-butterfly-windows-apps-front-cove.jpg","/img/crosscode-linux-front-cover.jpg","/img/cthulhu-saves-christmas-windows-front-cover.jpg","/img/cuphead-windows-front-cover.jpg","/img/cupid-parasite-nintendo-switch-front-cover.jpg","/img/dark-souls-remastered-windows-front-cover.jpg","/img/dave-the-diver-windows-front-cover.jpg","/img/dead-cells-linux-front-cover.jpg","/img/diablo-iii-eternal-collection-playstation-4-front-cover.jpg","/img/disgaea-5-complete-nintendo-switch-front-cover.png","/img/donkey-kong-country-tropical-freeze-wii-u-front-cover.jpg","/img/doom-eternal-windows-front-cover.jpg","/img/dragon-ball-fighterz-windows-front-cover.jpg","/img/dragon-quest-builders-2-playstation-4-front-cover.jpg","/img/dragon-quest-iii-hd-2d-remake-playstation-5-front-cover.jpg","/img/dragon-quest-xi-s-echoes-of-an-elusive-age-definitive-edition-ni.jpg","/img/dreamscaper-windows-front-cover.jpg","/img/dredge-xbox-one-front-cover.jpg","/img/dungeons-of-dreadrock-2-the-dead-kings-secret-windows-front-cove.jpg","/img/ender-lilies-quietus-of-the-knights-windows-front-cover.jpg","/img/ender-magnolia-bloom-in-the-mist-windows-front-cover.jpg","/img/enter-the-gungeon-linux-front-cover.jpg","/img/everhood-windows-front-cover.jpg","/img/fire-emblem-engage-nintendo-switch-front-cover.jpg","/img/fire-emblem-three-houses-nintendo-switch-front-cover.jpg","/img/freedom-planet-2-windows-front-cover.jpg","/img/ghost-trick-phantom-detective-nintendo-switch-front-cover.jpg","/img/hades-nintendo-switch-front-cover.png","/img/hades-windows-front-cover.png","/img/hollow-knight-linux-front-cover.jpg","/img/huntdown-xbox-one-front-cover.jpg","/img/hyper-light-drifter-special-edition-nintendo-switch-front-cover.jpg","/img/ikaruga-dreamcast-front-cover.jpg","/img/infernax-nintendo-switch-front-cover.jpg","/img/inscryption-linux-front-cover.jpg","/img/inside-xbox-one-front-cover.png","/img/it-takes-two-playstation-4-front-cover.jpg","/img/jack-jeanne-nintendo-switch-front-cover.jpg","/img/just-shapes-beats-nintendo-switch-front-cover.jpg","/img/katamari-damacy-reroll-windows-front-cover.jpg","/img/katana-zero-windows-front-cover.jpg","/img/kirby-and-the-forgotten-land-nintendo-switch-front-cover.jpg","/img/kirbys-return-to-dream-land-deluxe-nintendo-switch-front-cover.jpg","/img/life-is-strange-true-colors-playstation-4-front-cover.jpg","/img/lil-gator-game-windows-front-cover.jpg","/img/littlewood-linux-front-cover.jpg","/img/live-a-live-nintendo-switch-front-cover.jpg","/img/logo.png","/img/lorelei-and-the-laser-eyes-nintendo-switch-front-cover.jpg","/img/love-3-linux-front-cover.png","/img/luigis-mansion-3-nintendo-switch-front-cover.jpg","/img/mario-kart-8-deluxe-nintendo-switch-front-cover.jpg","/img/mario-rabbids-kingdom-battle-nintendo-switch-front-cover.jpg","/img/mario-rabbids-sparks-of-hope-nintendo-switch-front-cover.jpg","/img/mega-man-11-nintendo-switch-front-cover.jpg","/img/metroid-dread-nintendo-switch-front-cover.jpg","/img/metroid-prime-remastered-nintendo-switch-front-cover.jpg","/img/minecraft-nintendo-switch-edition-nintendo-switch-front-cover.png","/img/monster-boy-and-the-cursed-kingdom-nintendo-switch-front-cover.jpg","/img/monster-hunter-rise-nintendo-switch-front-cover.jpg","/img/neo-the-world-ends-with-you-nintendo-switch-front-cover.jpg","/img/neon-white-nintendo-switch-front-cover.jpg","/img/neva-xbox-series-front-cover.png","/img/nier-automata-game-of-the-yorha-edition-playstation-4-front-cove.jpg","/img/nobody-saves-the-world-windows-front-cover.jpg","/img/octopath-traveler-ii-nintendo-switch-front-cover.jpg","/img/octopath-traveler-nintendo-switch-front-cover.jpg","/img/okami-playstation-2-front-cover.jpg","/img/ori-and-the-blind-forest-definitive-edition-xbox-one-front-cover.png","/img/ori-and-the-will-of-the-wisps-windows-apps-front-cover.jpg","/img/overcooked-2-linux-front-cover.jpg","/img/overcooked-all-you-can-eat-xbox-series-front-cover.jpg","/img/paper-mario-the-thousand-year-door-nintendo-switch-front-cover.jpg","/img/paranormasight-the-seven-mysteries-of-honjo-windows-front-cover.jpg","/img/persona-4-golden-ps-vita-front-cover.png","/img/persona-5-royal-windows-apps-front-cover.jpg","/img/pikmin-3-deluxe-nintendo-switch-front-cover.jpg","/img/pikmin-4-nintendo-switch-front-cover.jpg","/img/pinball-fx3-windows-apps-front-cover.jpg","/img/piofiore-episodio-1926-nintendo-switch-front-cover.jpg","/img/pokemon-legends-arceus-nintendo-switch-front-cover.jpg","/img/prince-of-persia-the-lost-crown-playstation-5-front-cover.jpg","/img/puyo-puyo-tetris-playstation-3-front-cover.jpg","/img/qomp2-xbox-one-front-cover.png","/img/radiant-tale-iphone-front-cover.png","/img/raiden-iv-x-mikado-remix-nintendo-switch-front-cover.jpg","/img/rayman-legends-windows-front-cover.jpg","/img/red-dead-redemption-playstation-4-front-cover.jpg","/img/return-of-the-obra-dinn-windows-front-cover.jpg","/img/return-to-monkey-island-linux-front-cover.jpg","/img/rocket-league-linux-front-cover.jpg","/img/roots-of-pacha-windows-front-cover.jpg","/img/rune-factory-4-special-nintendo-switch-front-cover.jpg","/img/sea-of-stars-nintendo-switch-front-cover.jpg","/img/severed-ps-vita-front-cover.jpg","/img/shin-megami-tensei-iii-nocturne-hd-remaster-playstation-4-front-.jpg","/img/shin-megami-tensei-v-nintendo-switch-front-cover.jpg","/img/shiren-the-wanderer-the-mystery-dungeon-of-serpentcoil-island-ni.jpg","/img/shovel-knight-specter-of-torment-nintendo-switch-front-cover.png","/img/shovel-knight-treasure-trove-nintendo-3ds-front-cover.jpg","/img/signalis-nintendo-switch-front-cover.jpg","/img/slay-the-spire-linux-front-cover.jpg","/img/sonic-mania-nintendo-switch-front-cover.jpg","/img/sonic-mania-plus-nintendo-switch-front-cover.jpg","/img/splatoon-2-nintendo-switch-front-cover.jpg","/img/splatoon-3-nintendo-switch-front-cover.jpg","/img/star-ocean-the-second-story-r-nintendo-switch-front-cover.jpg","/img/stardew-valley-linux-front-cover.jpg","/img/steamworld-dig-2-nintendo-switch-front-cover.jpg","/img/steinsgate-elite-nintendo-switch-front-cover.jpg","/img/streets-of-rage-4-nintendo-switch-front-cover.jpg","/img/super-mario-3d-world-bowsers-fury-nintendo-switch-front-cover.jpg","/img/super-mario-bros-wonder-nintendo-switch-front-cover.jpg","/img/super-mario-maker-2-nintendo-switch-front-cover.png","/img/super-mario-odyssey-nintendo-switch-front-cover.jpg","/img/super-mario-party-jamboree-nintendo-switch-front-cover.jpg","/img/super-mario-rpg-nintendo-switch-front-cover.jpg","/img/super-smash-bros-ultimate-nintendo-switch-front-cover.jpg","/img/switchrota.png","/img/tactics-ogre-reborn-windows-front-cover.jpg","/img/tangle-tower-iphone-front-cover.jpg","/img/teenage-mutant-ninja-turtles-shredders-revenge-windows-apps-fron.jpg","/img/tetris-effect-playstation-4-front-cover.png","/img/thank-goodness-youre-here-windows-front-cover.jpg","/img/the-binding-of-isaac-afterbirth-nintendo-switch-front-cover.jpg","/img/the-cosmic-wheel-sisterhood-windows-front-cover.jpg","/img/the-elder-scrolls-v-skyrim-special-edition-xbox-one-front-cover.jpg","/img/the-house-in-fata-morgana-dreams-of-the-revenants-edition-playst.jpg","/img/the-legend-of-heroes-trails-of-cold-steel-iii-playstation-4-fron.jpg","/img/the-legend-of-heroes-trails-to-azure-psp-front-cover.jpg","/img/the-legend-of-zelda-breath-of-the-wild-nintendo-switch-front-cov.jpg","/img/the-legend-of-zelda-echoes-of-wisdom-nintendo-switch-front-cover.jpg","/img/the-legend-of-zelda-links-awakening-nintendo-switch-front-cover.jpg","/img/the-legend-of-zelda-skyward-sword-wii-front-cover.jpg","/img/the-legend-of-zelda-tears-of-the-kingdom-nintendo-switch-front-c.jpg","/img/the-messenger-nintendo-switch-front-cover.jpg","/img/the-stanley-parable-ultra-deluxe-linux-front-cover.jpg","/img/theatrhythm-final-bar-line-nintendo-switch-front-cover.jpg","/img/thronebreaker-the-witcher-tales-windows-front-cover.jpg","/img/tinykin-windows-front-cover.jpg","/img/to-the-moon-windows-front-cover.jpg","/img/tokyo-mirage-sessions-fe-encore-nintendo-switch-front-cover.jpg","/img/tony-hawks-pro-skater-1-2-playstation-4-front-cover.png","/img/triangle-strategy-nintendo-switch-front-cover.jpg","/img/tsukihime-a-piece-of-blue-glass-moon-playstation-4-front-cover.jpg","/img/unavowed-windows-front-cover.jpg","/img/undernauts-labyrinth-of-yomi-nintendo-switch-front-cover.jpg","/img/undertale-linux-front-cover.jpg","/img/unicorn-overlord-nintendo-switch-front-cover.jpg","/img/unpacking-linux-front-cover.jpg","/img/vampire-survivors-windows-front-cover.jpg","/img/wargroove-windows-front-cover.jpg","/img/wayward-strand-windows-front-cover.jpg","/img/west-of-loathing-linux-front-cover.jpg","/img/xenoblade-chronicles-2-nintendo-switch-front-cover.jpg","/img/xenoblade-chronicles-3-nintendo-switch-front-cover.jpg","/img/xenoblade-chronicles-definitive-edition-nintendo-switch-front-co.jpg","/img/xenoblade-chronicles-x-definitive-edition-nintendo-switch-front-.jpg","/img/yokus-island-express-nintendo-switch-front-cover.jpg","/img/zelda_totk.jpg"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"J0qxcCP55SdwJYhsPQaSsqwcpo2r0N7h8H4CGw+iz6A=","sessionConfig":{"driver":"fs-lite","options":{"base":"/home/sergio/Documentos/Master/SSBW/astro-app/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
