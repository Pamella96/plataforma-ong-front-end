import { iniciarRoteador } from './modules/roteador.js';
import { iniciarModais } from './modules/feedback.js';
import { iniciarFormulario } from './modules/formulario.js';
import { iniciarContraste } from './modules/contraste.js';

iniciarContraste();
iniciarModais(document.getElementById('conteudo'));
iniciarRoteador(iniciarFormulario);
