# 📱 Pokédex Application

Uma aplicação web interativa e responsiva que replica o funcionamento de uma Pokédex, permitindo a busca detalhada de Pokémon por nome ou número de identificação ID. O projeto consome dados em tempo real da API pública PokéAPI, apresentando animações clássicas e estados dinâmicos de carregamento.

Construído como parte do meu portfólio pessoal para demonstrar práticas modernas de desenvolvimento front-end, componentização eficiente e estilização utilitária.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando o ecossistema moderno do ecossistema JavaScript/TypeScript:

- **[React](https://react.dev/):** Biblioteca para construção da interface baseada em componentes e gerenciamento de estados (`useState`, `useEffect`).
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática para garantir maior previsibilidade, segurança e autocompletação durante o desenvolvimento.
- **[Vite](https://vite.dev/):** Ferramenta de build extremamente rápida para o ecossistema front-end.
- **[Tailwind CSS](https://tailwindcss.com/):** Framework CSS utilitário para estilização rápida, responsiva e focada na performance visual.
- **[PokéAPI](https://pokeapi.co/):** API RESTful utilizada para consumir dados atualizados do universo Pokémon.

---

## ⚙️ Funcionalidades Principais

- **Busca Flexível:** Pesquisa direta de qualquer Pokémon através do nome ou pelo número da Pokédex.
- **Navegação Sequencial:** Botões de paginação (`Prev` e `Next`) para avançar ou retroceder na numeração dos registros de forma fluida.
- **Visualização Dinâmica:** Exibição de sprites animados (estilo clássico da Geração V: Black & White) integrados à interface de forma posicional.
- **Tratamento de Estados:**
  - Exibição visual de feedback durante o carregamento dos dados (`Loading...`).
  - Tratamento de exceções e erros amigáveis quando um termo pesquisado não é encontrado (`Not found :(`).
- **Design Responsivo:** Interface otimizada via Tailwind utilizando valores dinâmicos (`clamp`) para se ajustar corretamente a diferentes tamanhos de tela.

---

## 📂 Estrutura do Projeto

A organização dos arquivos segue as boas práticas de separação de conceitos:

```text
pokedex/
├── public/                 # Arquivos estáticos globais
└── src/
    ├── assets/             # Imagens, logotipos e vetores locais (ex: logoPokedex.svg)
    ├── services/           # Camada de comunicação com APIs externas (fetch/axios)
    │   └── pokeApi.ts      # Função de requisição e tratamento de busca na PokéAPI
    ├── App.tsx             # Componente principal, controle de estados e layout
    ├── index.css           # Configurações globais de estilos e Tailwind
    └── main.tsx            # Ponto de entrada do React e renderização na árvore DOM