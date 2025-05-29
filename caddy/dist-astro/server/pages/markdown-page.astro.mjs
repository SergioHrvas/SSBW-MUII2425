import { e as createComponent, k as renderComponent, r as renderTemplate, u as unescapeHTML } from '../chunks/astro/server_B_PuTSvK.mjs';
import 'kleur/colors';
import { $ as $$Main } from '../chunks/main_BmtuyOfY.mjs';
export { renderers } from '../renderers.mjs';

const html = () => "<div class=\"grid place-items-center h-screen content-center\">\n <div class=\"py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg shadow-md\">\n  Tailwind classes also work in Markdown!\n </div>\n <a href=\"/\" class=\"p-4 underline hover:text-purple-500 transition-colors ease-in-out duration-200\">\n  Go home\n </a>\n</div>";

				const frontmatter = {"title":"Markdown + Tailwind","layout":"../layouts/main.astro"};
				const file = "/home/sergio/Documentos/Master/SSBW/astro-app/src/pages/markdown-page.md";
				const url = "/markdown-page";
				function rawContent() {
					return "   \n                            \n                             \n   \n\n<div class=\"grid place-items-center h-screen content-center\">\n <div class=\"py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg shadow-md\">\n  Tailwind classes also work in Markdown!\n </div>\n <a\n  href=\"/\"\n  class=\"p-4 underline hover:text-purple-500 transition-colors ease-in-out duration-200\"\n >\n  Go home\n </a>\n</div>\n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${renderComponent(result, 'Layout', $$Main, {
								file,
								url,
								content,
								frontmatter: content,
								headings: getHeadings(),
								rawContent,
								compiledContent,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html())}`
							})}`;
				});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
