# JOVI Modo Aula — Sprint 4 (React + Tailwind CSS)

Projeto da equipe **NextStage** para o **Challenge FIAP x JOVI 2026** — entrega conjunta de **Front-End Design** e **Web Development**.

O **Modo Aula** transforma a câmera do smartphone JOVI em uma ferramenta acadêmica: organiza fotos por matéria, extrai texto com OCR e ajuda na captura de lousas. Esta Sprint é a **evolução do mesmo projeto da Sprint 3**: a landing page e a área do aluno foram reescritas com **React Router** (rotas públicas e privadas), **Tailwind CSS**, **hooks customizados** e **consumo de API**.

- **Repositório:** https://github.com/thiagoxzw/SPRINT4WEBFRONT
- **Deploy na Vercel:** https://jovi-modo-aula-nextstage.vercel.app

---

## Tecnologias utilizadas

| Tecnologia | Uso no projeto |
| --- | --- |
| React 19 | Componentes funcionais, props e hooks |
| React Router DOM 7 | Rotas públicas, privadas e rota dinâmica (`/meu-modo-aula/conteudo/:id`) |
| Tailwind CSS 4 (`@tailwindcss/vite`) | Toda a estilização, tema com as cores da identidade JOVI e responsividade |
| Vite 7 | Servidor de desenvolvimento e build |
| API mockada local / MockAPI | CRUD dos conteúdos acadêmicos (`/contents`) |
| API pública da Wikipédia | Pesquisa de referências de estudo na página de detalhe |
| localStorage | Sessão, histórico, matérias, preferências e base da API mockada |
| Git + GitHub + Vercel | Versionamento e deploy |

## Pré-requisitos

- **Node.js 20.19+ ou 22.12+** (exigência do Vite 7)
- **npm 10+**

## Como instalar as dependências

```bash
git clone https://github.com/thiagoxzw/SPRINT4WEBFRONT.git
cd SPRINT4WEBFRONT
npm install
```

> Se estiver usando o arquivo `.ZIP`, basta extraí-lo, abrir o terminal na pasta do projeto e rodar `npm install`.

## Como executar o projeto

```bash
npm run dev
```

Abra o endereço exibido pelo Vite (normalmente **http://localhost:5173**).

Build de produção e teste local do build:

```bash
npm run build
npm run preview   # http://localhost:4173
```

## Servidores / Back-end

**Não é necessário subir nenhum servidor de back-end.** O projeto consome:

1. **API mockada local (padrão)** — `src/services/mockServer.js` simula uma API REST (`GET`, `POST`, `PUT`, `DELETE` em `/contents`) com atraso de rede e persistência no `localStorage`. Funciona tanto no `npm run dev` quanto na Vercel, sem configuração.
2. **MockAPI (opcional)** — para usar uma API remota real, crie um projeto em [mockapi.io](https://mockapi.io) com o recurso `contents` (campos: `title`, `subject`, `type`, `favorite` (boolean), `deleted` (boolean), `notes`, `owner`, `createdAt`), copie `.env.example` para `.env` e preencha:

   ```bash
   VITE_API_URL=https://SEU_ID.mockapi.io/api/v1
   ```

   Reinicie o `npm run dev`. Na Vercel, cadastre a mesma variável em *Settings → Environment Variables* e faça um novo deploy. O painel mostra qual fonte de dados está ativa ("Fonte de dados").
3. **Wikipédia (API pública de terceiros)** — `https://pt.wikipedia.org/w/api.php` (sem chave). Usada em "Referências de estudo" na página de detalhe de um conteúdo. Requer internet; se a consulta falhar, a tela exibe uma mensagem de erro sem quebrar o restante da aplicação.

## Usuários e senhas para teste

A autenticação é simulada (`src/services/authService.js`). Use:

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Estudante (já tem conteúdos de exemplo) | `aluno@fiap.com.br` | `jovi123` |
| Professor | `professor@fiap.com.br` | `jovi123` |

Para voltar ao estado inicial dos dados, limpe o `localStorage` do site (DevTools → Application → Local Storage).

## Rotas

| Rota | Tipo | Página |
| --- | --- | --- |
| `/` | Pública | Home (landing page) |
| `/sobre` | Pública | Sobre o projeto, a JOVI e a equipe |
| `/funcionalidades` | Pública | Funcionalidades + slideshow |
| `/contato` | Pública | Formulário de contato com validação |
| `/login` | Somente visitantes | Login (usuário logado é redirecionado ao painel) |
| `/meu-modo-aula` | **Privada** | Central de conteúdo (CRUD na API, busca, filtros, lixeira, histórico, matérias) |
| `/meu-modo-aula/conteudo/:id` | **Privada** | Detalhe do conteúdo: edição de anotações + busca na Wikipédia |
| `/perfil` | **Privada** | Dados do usuário, preferências do Modo Aula e logout |
| `*` | Pública | Página 404 |

Ao acessar uma rota privada sem login, o `ProtectedRoute` redireciona para `/login` e, após autenticar, o usuário volta para a página que tentou abrir.

## Requisitos da Sprint e onde foram atendidos

- **Componentização e props:** `src/components` (ex.: `FeatureCard`, `ContentCard`, `StatCard`, `Slideshow`, `Button`, `FormField`, `PageHero`) recebem dados e callbacks por props.
- **Rotas públicas e privadas:** `src/App.jsx`, `src/routes/ProtectedRoute.jsx`, `src/routes/GuestRoute.jsx`.
- **Hooks nativos:** `useState`, `useEffect`, `useMemo`, `useCallback`, `useContext`, `useRef` e hooks do React Router (`useNavigate`, `useLocation`, `useParams`).
- **Hooks customizados (lógica separada da parte visual)** — `src/hooks`:
  - `useAuth` — acessa o contexto de autenticação (login/logout/sessão).
  - `useContents` — carrega os conteúdos da API, CRUD, lixeira, filtros e histórico.
  - `useContent` — carrega e salva um conteúdo pelo `id` da rota.
  - `useContentStats` — indicadores do painel (usa `Math.round()` e `Math.min()`).
  - `useSubjects` — matérias do usuário.
  - `useWikipediaSearch` — consulta à API da Wikipédia com debounce e cancelamento (`AbortController`).
  - `useForm` — valores, validação e envio de formulários.
  - `useSlideshow` — lógica do slideshow (autoplay, pausa, navegação).
  - `useLocalStorage`, `useDebounce`, `useToggle`, `useDocumentTitle` — utilitários.
- **Tailwind CSS:** tema em `src/index.css` (`@theme` com a paleta da JOVI); nenhum arquivo CSS tradicional de componentes.
- **Responsividade:** layouts com breakpoints `sm`/`md`/`lg`/`xl`, menu hambúrguer no mobile, grids que se reorganizam em desktop, tablet e celular.
- **Consumo de API:** API mockada/MockAPI (`src/services/contentService.js` + `httpClient.js`) e Wikipédia (`src/services/wikipediaService.js`).
- **Deploy:** `vercel.json` com rewrite para `index.html`, permitindo recarregar qualquer rota do React Router.

## Estrutura de pastas

```text
├── public/favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/        # Header, Footer, Layout, Logo
│   │   ├── ui/            # Button, Badge, Section, SectionHeader, StatCard, FormField, Alert, Spinner...
│   │   └── *.jsx          # FeatureCard, ContentCard, Slideshow, Stats, HistoryList, StudyReferences...
│   ├── context/           # AuthContext.jsx (Provider) e contexts.js (createContext)
│   ├── data/              # Textos, funcionalidades, equipe e mapeamento de cores
│   ├── hooks/             # Hooks customizados
│   ├── pages/             # Home, About, Features, Contact, Login, Dashboard, ContentDetail, Profile, NotFound
│   ├── routes/            # ProtectedRoute e GuestRoute
│   ├── services/          # httpClient, mockServer, contentService, authService, wikipediaService
│   ├── utils/validators.js
│   ├── App.jsx            # Definição das rotas
│   ├── index.css          # Tailwind + tema
│   └── main.jsx
├── .env.example
├── index.html
├── vercel.json
├── vite.config.js
├── INTEGRANTES.TXT
└── README.md
```

## Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com), entre com o GitHub e clique em **Add New → Project**.
2. Importe o repositório `SPRINT4WEBFRONT`. A Vercel detecta o **Vite** automaticamente (build: `npm run build`, saída: `dist`).
3. (Opcional) Adicione `VITE_API_URL` em *Environment Variables* para usar o MockAPI.
4. Clique em **Deploy** e cole o link gerado no topo deste README.

## Uso de Inteligência Artificial no projeto

A IA (assistente de código Claude) foi utilizada como apoio na Sprint 4 para: migrar o projeto da Sprint 3 do CSS tradicional para Tailwind CSS mantendo a mesma identidade visual; estruturar as rotas públicas e privadas com React Router; extrair a lógica das páginas para hooks customizados (`useContents`, `useForm`, `useSlideshow`, `useWikipediaSearch` etc.); criar a camada de serviços da API mockada e da integração com a Wikipédia; escrever testes automatizados de navegação usados para conferir o funcionamento e a responsividade; e redigir este README. Todo o código gerado foi revisado e testado pela equipe, que definiu o conteúdo, as funcionalidades e as decisões de design do Modo Aula.

## Integrantes

Veja o arquivo `INTEGRANTES.TXT` (nome completo e RM de cada integrante).
