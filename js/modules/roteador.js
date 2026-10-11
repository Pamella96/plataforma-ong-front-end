import { inicio, projetos, cadastro } from './templates.js';
import { renderizarProjetos } from './projetos.js';
import { fecharMenu } from './menu.js';
import { limparToast } from './feedback.js';

const rotas = {
    inicio: { template: inicio, titulo: 'Início' },
    projetos: { template: projetos, titulo: 'Projetos sociais' },
    cadastro: { template: cadastro, titulo: 'Cadastro de voluntário' },
    voluntariado: { template: projetos, titulo: 'Voluntariado', secao: 'voluntariado' },
    doacoes: { template: projetos, titulo: 'Doações', secao: 'doacoes' }
};

export function iniciarRoteador(aoRenderizar) {
    const conteudo = document.getElementById('conteudo');

    function renderizar() {
        const caminho = window.location.hash.slice(2) || 'inicio';
        const rota = rotas[caminho] || rotas.inicio;
        conteudo.querySelectorAll('dialog[open]').forEach((modal) => modal.close());
        conteudo.className = rota.template === inicio ? '' : 'container';
        // As strings vêm exclusivamente dos templates internos do projeto.
        conteudo.innerHTML = rota.template();
        document.title = `${rota.titulo} | ONG Comunidade`;
        const atual = rotas[caminho] ? caminho : 'inicio';
        document.querySelectorAll('.menu a').forEach((link) => {
            if (link.getAttribute('href') === `#/${atual}`) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
        renderizarProjetos();
        aoRenderizar();
        fecharMenu();
        limparToast();
        const destino = rota.secao
            ? document.getElementById(rota.secao)
            : conteudo.querySelector('h1');
        destino.setAttribute('tabindex', '-1');
        destino.focus({ preventScroll: true });
        (rota.secao ? destino : conteudo).scrollIntoView();
    }

    document.addEventListener('click', (evento) => {
        if (evento.target.closest('.pular-conteudo')) {
            evento.preventDefault();
            conteudo.focus({ preventScroll: true });
            conteudo.scrollIntoView();
            return;
        }
        const link = evento.target.closest('a[href^="#/"]');
        if (!link || evento.button !== 0 || evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) {
            return;
        }
        evento.preventDefault();
        const destino = link.getAttribute('href');
        if (window.location.hash === destino) {
            renderizar();
        } else {
            window.location.hash = destino;
        }
    });
    window.addEventListener('hashchange', renderizar);
    renderizar();
}
