
// Navegação responsiva com estado anunciado para leitores de tela.
const menuBotao = document.querySelector('.menu-botao');
const menu = document.querySelector('.menu');
const submenuBotao = document.querySelector('.submenu__botao');
const submenuLista = document.querySelector('.submenu__lista');

function fecharSubmenu() {
    submenuLista.hidden = true;
    submenuBotao.setAttribute('aria-expanded', 'false');
}

export function fecharMenu() {
    menu.classList.remove('menu--aberto');
    menuBotao.setAttribute('aria-expanded', 'false');
    fecharSubmenu();
}

menuBotao.addEventListener('click', () => {
    const aberto = menuBotao.getAttribute('aria-expanded') === 'true';
    menu.classList.toggle('menu--aberto', !aberto);
    menuBotao.setAttribute('aria-expanded', String(!aberto));
    if (aberto) {
        fecharSubmenu();
    }
});

submenuBotao.addEventListener('click', () => {
    const aberto = submenuBotao.getAttribute('aria-expanded') === 'true';
    submenuLista.hidden = aberto;
    submenuBotao.setAttribute('aria-expanded', String(!aberto));
});

document.addEventListener('click', (evento) => {
    if (!evento.target.closest('.submenu')) {
        fecharSubmenu();
    }
});

document.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Escape') {
        return;
    }
    if (!submenuLista.hidden) {
        fecharSubmenu();
        submenuBotao.focus();
    } else if (menu.classList.contains('menu--aberto')) {
        fecharMenu();
        menuBotao.focus();
    }
});

menu.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) {
        fecharMenu();
    }
});

// Evita manter o estado mobile quando a janela passa para desktop.
const telaDesktop = window.matchMedia('(min-width: 1024px)');
telaDesktop.addEventListener('change', fecharMenu);

