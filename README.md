# Dolado Frontend Challenge

## O Desafio

Fala! Que bom que chegou aqui :) Esse desafio foi uma imersão massa no universo Dolado. A ideia era transformar um formulário frio em uma conversa de verdade, tipo bate-papo com um consultor que manja do assunto. A missão era: criar um chatbot que fizesse sentido, alguém como diretor comercial que nunca vendeu online, entender que marketplace é sim uma boa opção

Antes de explicar o projeto, por quê não acessar à página publicada? Só clicar aqui: https://dolado-matsumoto.netlify.app/

## Imagem demo do projeto
Um breve spoiler do que verá ao acessar o projeto deployado!

![image](https://github.com/user-attachments/assets/58c9c10a-977d-4131-af00-73b7f9248b0a)

---

## Construindo o Bot

### Como eu penso o código

Desde o início, quis que o código fosse legível e gostoso de manter. Tipo aquele código que você abre e pensa "hmm, bom trampo aqui". Me guiei por boas práticas como:

- **Modularidade**
- **Legibilidade**
- **Manutenibilidade**
- **Testabilidade**

### Escolhas tecnicas

- **React + Hooks**
- **TypeScript**
- **Tailwind CSS**
- **useChat** pra centralizar o estado da conversa

Obs.: caridosos avaliadores, aqui eu vacilei, confesso... :( Só no final da entrega que fui perceber que o Next.js é um requisito. Mas, posso converter esse projeto em Next.js 15 através de App Router ou até mesmo Page Router, não seria demorado.

---

Separando bem cada parte:

- `src/data/conversation.ts` - o roteiro da conversa
- `src/ui/hooks/use-chat.ts` - o motor da conversa
- `src/ui/components/chat/` - os blocos da interface
- `src/types/chat.ts` - os tipos pra todo mundo falar a mesma língua

### Ajustando o fluxo da conversa

Dei uma boa lapidada no fluxo. Algumas ideias:

- Dividi em estágios bem definidos
- Criei funções separadas pra perguntas e pra processar respostas
- Adicionei validações mais humanas (sem aquele "não entendi" genérico)
- Deixei o bot mais flexível pra entender variações nos textos do usuário (o `productMap` ficou mais esperto!)

---

## Estrutura do projeto

```
job-frontend-developer/
├── public/
├── src/
│   └── ui/
│       ├── components/
│       │   └── chat/
│       └── hooks/
│   ├── data/conversation.ts
│   ├── helpers/classnames.ts
│   ├── pages/index.tsx
│   ├── routes/app.tsx
│   ├── tests/
│   │   ├── components/
│   │   └── hooks/
│   ├── types/chat.ts
│   ├── App.tsx
│   ├── global.css
│   └── ...
├── package.json
├── tailwind.config.ts
└── vite.config.ts
```
> Caso fique curioso, montei a file-tree através da extensão do VSCode: `File Tree Extractor`

## Rodando o projeto

### Requisitos instalados:

- Node.js (versão LTS é uma boa)
- npm

### Passos:

```bash
git clone https://github.com/hitmain13/job-frontend-developer.git
cd job-frontend-developer
npm install
npm run dev
```

A página deve abrir em `http://localhost:5173/`

## Testes

### Ferramentas:

- **Vitest**
- **@testing-library/react**

### O que testamos:

- `use-chat.ts` cobre toda a lógica do bot
- Componentes testados de forma realista (como usuário mesmo)

### Rodar os testes:

```bash
npm run test
```

No momento, temos **55 testes** passando em **12 arquivos** ;)

![image](https://github.com/user-attachments/assets/c5e0d62e-d0ba-4a8f-adc7-f00ff43a2674)


---

## O que eu implementaria caso continuasse no projeto?

- Integrar IA de verdade (OpenAI, Hugging Face...)
- Salvar histórico das conversas
- Feedback visual mais claro pra entradas inválidas
- Acessibilidade total
- Mais performance pra escalar

---

Foi muito massa construir esse projeto. Espero que curtir ler tanto quanto curti fazer!

