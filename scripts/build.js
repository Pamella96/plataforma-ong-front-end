import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { build } from 'esbuild';
import { minify } from 'html-minifier-terser';
import sharp from 'sharp';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destino = path.join(raiz, 'dist');
const opcoesHTML = { collapseWhitespace: true, removeComments: true };
const fontesLocais = {
    name: 'fontes-locais',
    setup(compilador) {
        compilador.onResolve({ filter: /.*/ }, ({ path: arquivo, importer }) => ({
            path: path.resolve(importer ? path.dirname(importer) : raiz, arquivo),
            namespace: 'fonte'
        }));
        compilador.onLoad({ filter: /.*/, namespace: 'fonte' }, async ({ path: arquivo }) => {
            let texto = await readFile(arquivo, 'utf8');
            if (/(?:templates|projetos)\.js$/.test(arquivo)) {
                const trechos = [...texto.matchAll(/(return\s+|template\.innerHTML\s*=\s*)`([^`]+)`/g)];
                for (const trecho of trechos) {
                    texto = texto.replace(trecho[0], `${trecho[1]}\`${await minify(trecho[2], opcoesHTML)}\``);
                }
                texto = texto.replaceAll('../imagens/', 'imagens/');
            }
            return { contents: texto, loader: arquivo.endsWith('.css') ? 'css' : 'js' };
        });
    }
};

for (const pasta of ['css', 'js', 'imagens']) {
    await mkdir(path.join(destino, pasta), { recursive: true });
}

// Os fontes continuam intactos. Somente a cópia de produção é transformada.
await build({
    entryPoints: [path.join(raiz, 'css/estilos.css')],
    outfile: path.join(destino, 'css/estilos.min.css'),
    bundle: true,
    minify: true,
    plugins: [fontesLocais]
});

await build({
    entryPoints: [path.join(raiz, 'js/main.js')],
    outfile: path.join(destino, 'js/main.min.js'),
    bundle: true,
    minify: true,
    format: 'esm',
    target: 'es2020',
    plugins: [fontesLocais]
});

async function versao(arquivo) {
    return createHash('sha256').update(await readFile(path.join(destino, arquivo)))
        .digest('hex').slice(0, 12);
}

const entrada = (await readFile(path.join(raiz, 'html/index.html'), 'utf8'))
    .replace('../css/estilos.css', `css/estilos.min.css?v=${await versao('css/estilos.min.css')}`)
    .replace('../js/main.js', `js/main.min.js?v=${await versao('js/main.min.js')}`);
await writeFile(path.join(destino, 'index.html'), await minify(entrada, opcoesHTML));

const imagens = [];
for (const nome of await readdir(path.join(raiz, 'imagens'))) {
    if (!nome.endsWith('.avif')) continue;
    const original = await readFile(path.join(raiz, 'imagens', nome));
    const comprimida = await sharp(original)
        .resize({ width: 1200, withoutEnlargement: true })
        .avif({ quality: 45, effort: 6 })
        .toBuffer();
    const resultado = comprimida.length < original.length ? comprimida : original;
    await writeFile(path.join(destino, 'imagens', nome), resultado);
    imagens.push({ nome, original: original.length, producao: resultado.length });
}

const arquivos = [];
for (const nome of ['index.html', 'css/estilos.min.css', 'js/main.min.js']) {
    arquivos.push({ nome, bytes: (await stat(path.join(destino, nome))).size });
}
await writeFile(path.join(destino, '.nojekyll'), '');
console.log(JSON.stringify({ arquivos, imagens }, null, 2));
