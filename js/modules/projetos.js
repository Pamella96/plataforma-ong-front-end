const projetos = [
    {
        titulo: 'Distribuição de alimentos',
        categoria: 'Alimentação',
        descricao: 'Organização de refeições para ações de apoio à comunidade.',
        foto: 'alimentos.avif',
        alternativa: 'Voluntários entregando refeições embaladas',
        credito: 'https://www.pexels.com/photo/volunteers-wearing-face-masks-giving-food-6995244/',
        modal: 'modal-alimentos',
        destino: '#/cadastro',
        acao: 'Participar'
    },
    {
        titulo: 'Organização de doações',
        categoria: 'Doações',
        descricao: 'Separação de materiais e alimentos para preparar as entregas.',
        foto: 'doacoes.avif',
        alternativa: 'Duas pessoas separando alimentos para doação',
        credito: 'https://www.pexels.com/photo/volunteers-preparing-donations-6995212/',
        modal: 'modal-materiais',
        destino: '#/doacoes',
        acao: 'Como doar'
    },
    {
        titulo: 'Mobilização comunitária',
        categoria: 'Atividade encerrada',
        descricao: 'Exemplo de atividade encerrada, mantida na plataforma para consulta.',
        foto: 'equipe.avif',
        alternativa: 'Equipe de voluntários trabalhando em uma ação social',
        credito: 'https://www.pexels.com/photo/people-donating-food-to-a-charity-6995220/',
        encerrado: true
    }
];

function criarCartao(projeto) {
    const template = document.createElement('template');
    template.innerHTML = `
        <article class="cartao col-4">
            <img class="cartao__imagem" width="400" height="267" loading="lazy" alt="">
            <div class="cartao__conteudo">
                <span class="etiqueta"></span>
                <h2></h2>
                <p class="cartao__descricao"></p>
                <p class="campo__ajuda">Foto: <a class="cartao__credito">Julia M Cameron / Pexels</a>.</p>
                <div class="cartao__acoes">
                    <button class="botao" type="button"></button>
                    <a class="botao botao--secundario"></a>
                </div>
            </div>
        </article>`;
    const cartao = template.content.firstElementChild;
    const imagem = cartao.querySelector('img');
    imagem.src = `../imagens/${projeto.foto}`;
    imagem.alt = projeto.alternativa;
    cartao.querySelector('h2').textContent = projeto.titulo;
    cartao.querySelector('.etiqueta').textContent = projeto.categoria;
    cartao.querySelector('.cartao__descricao').textContent = projeto.descricao;
    cartao.querySelector('.cartao__credito').href = projeto.credito;
    const botao = cartao.querySelector('button');
    const link = cartao.querySelector('.cartao__acoes a');
    if (projeto.encerrado) {
        botao.textContent = 'Inscrições encerradas';
        botao.disabled = true;
        link.remove();
    } else {
        botao.textContent = 'Ver atividade';
        botao.setAttribute('aria-label', `Ver atividade: ${projeto.titulo}`);
        botao.dataset.modal = projeto.modal;
        link.href = projeto.destino;
        link.textContent = projeto.acao;
    }
    return cartao;
}

export function renderizarProjetos() {
    const lista = document.getElementById('lista-projetos');
    if (lista) {
        lista.replaceChildren(...projetos.map(criarCartao));
    }
}
