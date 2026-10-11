# ONG Comunidade

Projeto acadêmico de Desenvolvimento Front-End para uma plataforma de ONG.
Reúne apresentação da organização, projetos sociais, orientações de doação e
cadastro de interesse em voluntariado. Os dados e as atividades são ilustrativos.

## Funcionalidades

- SPA com rotas por hash e navegação sem recarregar o documento.
- Cartões gerados a partir de dados, menu responsivo e detalhes em dialog.
- Formulário com validação, mensagens de erro, máscara de telefone e foco no primeiro erro.
- Recuperação do último cadastro válido no localStorage; a senha não é armazenada.
- Atalho para o conteúdo, HTML semântico, labels e estados de acessibilidade.

Não há back-end, autenticação ou pagamentos. Use dados fictícios no formulário.
Limpar campos reinicia a edição; Excluir cadastro salvo remove o registro local.

## Executar o código de desenvolvimento

Os arquivos de desenvolvimento permanecem legíveis e sem minificação.

```sh
python -m http.server 8000
```

Abra `http://localhost:8000/html/index.html`. Os módulos ES precisam de HTTP;
não abra o documento diretamente pelo protocolo file.

## Gerar e executar a versão de produção

Requisitos: Node.js 22 e npm. Não há bibliotecas de execução no navegador.
As três dependências de desenvolvimento são esbuild (CSS/JS),
html-minifier-terser (HTML) e sharp (imagens).

```sh
npm ci
npm run build
python -m http.server 8001 --directory dist
```

Abra `http://localhost:8001`. O build gera HTML, CSS e JavaScript minificados
e fotos AVIF comprimidas. Os templates também são compactados e os caminhos
das imagens são ajustados para a entrada de produção. Os fontes originais
não são sobrescritos. Uma imagem só é substituída quando a nova cópia ocupa
menos bytes. O build imprime os tamanhos resultantes.

## Publicação

[Site publicado](https://pamella96.github.io/plataforma-ong-front-end/)

O workflow `.github/workflows/pages.yml` executa `npm ci` e `npm run build`
em cada envio para main. Apenas `dist` é enviado ao GitHub Pages.
Em Settings > Pages, a origem deve ser GitHub Actions. O workflow também
pode ser iniciado manualmente. As rotas por hash preservam o endereço do
projeto e dispensam configuração de redirecionamento de um servidor.

## Organização

- `html`: entrada e estrutura semântica comum.
- `css`: design system, regras globais, componentes e Grid responsivo.
- `imagens`: fotos públicas com créditos na interface.
- `js/modules`: roteamento, templates, projetos, menu, formulário, armazenamento e feedback.
- `scripts`: build da cópia de produção.
- `.github/workflows`: publicação automática.
- `dist`: resultado gerado, ignorado pelo Git.

## Verificações da entrega

- HTML de entrada, produção e três telas renderizadas: validador W3C sem mensagens.
- Rotas, diálogo com Escape e retorno de foco, menu e formulário conferidos.
- Envio vazio identifica os nove campos; dados fictícios válidos são recuperados
  após recarregar, com senha vazia. Exclusão e limpeza também foram conferidas.
- Leiaute sem rolagem horizontal em 360, 768 e 1440 pixels.
- Fotos de produção: 57.004 bytes no total, contra 119.527 bytes dos originais.

Os testes de teclado e semântica ajudam a verificar acessibilidade, mas não
substituem testes com pessoas usuárias de leitores de tela. Não foi realizado
um teste de fala com NVDA neste ambiente.

## Versionamento e manutenção

O fluxo usa main para versões estáveis, develop para integração e feature/
para alterações específicas. Uma release/ prepara o lançamento. Uma hotfix/
parte da main quando uma correção urgente é necessária.

As mensagens seguem Conventional Commits: feat para funcionalidades, fix
para correções, docs para documentação e build para preparação de produção.
As tags seguem MAJOR.MINOR.PATCH: mudança incompatível, recurso compatível
e correção compatível, respectivamente.

Antes de integrar uma alteração, confira o diff e teste as rotas, o formulário,
os modais e o uso por teclado. Abra um pull request com descrição e validação.
Este projeto é individual; as revisões não representam aprovação de outra pessoa.

## Fotos

Autora: Julia M Cameron. Banco público: Pexels. Fotos ilustrativas.

- [Equipe](https://www.pexels.com/photo/people-donating-food-to-a-charity-6995220/)
- [Alimentos](https://www.pexels.com/photo/volunteers-wearing-face-masks-giving-food-6995244/)
- [Doações](https://www.pexels.com/photo/volunteers-preparing-donations-6995212/)

## Referências técnicas

- [Material WCAG 2.1 do W3C](https://www.w3.org/TR/WCAG21/)
- [Publicação no GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
