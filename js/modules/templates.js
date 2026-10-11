// Templates da interface: marcação fixa, sem conteúdo fornecido pelo usuário.

export function inicio() {
    return `
        <section class="hero secao" aria-labelledby="titulo-inicio">
            <div class="container grid">
                <div class="hero__conteudo col-8">
                    <span class="etiqueta">Ações para a comunidade</span>
                    <h1 class="hero__titulo" id="titulo-inicio">Sobre a ONG</h1>
                    <p>Nossa ONG trabalha para promover ações sociais e melhorar a qualidade de vida da comunidade.</p>
                    <p>Conheça as frentes de atuação e veja como contribuir com doações ou trabalho voluntário.</p>
                    <div class="acoes">
                        <a class="botao" href="#/projetos">Conhecer projetos</a>
                        <a class="botao botao--secundario" href="#/cadastro">Quero participar</a>
                    </div>
                </div>
                <figure class="foto col-4">
                    <img src="../imagens/equipe.avif" alt="Voluntários organizando a distribuição de alimentos"
                         width="1200" height="800">
                    <figcaption>Foto ilustrativa: <a href="https://www.pexels.com/photo/people-donating-food-to-a-charity-6995220/">Julia M Cameron / Pexels</a>.</figcaption>
                </figure>
            </div>
        </section>
        <section class="secao" aria-labelledby="titulo-participacao">
            <div class="container">
                <h2 id="titulo-participacao">Formas de participação</h2>
                <div class="grid">
                    <article class="painel col-4">
                        <h3>Projetos sociais</h3>
                        <p>Consulte as atividades e as formas de participação em cada projeto.</p>
                        <a href="#/projetos">Ver projetos sociais</a>
                    </article>
                    <article class="painel col-4">
                        <h3>Voluntariado</h3>
                        <p>Ofereça seu tempo para ajudar na organização e na realização das ações.</p>
                        <a href="#/voluntariado">Conhecer o voluntariado</a>
                    </article>
                    <article class="painel col-4">
                        <h3>Doações</h3>
                        <p>Saiba como contribuir com recursos ou materiais para as atividades.</p>
                        <a href="#/doacoes">Ver formas de doação</a>
                    </article>
                </div>
            </div>
        </section>
    `;
}

export function projetos() {
    return `
        <section class="secao" aria-labelledby="titulo-projetos">
            <h1 id="titulo-projetos">Projetos sociais</h1>
            <p>Conheça exemplos de atividades da plataforma e suas formas de participação.</p>
            <div class="grid" id="lista-projetos"></div>
        </section>
        <section class="secao" id="voluntariado" aria-labelledby="titulo-voluntariado">
            <h2 id="titulo-voluntariado">Voluntariado</h2>
            <div class="grid">
                <div class="painel col-8">
                    <h3>Como participar</h3>
                    <ol>
                        <li>Conheça as atividades apresentadas nos projetos.</li>
                        <li>Escolha a área em que deseja colaborar.</li>
                        <li>Preencha o formulário de cadastro.</li>
                    </ol>
                    <a class="botao" href="#/cadastro">Abrir cadastro</a>
                </div>
                <aside class="painel col-4" aria-labelledby="titulo-atividades">
                    <h3 id="titulo-atividades">Organização das atividades</h3>
                    <ul>
                        <li>Recebimento de materiais</li>
                        <li>Separação e preparação das doações</li>
                        <li>Apoio à distribuição de alimentos</li>
                    </ul>
                </aside>
            </div>
        </section>
        <section class="secao" id="doacoes" aria-labelledby="titulo-doacoes">
            <h2 id="titulo-doacoes">Doações</h2>
            <div class="painel">
                <p>As contribuições podem ser feitas com alimentos, materiais ou recursos financeiros, conforme as necessidades de cada atividade.</p>
                <div class="alerta alerta--aviso" role="note">
                    <strong>Atenção:</strong> esta é uma demonstração acadêmica. Nenhum pagamento é realizado nesta página.
                </div>
                <button class="botao" type="button" data-modal="modal-doacao">Orientações para contribuir</button>
            </div>
        </section>
    
    <dialog class="modal" id="modal-alimentos" aria-labelledby="titulo-modal-alimentos">
        <div class="modal__cabecalho">
            <h2 id="titulo-modal-alimentos">Distribuição de alimentos</h2>
            <button class="botao botao--secundario" type="button" data-fechar-modal aria-label="Fechar detalhes">×</button>
        </div>
        <p>A atividade envolve preparar e organizar refeições para distribuição. O voluntário pode apoiar a separação dos alimentos e a organização da entrega.</p>
        <a class="botao" href="#/cadastro">Abrir cadastro de voluntário</a>
    </dialog>
    <dialog class="modal" id="modal-materiais" aria-labelledby="titulo-modal-materiais">
        <div class="modal__cabecalho">
            <h2 id="titulo-modal-materiais">Organização de doações</h2>
            <button class="botao botao--secundario" type="button" data-fechar-modal aria-label="Fechar detalhes">×</button>
        </div>
        <p>Os materiais recebidos são separados por tipo e preparados para as atividades. O voluntário pode colaborar na triagem e na montagem dos kits.</p>
        <a class="botao" href="#/cadastro">Abrir cadastro de voluntário</a>
    </dialog>
    <dialog class="modal" id="modal-doacao" aria-labelledby="titulo-modal-doacao">
        <div class="modal__cabecalho">
            <h2 id="titulo-modal-doacao">Orientações para contribuir</h2>
            <button class="botao botao--secundario" type="button" data-fechar-modal aria-label="Fechar orientações">×</button>
        </div>
        <p>Em uma plataforma real, a ONG informaria aqui os materiais necessários, os pontos de entrega e os meios oficiais de doação.</p>
        <div class="alerta" role="note">Demonstração: não há cobrança ou transferência de recursos.</div>
        <button class="botao" type="button" data-confirmar-orientacao>Entendi as orientações</button>
    </dialog>
`;
}

export function cadastro() {
    return `
        <section class="secao" aria-labelledby="titulo-cadastro">
            <h1 id="titulo-cadastro">Cadastro de voluntário</h1>
            <p>Preencha os campos para demonstrar seu interesse em participar das atividades.</p>
            <div class="alerta" role="note">Formulário de demonstração: os dados são validados na página, sem envio a servidor. Use dados fictícios. O cadastro ficará neste navegador, sem a senha.</div>
            <form class="formulario" id="form-cadastro" novalidate>
                <fieldset>
                    <legend>Dados pessoais</legend>
                    <div class="formulario__campos">
                    <div class="campo">
                        <label for="nome">Nome completo (obrigatório)</label>
                        <input type="text" id="nome" name="nome" required aria-describedby="nome-erro" minlength="3" maxlength="100" autocomplete="name">
                        <span class="campo__erro" id="nome-erro" hidden></span>
                    </div>
                    <div class="campo">
                        <label for="email">E-mail (obrigatório)</label>
                        <input type="email" id="email" name="email" required aria-describedby="email-erro" maxlength="120" autocomplete="email">
                        <span class="campo__erro" id="email-erro" hidden></span>
                    </div>
                    <div class="campo">
                        <label for="nascimento">Data de nascimento (obrigatório)</label>
                        <input type="date" id="nascimento" name="nascimento" required aria-describedby="nascimento-erro" autocomplete="bday">
                        <span class="campo__erro" id="nascimento-erro" hidden></span>
                    </div>
                    <div class="campo">
                        <label for="telefone">Telefone (obrigatório)</label>
                        <input type="tel" id="telefone" name="telefone" required aria-describedby="telefone-ajuda telefone-erro" inputmode="tel" maxlength="15" pattern="\\([0-9]{2}\\) [0-9]{4,5}-[0-9]{4}" autocomplete="tel">
                        <span class="campo__ajuda" id="telefone-ajuda">Informe o DDD e o número. Exemplo: (21) 99999-9999.</span>
                        <span class="campo__erro" id="telefone-erro" hidden></span>
                    </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Endereço</legend>
                    <div class="formulario__campos">
                    <div class="campo">
                        <label for="endereco">Endereço (obrigatório)</label>
                        <input type="text" id="endereco" name="endereco" required aria-describedby="endereco-erro" minlength="5" maxlength="150" autocomplete="address-line1">
                        <span class="campo__erro" id="endereco-erro" hidden></span>
                    </div>
                    <div class="campo">
                        <label for="cidade">Cidade (obrigatório)</label>
                        <input type="text" id="cidade" name="cidade" required aria-describedby="cidade-erro" minlength="2" maxlength="80" autocomplete="address-level2">
                        <span class="campo__erro" id="cidade-erro" hidden></span>
                    </div>
                        <div class="campo">
                            <label for="estado">Estado (obrigatório)</label>
                            <select id="estado" name="estado" required autocomplete="address-level1" aria-describedby="estado-erro">
                                <option value="">Selecione</option>
                                <option value="AC">AC</option>
                                <option value="AL">AL</option>
                                <option value="AP">AP</option>
                                <option value="AM">AM</option>
                                <option value="BA">BA</option>
                                <option value="CE">CE</option>
                                <option value="DF">DF</option>
                                <option value="ES">ES</option>
                                <option value="GO">GO</option>
                                <option value="MA">MA</option>
                                <option value="MT">MT</option>
                                <option value="MS">MS</option>
                                <option value="MG">MG</option>
                                <option value="PA">PA</option>
                                <option value="PB">PB</option>
                                <option value="PR">PR</option>
                                <option value="PE">PE</option>
                                <option value="PI">PI</option>
                                <option value="RJ">RJ</option>
                                <option value="RN">RN</option>
                                <option value="RS">RS</option>
                                <option value="RO">RO</option>
                                <option value="RR">RR</option>
                                <option value="SC">SC</option>
                                <option value="SP">SP</option>
                                <option value="SE">SE</option>
                                <option value="TO">TO</option>
                            </select>
                            <span class="campo__erro" id="estado-erro" hidden></span>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Acesso e participação</legend>
                    <div class="formulario__campos">
                    <div class="campo">
                        <label for="senha">Senha (obrigatório)</label>
                        <input type="password" id="senha" name="senha" required aria-describedby="senha-ajuda senha-erro" minlength="8" maxlength="64" autocomplete="new-password">
                        <span class="campo__ajuda" id="senha-ajuda">Use pelo menos 8 caracteres. Neste protótipo, a senha não é salva.</span>
                        <span class="campo__erro" id="senha-erro" hidden></span>
                    </div>
                        <div class="campo">
                            <label for="interesse">Área de interesse (obrigatório)</label>
                            <select id="interesse" name="interesse" required aria-describedby="interesse-erro">
                                <option value="">Selecione</option>
                                <option value="alimentos">Distribuição de alimentos</option>
                                <option value="doacoes">Organização de doações</option>
                            </select>
                            <span class="campo__erro" id="interesse-erro" hidden></span>
                        </div>
                    </div>
                </fieldset>
                <div class="alerta" id="resultado-cadastro" role="status" aria-live="polite" hidden></div>
                <div class="acoes">
                    <button class="botao" type="submit">Salvar cadastro</button>
                    <button class="botao botao--secundario" type="reset">Limpar campos</button>
                    <button class="botao botao--secundario" type="button" data-excluir-cadastro>Excluir cadastro salvo</button>
                </div>

            </form>
        </section>
    `;
}
