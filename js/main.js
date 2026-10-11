import { iniciarRoteador } from './modules/roteador.js';
import { iniciarModais } from './modules/feedback.js';
import { iniciarFormulario } from './modules/formulario.js';

iniciarModais(document.getElementById('conteudo'));
iniciarRoteador(iniciarFormulario);
