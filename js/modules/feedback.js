const toast = document.getElementById('toast');
let tempoToast;

export function mostrarToast(mensagem) {
    clearTimeout(tempoToast);
    toast.textContent = mensagem;
    toast.hidden = false;
    tempoToast = setTimeout(() => {
        toast.hidden = true;
    }, 8000);
}

export function limparToast() {
    clearTimeout(tempoToast);
    toast.hidden = true;
}

export function iniciarModais(conteudo) {
    // Delegação: os botões continuam funcionando após a troca dos templates.
    conteudo.addEventListener('click', (evento) => {
        const abrir = evento.target.closest('[data-modal]');
        const fechar = evento.target.closest('[data-fechar-modal]');
        const confirmar = evento.target.closest('[data-confirmar-orientacao]');
        if (abrir) {
            document.getElementById(abrir.dataset.modal)?.showModal();
        } else if (fechar) {
            fechar.closest('dialog').close();
        } else if (confirmar) {
            confirmar.closest('dialog').close();
            mostrarToast('Orientações lidas. Nenhum pagamento foi realizado.');
        }
    });
}
