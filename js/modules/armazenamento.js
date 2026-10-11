const chave = 'ong-comunidade:cadastro:v1';
const nomes = ['nome', 'email', 'nascimento', 'telefone', 'endereco', 'cidade', 'estado', 'interesse'];

export function salvarCadastro(formulario) {
    const dados = {};
    nomes.forEach((nome) => {
        dados[nome] = formulario.elements.namedItem(nome).value.trim();
    });
    // A senha é validada, mas nunca é incluída no armazenamento.
    localStorage.setItem(chave, JSON.stringify(dados));
}

export function recuperarCadastro() {
    const texto = localStorage.getItem(chave);
    if (!texto) {
        return null;
    }
    const dados = JSON.parse(texto);
    if (!dados || nomes.some((nome) => typeof dados[nome] !== 'string')) {
        throw new Error('Cadastro salvo com formato inválido.');
    }
    return dados;
}

export function restaurarCampos(formulario, dados) {
    nomes.forEach((nome) => {
        const campo = formulario.elements.namedItem(nome);
        const valor = dados[nome];
        if (campo.tagName === 'SELECT') {
            if ([...campo.options].some((opcao) => opcao.value === valor)) {
                campo.value = valor;
            }
        } else if (campo.maxLength < 0 || valor.length <= campo.maxLength) {
            campo.value = valor;
        }
    });
}

export function excluirCadastro() {
    localStorage.removeItem(chave);
}
