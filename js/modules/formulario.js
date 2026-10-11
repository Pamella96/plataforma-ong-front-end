import { mostrarToast, limparToast } from './feedback.js';
import { salvarCadastro, recuperarCadastro, restaurarCampos, excluirCadastro } from './armazenamento.js';

export function iniciarFormulario() {
    const formulario = document.getElementById('form-cadastro');
    if (!formulario) {
        return;
    }
    const campos = [...formulario.querySelectorAll('input, select')];
    const resultado = document.getElementById('resultado-cadastro');
    const telefone = document.getElementById('telefone');
    const nascimento = document.getElementById('nascimento');
    const hoje = new Date();
    const dataLocal = [
        hoje.getFullYear(),
        String(hoje.getMonth() + 1).padStart(2, '0'),
        String(hoje.getDate()).padStart(2, '0')
    ].join('-');
    nascimento.max = dataLocal;

    telefone.addEventListener('input', () => {
        const numeros = telefone.value.replace(/\D/g, '').slice(0, 11);
        if (numeros.length < 3) {
            telefone.value = numeros;
            return;
        }
        const ddd = numeros.slice(0, 2);
        const numero = numeros.slice(2);
        const divisao = numero.length > 8 ? 5 : 4;
        const parteFinal = numero.slice(divisao);
        telefone.value = `(${ddd}) ${numero.slice(0, divisao)}${parteFinal ? '-' + parteFinal : ''}`;
    });

    function mensagemErro(campo) {
        if (campo.validity.valueMissing) {
            return 'Preencha este campo.';
        }
        if (campo.validity.typeMismatch) {
            return 'Informe um e-mail válido, como nome@exemplo.com.';
        }
        if (campo.validity.patternMismatch) {
            return 'Informe um telefone com DDD e 10 ou 11 dígitos.';
        }
        if (campo.validity.tooShort) {
            return `Use pelo menos ${campo.minLength} caracteres.`;
        }
        if (campo.validity.rangeOverflow) {
            return 'A data de nascimento não pode ser futura.';
        }
        return campo.validationMessage || 'Confira o valor informado.';
    }

    function validarCampo(campo) {
        const erro = document.getElementById(`${campo.id}-erro`);
        campo.setCustomValidity('');
        if (campo.type === 'text' && campo.value.trim().length < campo.minLength) {
            campo.setCustomValidity(`Informe pelo menos ${campo.minLength} caracteres, sem contar espaços nas extremidades.`);
        }
        if (campo.id === 'senha' && campo.value.length > 0 && campo.value.length < 8) {
            campo.setCustomValidity('Use pelo menos 8 caracteres.');
        }
        const valido = campo.checkValidity();
        campo.setAttribute('aria-invalid', String(!valido));
        campo.dataset.valido = String(valido);
        erro.textContent = valido ? '' : mensagemErro(campo);
        erro.hidden = valido;
        return valido;
    }

    campos.forEach((campo) => {
        campo.addEventListener('blur', () => validarCampo(campo));
        campo.addEventListener('input', () => {
            resultado.hidden = true;
            if (campo.hasAttribute('aria-invalid')) {
                validarCampo(campo);
            }
        });
    });

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const validade = campos.map(validarCampo);
        const primeiroErro = validade.indexOf(false);
        resultado.hidden = false;
        if (primeiroErro !== -1) {
            resultado.className = 'alerta alerta--erro';
            resultado.textContent = 'Confira os campos indicados antes de continuar.';
            campos[primeiroErro].focus();
            return;
        }
        try {
            salvarCadastro(formulario);
            resultado.className = 'alerta alerta--sucesso';
            resultado.textContent = 'Cadastro salvo neste navegador. A senha não foi armazenada.';
            const senha = formulario.elements.namedItem('senha');
            senha.value = '';
            senha.removeAttribute('aria-invalid');
            delete senha.dataset.valido;
            mostrarToast('Cadastro salvo com sucesso.');
        } catch {
            resultado.className = 'alerta alerta--erro';
            resultado.textContent = 'Os dados são válidos, mas não foi possível salvar neste navegador. Verifique se o armazenamento local está permitido.';
        }
    });

    formulario.addEventListener('reset', () => {
        campos.forEach((campo) => {
            campo.setCustomValidity('');
            campo.removeAttribute('aria-invalid');
            delete campo.dataset.valido;
            const erro = document.getElementById(`${campo.id}-erro`);
            erro.textContent = '';
            erro.hidden = true;
        });
        resultado.hidden = true;
        limparToast();
    });


    formulario.querySelector('[data-excluir-cadastro]').addEventListener('click', () => {
        try {
            excluirCadastro();
            formulario.reset();
            resultado.className = 'alerta alerta--sucesso';
            resultado.textContent = 'Cadastro salvo excluído deste navegador.';
            resultado.hidden = false;
        } catch {
            resultado.className = 'alerta alerta--erro';
            resultado.textContent = 'Não foi possível excluir o cadastro. Verifique as permissões de armazenamento.';
            resultado.hidden = false;
        }
    });

    try {
        const dados = recuperarCadastro();
        if (dados) {
            restaurarCampos(formulario, dados);
            resultado.className = 'alerta';
            resultado.textContent = 'Cadastro recuperado deste navegador. A senha deve ser preenchida novamente para salvar alterações.';
            resultado.hidden = false;
        }
    } catch {
        resultado.className = 'alerta alerta--aviso';
        resultado.textContent = 'Não foi possível recuperar o cadastro salvo. Você pode preencher um novo cadastro ou excluir os dados anteriores.';
        resultado.hidden = false;
    }
}
