# Referências do GitHub - Smart Chart Co-Pilot MVP

**Versão:** 1.0
**Data:** Outubro 2025
**Objetivo:** Repositórios públicos de alta qualidade para acelerar o desenvolvimento

---

## 📋 Índice

1. [Google Apps Script & Add-ons](#1-google-apps-script--add-ons)
2. [Gemini/Generative AI Integration](#2-gemini-generative-ai-integration)
3. [Chart Generation Libraries](#3-chart-generation-libraries)
4. [Google Cloud Functions](#4-google-cloud-functions)
5. [Prompts & Best Practices](#5-prompts--best-practices)

---

## 1. Google Apps Script & Add-ons

### 🌟 React-Google-Apps-Script
- **Repositório**: [enuchi/React-Google-Apps-Script](https://github.com/enuchi/React-Google-Apps-Script)
- **⭐ Stars**: 1.4k
- **Forks**: 197
- **Descrição**: Boilerplate para desenvolver apps React dentro de Google Sheets, Docs, Forms e Slides
- **Por que usar**:
  - ✅ Perfeito para add-ons complexos no Google Workspace Marketplace
  - ✅ Webpack + React configurados para Apps Script
  - ✅ Sample code de comunicação React ↔ Apps Script server-side
  - ✅ Suporte a dialogs e sidebars
- **Tecnologias**: React, Webpack, Clasp, Google Apps Script
- **Uso no projeto**: Base para o sidebar do add-on (se decidir usar React)

---

### 🌟 TypeScript-React-Google-Apps-Script
- **Repositório**: [52inc/TypeScript-React-Google-Apps-Script](https://github.com/52inc/TypeScript-React-Google-Apps-Script)
- **⭐ Stars**: ~200
- **Descrição**: Fork do projeto anterior com suporte a TypeScript
- **Por que usar**:
  - ✅ Type safety para projetos maiores
  - ✅ Webpack + Clasp + Tern autocompletion
  - ✅ Setup pronto para desenvolvimento
- **Tecnologias**: TypeScript, React, Google Apps Script
- **Uso no projeto**: Alternativa com TypeScript caso o projeto escale

---

### 📚 apps-script-samples (Google Official)
- **Repositório**: [googleworkspace/apps-script-samples](https://github.com/googleworkspace/apps-script-samples)
- **⭐ Stars**: 1.8k+
- **Descrição**: Exemplos oficiais do Google para Apps Script (Sheets, Docs, Slides, Gmail)
- **Por que usar**:
  - ✅ Código oficial e bem documentado
  - ✅ Exemplo de Slides translate add-on com sidebar
  - ✅ Best practices do Google
  - ✅ Snippets prontos da Slides API
- **Tecnologias**: Google Apps Script, HTML Service
- **Uso no projeto**:
  - Referência para sidebar UI: `slides/translate/sidebar.html`
  - Snippets da Slides API: `slides/api/Snippets.gs`

---

### 📚 Google Workspace Add-on Boilerplate
- **Repositório**: [nathgilson/Google-Workspace-Addon-Boilerplate](https://github.com/nathgilson/Google-Workspace-Addon-Boilerplate)
- **⭐ Stars**: ~100
- **Descrição**: Boilerplate com Node.js, ES6, TypeScript e Firebase
- **Por que usar**:
  - ✅ Stack moderna (ES6, TypeScript)
  - ✅ Firebase backend integration
  - ✅ Side panel para Gmail, Drive, Sheets, Docs, Slides
- **Tecnologias**: Node.js, TypeScript, Firebase, Apps Script
- **Uso no projeto**: Estrutura de projeto e organização de código

---

### 📚 add-ons-samples (Google Official)
- **Repositório**: [googleworkspace/add-ons-samples](https://github.com/googleworkspace/add-ons-samples)
- **⭐ Stars**: 800+
- **Descrição**: Exemplos oficiais de Google Workspace Add-ons
- **Por que usar**:
  - ✅ Diversos exemplos de add-ons funcionais
  - ✅ OAuth e autenticação
  - ✅ Integração com APIs externas
- **Tecnologias**: Google Apps Script, HTML Service
- **Uso no projeto**: Referência para estrutura de add-on completo

---

## 2. Gemini / Generative AI Integration

### 🌟 GoogleCloudPlatform/generative-ai
- **Repositório**: [GoogleCloudPlatform/generative-ai](https://github.com/GoogleCloudPlatform/generative-ai)
- **⭐ Stars**: 11.7k
- **Descrição**: Sample code e notebooks para Generative AI no Google Cloud com Gemini
- **Por que usar**:
  - ✅ **Repositório OFICIAL do Google Cloud**
  - ✅ Notebooks prontos de Gemini
  - ✅ Use cases reais (RAG, agents, prompts)
  - ✅ Exemplos de function calling
  - ✅ Sample apps completos
- **Tecnologias**: Python, Node.js, Vertex AI, Gemini
- **Uso no projeto**:
  - Prompt engineering: `gemini/prompts/`
  - Function calling para structured outputs: `gemini/function-calling/`
  - Sample apps: `gemini/sample-apps/`
- **🔥 Destaque**: Contém `gemini/rag-engine` e `gemini/agents` para casos avançados

---

### 🌟 googleapis/js-genai
- **Repositório**: [googleapis/js-genai](https://github.com/googleapis/js-genai)
- **⭐ Stars**: ~500 (novo, SDK oficial)
- **Descrição**: TypeScript/JavaScript SDK oficial para Gemini e Vertex AI
- **Por que usar**:
  - ✅ **SDK OFICIAL para Node.js**
  - ✅ Suporte a Gemini 2.0 Flash
  - ✅ JSON mode nativo (`responseMimeType: "application/json"`)
  - ✅ Context caching (reduz custo em 75%)
  - ✅ TypeScript first
- **Tecnologias**: TypeScript, Node.js, Gemini API
- **Uso no projeto**:
  - Cliente principal para Cloud Functions
  - Instalar via: `npm install @google/genai`
  - Exemplos em: `samples/` directory
- **🔥 Destaque**: Substitui o antigo `@google/generative-ai` (deprecated)

---

### 🌟 google-gemini/example-chat-app
- **Repositório**: [google-gemini/example-chat-app](https://github.com/google-gemini/example-chat-app)
- **⭐ Stars**: ~300
- **Descrição**: App de chat completo com Gemini API (Node.js, Python, Go)
- **Por que usar**:
  - ✅ Exemplo end-to-end funcional
  - ✅ Server em Node.js com Express
  - ✅ Streaming de respostas
  - ✅ Error handling robusto
- **Tecnologias**: Node.js, Express, Gemini API
- **Uso no projeto**:
  - Referência para Cloud Functions estruture
  - Error handling e retry logic
  - API endpoint patterns

---

### 📚 rootstrap/gemini-nodejs
- **Repositório**: [rootstrap/gemini-nodejs](https://github.com/rootstrap/gemini-nodejs)
- **⭐ Stars**: ~50
- **Descrição**: Node.js REST API para interagir com Google Gemini
- **Por que usar**:
  - ✅ Express + TypeScript
  - ✅ REST API bem estruturada
  - ✅ Exemplo de text-only e text-and-image
- **Tecnologias**: Node.js, Express, TypeScript, Gemini
- **Uso no projeto**: Padrão de REST API para Cloud Functions

---

## 3. Chart Generation Libraries

### 🌟 Chart.js (Core Library)
- **Repositório**: [chartjs/Chart.js](https://github.com/chartjs/Chart.js)
- **⭐ Stars**: 65k+
- **NPM Downloads**: ~2 milhões/semana
- **Descrição**: Biblioteca JavaScript de charts mais popular
- **Por que usar**:
  - ✅ **Mais popular e madura**
  - ✅ Documentação excelente
  - ✅ Performance otimizada
  - ✅ Suporte nativo a Column, Bar, Line charts
  - ✅ Ecossistema de plugins
- **Tecnologias**: JavaScript (Canvas-based)
- **Uso no projeto**:
  - Gerar Column, Bar, Line charts
  - Preview de thumbnails no sidebar
- **🔥 Destaque**: v4.x tem typed charts (TypeScript)

---

### 📚 chartjs-plugin-waterfall
- **Repositório**: [everestate/chartjs-plugin-waterfall](https://github.com/everestate/chartjs-plugin-waterfall)
- **⭐ Stars**: ~100
- **Descrição**: Plugin Chart.js para waterfall charts
- **Por que usar**:
  - ✅ **Único plugin estável de Waterfall**
  - ✅ Recomendado na doc oficial do Chart.js
  - ✅ Funciona com Chart.js v2+
  - ✅ API simples: adicionar `dummyStack: true`
- **Tecnologias**: JavaScript, Chart.js plugin
- **Uso no projeto**: Implementar Waterfall chart (feature crítica do PRD)
- **⚠️ Nota**: Chart.js v2.9+ suporta floating bars (alternativa sem plugin)

---

### 📚 D3.js (Biblioteca Avançada)
- **Repositório**: [d3/d3](https://github.com/d3/d3)
- **⭐ Stars**: 108k+
- **Descrição**: Biblioteca low-level para data visualization com SVG/Canvas
- **Por que usar**:
  - ✅ Flexibilidade total (Mekko charts customizados)
  - ✅ Renderização via SVG (escalável)
  - ✅ Comunidade enorme
- **Tecnologias**: JavaScript, SVG, Canvas
- **Uso no projeto**:
  - Mekko charts (não existem em Chart.js)
  - Gráficos altamente customizados
- **⚠️ Nota**: Curva de aprendizado maior, usar apenas se necessário

---

### 📚 Awesome D3
- **Repositório**: [wbkd/awesome-d3](https://github.com/wbkd/awesome-d3)
- **⭐ Stars**: 5k+
- **Descrição**: Lista curada de libraries, plugins e utils D3
- **Por que usar**:
  - ✅ Referência rápida de bibliotecas D3
  - ✅ Inclui: billboard.js, britecharts, plotly.js, etc
- **Uso no projeto**: Descobrir alternativas high-level baseadas em D3

---

### 📚 ECharts (Alternativa)
- **Repositório**: [apache/echarts](https://github.com/apache/echarts)
- **⭐ Stars**: 60k+
- **Descrição**: Biblioteca Apache com charts profissionais
- **Por que usar**:
  - ✅ Usado por Amazon, GitLab, Intel
  - ✅ Suporte nativo a Waterfall e Mekko
  - ✅ Temas profissionais out-of-the-box
  - ✅ Performance excelente com big data
- **Tecnologias**: JavaScript, Canvas/SVG
- **Uso no projeto**: **Alternativa a Chart.js + D3** (considerar se precisar de tudo em uma lib)

---

## 4. Google Cloud Functions

### 🌟 firebase/functions-samples
- **Repositório**: [firebase/functions-samples](https://github.com/firebase/functions-samples)
- **⭐ Stars**: 12k+
- **Forks**: 3.9k
- **Descrição**: Collection de sample apps para Cloud Functions (Firebase/Google Cloud)
- **Por que usar**:
  - ✅ **Dezenas de exemplos práticos**
  - ✅ Integração com Vision API, Stripe, PayPal
  - ✅ HTTP functions, CloudEvents, scheduled functions
  - ✅ Moderação de conteúdo, image processing
  - ✅ Error handling patterns
- **Tecnologias**: Node.js, Python, Cloud Functions
- **Uso no projeto**:
  - Padrões de estrutura de functions
  - HTTP endpoint examples
  - Error handling e logging
- **🔥 Destaque**: Exemplos de IA/ML integration

---

### 🌟 GoogleCloudPlatform/nodejs-docs-samples
- **Repositório**: [GoogleCloudPlatform/nodejs-docs-samples](https://github.com/GoogleCloudPlatform/nodejs-docs-samples)
- **⭐ Stars**: 7k+
- **Descrição**: Node.js samples oficiais para TODOS os produtos Google Cloud
- **Por que usar**:
  - ✅ **Código oficial do Google**
  - ✅ Exemplos de Cloud Functions, Storage, Secret Manager
  - ✅ Best practices de autenticação
  - ✅ Testes automatizados inclusos
- **Tecnologias**: Node.js, Google Cloud Platform
- **Uso no projeto**:
  - Cloud Functions structure: `functions/`
  - Secret Manager: `secret-manager/`
  - Cloud Storage: `storage/`

---

### 🌟 GoogleCloudPlatform/functions-framework-nodejs
- **Repositório**: [GoogleCloudPlatform/functions-framework-nodejs](https://github.com/GoogleCloudPlatform/functions-framework-nodejs)
- **⭐ Stars**: 1k+
- **Descrição**: Framework oficial para escrever Cloud Functions portáveis em Node.js
- **Por que usar**:
  - ✅ **Framework OFICIAL**
  - ✅ Testa functions localmente (antes de deploy)
  - ✅ Suporte a HTTP e CloudEvents
  - ✅ TypeScript support
- **Tecnologias**: Node.js, TypeScript
- **Uso no projeto**:
  - Setup local development
  - Testing antes de deploy
  - Instalar via: `npm install @google-cloud/functions-framework`

---

## 5. Prompts & Best Practices

### 📚 GoogleCloudPlatform/generative-ai (Prompts)
- **Path**: `gemini/prompts/` (mesmo repo da seção 2)
- **Descrição**: Exemplos de prompt engineering para Gemini
- **Por que usar**:
  - ✅ Prompts estruturados para JSON outputs
  - ✅ Few-shot examples
  - ✅ System instructions best practices
- **Uso no projeto**:
  - Criar prompt de análise de dados
  - Prompt de sugestão de título
  - Structured outputs (JSON mode)

---

### 📚 Awesome Gemini Prompts
- **Repositório**: [f/awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) (adaptável para Gemini)
- **⭐ Stars**: 110k+
- **Descrição**: Lista curada de prompts profissionais
- **Por que usar**:
  - ✅ Exemplos de "act as expert..." prompts
  - ✅ Inspiração para system instructions
- **Uso no projeto**: Criar persona de "data visualization consultant"

---

## 📊 Resumo: Repos Críticos para o MVP

| Categoria | Repositório | Stars | Prioridade |
|-----------|-------------|-------|------------|
| **Apps Script** | React-Google-Apps-Script | 1.4k | 🔴 Alta |
| **Apps Script** | apps-script-samples (Google) | 1.8k | 🔴 Alta |
| **Gemini API** | googleapis/js-genai | ~500 | 🔴 **CRÍTICA** |
| **Gemini Samples** | GoogleCloudPlatform/generative-ai | 11.7k | 🔴 **CRÍTICA** |
| **Charts** | Chart.js | 65k | 🔴 **CRÍTICA** |
| **Charts** | chartjs-plugin-waterfall | ~100 | 🟡 Média |
| **Charts** | D3.js | 108k | 🟢 Baixa (se Mekko) |
| **Cloud Functions** | firebase/functions-samples | 12k | 🔴 Alta |
| **Cloud Functions** | functions-framework-nodejs | 1k | 🟡 Média |

---

## 🚀 Plano de Implementação com Referências

### Sprint 1-2: Foundation
- **Usar**: `apps-script-samples` (sidebar estrutura)
- **Usar**: `React-Google-Apps-Script` (se optar por React)
- **Estudar**: Google Picker API examples

### Sprint 3-4: AI Integration
- **Usar**: `googleapis/js-genai` (SDK oficial) ✅
- **Estudar**: `GoogleCloudPlatform/generative-ai` (prompts e function calling)
- **Referência**: `google-gemini/example-chat-app` (error handling)

### Sprint 5-6: Chart Generation
- **Usar**: `Chart.js` (Column, Bar, Line) ✅
- **Usar**: `chartjs-plugin-waterfall` (Waterfall) ✅
- **Estudar**: D3.js examples para Mekko (se necessário)

### Sprint 7-8: Polish & Deploy
- **Usar**: `firebase/functions-samples` (deploy patterns)
- **Usar**: `functions-framework-nodejs` (local testing)
- **Estudar**: Cloud Functions best practices (nodejs-docs-samples)

---

## 📝 Notas Importantes

### ⚠️ SDKs Deprecated (NÃO USAR)
- ❌ `@google/generative-ai` (deprecated, migrar para `@google/genai`)
- ❌ `google-gemini/deprecated-generative-ai-js`
- ❌ `google-gemini/deprecated-generative-ai-python`

### ✅ Bibliotecas Recomendadas (Stack Final)
```json
{
  "dependencies": {
    "@google/genai": "^1.0.0",              // Gemini API (OFICIAL)
    "chart.js": "^4.4.0",                    // Charts principais
    "chartjs-plugin-waterfall": "^2.0.0",   // Waterfall
    "@google-cloud/functions-framework": "^3.0.0",  // Cloud Functions
    "@google-cloud/secret-manager": "^5.0.0",       // Secret Manager
    "express": "^4.18.0"                     // HTTP server (opcional)
  }
}
```

---

## 🔗 Links Úteis

**Documentação Oficial**:
- [Google Apps Script - Slides API](https://developers.google.com/apps-script/guides/slides)
- [Gemini API Quickstart](https://ai.google.dev/gemini-api/docs/quickstart)
- [Cloud Functions Node.js](https://cloud.google.com/functions/docs/create-deploy-http-nodejs)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)

**Comunidades**:
- [r/GoogleAppsScript](https://www.reddit.com/r/GoogleAppsScript/)
- [Stack Overflow - google-apps-script](https://stackoverflow.com/questions/tagged/google-apps-script)
- [Chart.js Slack](https://chartjs-slack.herokuapp.com/)

---

**Status**: ✅ Documento completo - Ready to code
**Última Atualização**: Outubro 2025
**Critério de Seleção**: Repositórios com 50+ stars (maioria 1k+), ativos e bem documentados
