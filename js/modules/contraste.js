export function iniciarContraste() {
    const botao = document.getElementById('alto-contraste');
    botao.addEventListener('click', () => {
        const ativo = document.body.classList.toggle('alto-contraste');
        botao.setAttribute('aria-pressed', String(ativo));
    });
}
