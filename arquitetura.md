# Arquitetura e Plano de Desenvolvimento
## Smart Chart Co-Pilot for Google Slides - MVP

**Versão:** 1.0
**Data:** Outubro 2025
**Status:** Documento de Arquitetura

---

## 1. Visão Geral da Arquitetura

### 1.1 Princípios de Design

- **Simplicidade**: MVP enxuto focado em funcionalidades essenciais
- **Escalabilidade**: Arquitetura serverless que cresce conforme demanda
- **Performance**: Respostas rápidas (IA < 3s, renderização < 2s)
- **Segurança**: Autenticação OAuth 2.0, sem armazenamento de dados sensíveis
- **Manutenibilidade**: Código modular, separação clara de responsabilidades

### 1.2 Visão de Alto Nível

```
┌─────────────────────────────────────────────────────────┐
│                   Google Slides (Client)                │
│  ┌────────────────────────────────────────────────┐    │
│  │     Sidebar (HTML/CSS/JS + Apps Script)        │    │
│  │  • Data Input (Manual / Google Sheets)         │    │
│  │  • AI Suggestions Display                      │    │
│  │  • Chart Library Browser                       │    │
│  │  • Customization Panel                         │    │
│  └────────────────┬───────────────────────────────┘    │
└────────────────────┼───────────────────────────────────┘
                     │
                     │ HTTPS/REST API
                     │
         ┌───────────▼──────────────────────────┐
         │    Google Cloud Functions (Node.js)  │
         │  ┌──────────────────────────────┐   │
         │  │  /api/analyze-data           │   │
         │  │  /api/suggest-title          │   │
         │  │  /api/generate-preview       │   │
         │  └──────────┬───────────────────┘   │
         └─────────────┼───────────────────────┘
                       │
           ┌───────────┼─────────────┐
           │           │             │
           ▼           ▼             ▼
    ┌──────────┐ ┌─────────┐  ┌──────────┐
    │ Gemini   │ │ Cloud   │  │  Secret  │
    │ Flash    │ │ Storage │  │  Manager │
    │ API      │ │ (Assets)│  │ (API Key)│
    └──────────┘ └─────────┘  └──────────┘
```

---

## 2. Stack Tecnológico

### 2.1 Frontend (Add-on Sidebar)

**Tecnologia**: Google Apps Script + HTML Service

**Justificativa**:
- Integração nativa com Google Workspace
- Sem necessidade de hospedagem externa
- Acesso direto às APIs do Google (Slides, Sheets, Picker)
- Simplicidade para MVP

**Componentes**:
- **HTML/CSS/JS**: Interface do sidebar (350px)
- **Google Apps Script**: Backend do add-on (servidor Google)
- **Chart.js**: Preview de gráficos no sidebar
- **Google Picker API**: Seletor de arquivos do Drive

**Estrutura de Arquivos**:
```
gas-project/
├── Code.gs              # Main Apps Script (backend)
├── Sidebar.html         # Sidebar UI
├── Styles.html          # CSS styles
├── Client.js.html       # Client-side JavaScript
├── ChartGenerator.gs    # Chart rendering logic
└── SlidesAPI.gs         # Google Slides API wrapper
```

### 2.2 Backend (API)

**Tecnologia**: Google Cloud Functions (2nd Gen) + Node.js 20

**Justificativa**:
- Serverless = custo variável com uso
- Auto-scaling até 1000 usuários simultâneos
- Cold start aceitável (< 1s)
- Ecossistema Google simplifica autenticação

**Endpoints**:

```javascript
// POST /api/analyze-data
// Input: { data: [][], headers: [], types: [] }
// Output: { suggestions: [ {chart_type, confidence, reason} ] }

// POST /api/suggest-title
// Input: { data_summary: "", chart_type: "" }
// Output: { title: "" }
```

**Estrutura de Arquivos**:
```
cloud-functions/
├── analyze-data/
│   ├── index.js           # Entry point
│   ├── heuristics.js      # Rule-based fallbacks
│   ├── gemini-client.js   # Google Gemini API wrapper
│   └── package.json
└── suggest-title/
    ├── index.js
    └── package.json
```

### 2.3 Inteligência Artificial

**Tecnologia**: Google Gemini 2.0 Flash API (ou OpenAI GPT-4o-mini como alternativa)

**Justificativa**:
- **Custo muito reduzido**: Gemini Flash ~$0.001-0.002 por análise (10x mais barato)
- **Integração nativa**: Mesma plataforma GCP, sem configuração adicional
- **JSON mode confiável**: Suporte nativo a structured outputs
- **Latência competitiva**: < 2s p95, similar aos concorrentes
- **Alternativa**: OpenAI GPT-4o-mini ($0.15/1M tokens) também é econômico

**Estratégia de IA**:
1. **Heuristics First**: Regras determinísticas para casos comuns (60% dos casos)
   - Temporal data → Line chart
   - Single series comparison → Column chart
   - Part-to-whole (sums 100%) → Stacked 100% chart
   - Bridge (start → end) → Waterfall

2. **Gemini/OpenAI API**: Casos complexos ou ambíguos (40%)
   - Dados multidimensionais
   - Padrões não óbvios
   - Contexto adicional do usuário

**Fallback**: Se IA falhar, usa heuristics + sugere Column chart (default)

### 2.4 Infraestrutura

**Provedor**: Google Cloud Platform

**Serviços Utilizados**:
- **Cloud Functions**: API serverless
- **Cloud Storage**: Assets, templates de gráficos
- **Secret Manager**: API keys (Gemini)
- **Cloud Build**: CI/CD automático
- **Cloud Monitoring**: Logs e métricas

**Configuração de Custos (estimativa MVP)**:
- Cloud Functions: ~$10-30/mês (500 usuários)
- Gemini Flash API: ~$5-15/mês (5,000 charts × 40% uso IA)
- Storage: ~$1/mês
- **Total MVP**: $15-45/mês (redução de 70% vs Claude)

---

## 3. Fluxo de Dados Detalhado

### 3.1 Fluxo Principal (End-to-End)

```
[1] Usuário insere dados no sidebar
       ↓
[2] Client.js valida e formata dados
       data = { rows, headers, types, sample }
       ↓
[3] Apps Script chama POST /api/analyze-data
       ↓
[4] Cloud Function recebe request
       ├─ [4a] Tenta heuristics (rápido)
       │       Se confiança > 80% → retorna
       └─ [4b] Chama Gemini Flash API com prompt
               ↓
       [5] Gemini analisa e retorna JSON
               suggestions: [{type, confidence, reason}]
       ↓
[6] Cloud Function valida resposta
       └─ Se erro: fallback para Column chart
       ↓
[7] Sidebar renderiza 3 cards de sugestão
       ↓
[8] Usuário seleciona gráfico
       ↓
[9] Apps Script gera gráfico via Slides API
       ├─ Cria shape no slide
       ├─ Aplica dados
       ├─ Aplica styling (cores, labels)
       └─ Posiciona no centro
       ↓
[10] Gráfico aparece no slide (< 2s)
```

### 3.2 Schema de Dados

**Data Input Object**:
```javascript
{
  "sourceType": "sheets" | "manual",
  "sheetId": "1abc...",         // se sourceType = sheets
  "range": "Sheet1!A1:D10",     // se sourceType = sheets
  "data": [                     // se sourceType = manual
    ["Q1", 100, 120],
    ["Q2", 150, 140],
    ["Q3", 120, 160]
  ],
  "headers": ["Quarter", "Revenue", "Cost"],
  "types": ["string", "number", "number"]
}
```

**AI Suggestion Object**:
```javascript
{
  "suggestions": [
    {
      "chart_type": "waterfall",
      "confidence": 95,
      "reason": "Shows value bridge from start to end",
      "thumbnail_url": "gs://bucket/previews/waterfall_abc123.png"
    },
    // ... 2 more
  ],
  "metadata": {
    "heuristic_used": false,
    "processing_time_ms": 1840,
    "model": "claude-3-5-sonnet-20241022"
  }
}
```

**Chart Configuration Object**:
```javascript
{
  "dataSource": { /* DataInputObject */ },
  "chartType": "waterfall",
  "customization": {
    "colorPalette": "professional",      // blue theme
    "title": "Revenue Bridge Q1-Q4",
    "showDataLabels": true,
    "legendPosition": "right"
  },
  "slidePosition": {
    "x": 50,    // pixels from left
    "y": 80,    // pixels from top
    "width": 500,
    "height": 300
  }
}
```

---

## 4. APIs e Integrações

### 4.1 Google APIs

**Google Slides API v1**
- **Uso**: Criar, manipular e inserir shapes/charts
- **Métodos principais**:
  - `presentations.batchUpdate`: Insere gráfico
  - `presentations.pages.get`: Obtem slide ativo
- **Autenticação**: OAuth 2.0 Scopes
  - `https://www.googleapis.com/auth/presentations.currentonly`
  - `https://www.googleapis.com/auth/drive.readonly`

**Google Sheets API v4**
- **Uso**: Importar dados de planilhas
- **Métodos principais**:
  - `spreadsheets.values.get`: Ler range
- **Scope**: `https://www.googleapis.com/auth/spreadsheets.readonly`

**Google Picker API**
- **Uso**: UI nativa para selecionar arquivos do Drive
- **Configuração**: API key + OAuth client ID

### 4.2 Google Gemini API

**Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`

**Configuração**:
```javascript
{
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.3,  // baixa = mais consistente
    maxOutputTokens: 1024,
    responseMimeType: "application/json"  // JSON mode nativo
  },
  systemInstruction: "You are an expert data visualization consultant..."
}
```

**Rate Limits**:
- Free tier: 15 requests/min, 1500/dia
- Pay-as-you-go: 1000 requests/min (suficiente para MVP)

**Error Handling**:
- 429 (rate limit) → retry com exponential backoff
- 5xx (server error) → fallback para heuristics
- Timeout (> 10s) → fallback

**Alternativa: OpenAI GPT-4o-mini**
- Endpoint: `https://api.openai.com/v1/chat/completions`
- Custo similar: ~$0.15/1M tokens
- JSON mode: `response_format: { type: "json_object" }`

---

## 5. Tipos de Gráficos (MVP)

### 5.1 Biblioteca de Gráficos (8 tipos)

**Implementação**: Google Slides API não tem gráficos nativos avançados. Solução:
- Gráficos básicos (Column, Bar, Line): Usar `EmbeddedChart` API
- Gráficos especiais (Waterfall, Mekko): Gerar como `Group` de shapes customizados

**Tipos Implementados**:

| Tipo               | Método                  | Complexidade | Prioridade |
|--------------------|-------------------------|--------------|------------|
| Column (Clustered) | EmbeddedChart           | Baixa        | Sprint 3   |
| Column (Stacked)   | EmbeddedChart           | Baixa        | Sprint 3   |
| Column (100%)      | EmbeddedChart           | Baixa        | Sprint 3   |
| Bar (Clustered)    | EmbeddedChart           | Baixa        | Sprint 3   |
| Bar (Stacked)      | EmbeddedChart           | Baixa        | Sprint 4   |
| Line               | EmbeddedChart           | Baixa        | Sprint 3   |
| **Waterfall**      | Custom Shapes (Group)   | Alta         | Sprint 4   |
| **Mekko**          | Custom Shapes (Group)   | Alta         | Sprint 5   |

### 5.2 Estratégia de Renderização

**Gráficos Simples (Column, Bar, Line)**:
```javascript
// Apps Script - Usando Charts Service
const chart = Charts.newBarChart()
  .setDataTable(dataTable)
  .setColors(['#4285F4', '#34A853'])
  .setTitle('Revenue by Quarter')
  .build();

// Inserir no slide via API
const chartBlob = chart.getAs('image/png');
slide.insertImage(chartBlob);
```

**Gráficos Complexos (Waterfall, Mekko)**:
```javascript
// Gerar shapes customizados
const shapes = generateWaterfallShapes(data, config);

// Agrupar shapes
const group = slide.group(shapes);
group.setTitle('Waterfall Chart');
```

---

## 6. Segurança e Privacidade

### 6.1 Autenticação

**OAuth 2.0 Flow**:
1. Usuário abre add-on → Google solicita permissões
2. Scopes solicitados:
   - `presentations.currentonly` (apenas apresentação aberta)
   - `spreadsheets.readonly` (importar dados)
   - `drive.file` (Picker API)
3. Token armazenado por Google (não pelo add-on)

**Validação de Requests**:
- Cloud Functions valida tokens via `google-auth-library`
- Rate limiting: 60 requests/min/usuário (Cloud Armor)

### 6.2 Privacidade de Dados

**Princípio**: Zero armazenamento persistente de dados do usuário

**Dados Processados**:
- ✅ **Temporários**: Dados enviados para IA (excluídos após response)
- ✅ **Anônimos**: Métricas de uso (chart types, latency)
- ❌ **Não armazena**: Conteúdo de gráficos, dados de sheets

**Gemini API**:
- Google não usa dados de API comercial para treinar modelos (via contrato Enterprise)
- Dados não persistem após request
- Modo "confidential computing" disponível se necessário

### 6.3 Secrets Management

**API Keys**:
```bash
# Armazenar no Secret Manager
gcloud secrets create gemini-api-key --data-file=key.txt

# Cloud Function acessa via:
const apiKey = await secretManager.accessSecret('gemini-api-key');

# Nota: Gemini pode usar Application Default Credentials (ADC)
# do próprio GCP, dispensando API key se configurado corretamente
```

---

## 7. Performance e Escalabilidade

### 7.1 Metas de Performance

| Métrica                  | Target | Medição            |
|--------------------------|--------|--------------------|
| Sidebar Load Time        | < 1s   | Time to interactive|
| AI Analysis              | < 3s   | p95 latency        |
| Chart Insertion          | < 2s   | p95 latency        |
| Dataset Limit            | 1000   | Rows               |
| Concurrent Users         | 1000   | Cloud Functions    |

### 7.2 Otimizações

**Frontend**:
- Lazy load Chart.js (só quando preview necessário)
- Debounce de inputs (300ms)
- Cache de thumbnails (sessionStorage)

**Backend**:
- **Heuristics first**: 60% dos casos evitam chamada IA
- **Parallel processing**: Gerar thumbnail enquanto IA analisa
- **Sampling**: Datasets > 100 linhas → enviar apenas sample para IA

**IA**:
- Temperatura baixa (0.3) = respostas mais rápidas e consistentes
- Max tokens = 1024 (suficiente para JSON)
- **Gemini Flash já é otimizado para latência baixa** (< 1s típico)
- Context caching (Gemini) - reutiliza system prompt, reduz custo em 75%

### 7.3 Escalabilidade

**Cloud Functions Auto-Scaling**:
```yaml
# function.yaml
runtime: nodejs20
minInstances: 0       # Cold start OK para MVP
maxInstances: 100     # Suporta 1000 usuários (10 req/s cada)
memory: 512MB
timeout: 30s
```

**Estimativa de Carga (Mês 3)**:
- 500 MAU (Monthly Active Users)
- 10 charts/usuário/mês = 5,000 charts
- Pico: ~50 usuários simultâneos
- **Conclusão**: 10 instâncias suficientes (bem abaixo do max)

---

## 8. Monitoramento e Observabilidade

### 8.1 Métricas Chave (KPIs Técnicos)

**Performance**:
- Latência p50, p95, p99 de cada endpoint
- Cold start rate (< 5% das requests)

**Confiabilidade**:
- Error rate (< 2%)
- Success rate por tipo de gráfico
- AI fallback rate (< 40%)

**Custo**:
- Cloud Functions invocations/dia
- Gemini API tokens/dia
- Custo por chart gerado (target: < $0.01)

### 8.2 Ferramentas

**Google Cloud Monitoring**:
- Dashboards customizados
- Alertas:
  - Error rate > 5% (30min)
  - Latency p95 > 5s (15min)
  - Custo diário > $20

**Analytics (Produto)**:
- Google Analytics 4 (eventos customizados):
  - `chart_generated` (tipo, source, customization)
  - `ai_suggestion_accepted` (posição 1/2/3)
  - `manual_chart_selected` (tipo)
  - `error_occurred` (tipo, mensagem)

**Logging**:
```javascript
// Structured logging (Cloud Logging)
console.log(JSON.stringify({
  severity: 'INFO',
  message: 'Chart generated',
  userId: hash(userId),  // hashed for privacy
  chartType: 'waterfall',
  dataRows: 12,
  latencyMs: 1847
}));
```

---

## 9. Estratégia de Testes

### 9.1 Testes Unitários

**Apps Script** (Google Clasp + Jest):
```javascript
// test/ChartGenerator.test.js
describe('ChartGenerator', () => {
  it('should generate column chart config', () => {
    const config = generateColumnChart(mockData);
    expect(config.type).toBe('COLUMN');
    expect(config.series).toHaveLength(2);
  });
});
```

**Cloud Functions** (Jest):
```javascript
// test/analyze-data.test.js
describe('/api/analyze-data', () => {
  it('should return 3 suggestions', async () => {
    const response = await request(app)
      .post('/api/analyze-data')
      .send(mockData);
    expect(response.body.suggestions).toHaveLength(3);
  });
});
```

### 9.2 Testes de Integração

**Postman Collection**:
- Testar endpoints da API
- Validar schemas de response
- Testar error scenarios

**Apps Script UI Testing**:
- Manual (MVP) - 10 cenários críticos:
  1. Importar dados do Sheets
  2. Colar dados manualmente
  3. IA retorna 3 sugestões
  4. Inserir cada tipo de gráfico
  5. Customizar cores
  6. Gerar título com IA
  7. Error handling (IA offline)
  8. Dataset grande (1000 linhas)

### 9.3 Testes de Performance

**Load Testing** (Artillery.io):
```yaml
# load-test.yml
config:
  target: 'https://us-central1-project.cloudfunctions.net'
  phases:
    - duration: 60
      arrivalRate: 10  # 10 req/s
scenarios:
  - name: 'Analyze data'
    flow:
      - post:
          url: '/api/analyze-data'
          json:
            data: {{ mockData }}
```

**Metas**:
- p95 < 3s com 50 usuários simultâneos
- Error rate < 1%

---

## 10. Plano de Deploy e Rollout

### 10.1 Ambientes

| Ambiente   | Descrição                          | URL                                    |
|------------|------------------------------------|----------------------------------------|
| Dev        | Desenvolvimento local              | localhost:8080                         |
| Staging    | Testes de integração               | staging-functions.cloudfunctions.net   |
| Production | Usuários reais                     | prod-functions.cloudfunctions.net      |

### 10.2 CI/CD Pipeline

**GitHub Actions** (ou Cloud Build):

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloud Functions

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm test

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: gcloud functions deploy analyze-data --env=staging

  deploy-production:
    needs: deploy-staging
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: gcloud functions deploy analyze-data --env=production
```

### 10.3 Estratégia de Rollout

**Sprint 8 (Beta Launch)**:
- Whitelist de 50 emails (early adopters)
- Enviar convite personalizado
- Onboarding guiado (primeiro uso)
- Coletar feedback estruturado (form)

**Sprint 10 (Public Launch)**:
- Publicar no Google Workspace Marketplace
- Modo "unlisted" (apenas quem tem link)
- Monitorar métricas por 1 semana
- Se estável → modo "public"

**Rollback Plan**:
- Se error rate > 10% → rollback para versão anterior
- Cloud Functions permitem traffic splitting (90%/10%)

---

## 11. Cronograma Detalhado (10 Semanas)

### **Sprint 1-2: Foundation** (Semanas 1-2)

**Objetivos**: Sidebar funcional com data input

**Tarefas (Dev)**:
```
Semana 1:
[ ] Setup Google Cloud Project (2h)
    - Criar projeto no GCP
    - Habilitar APIs (Slides, Sheets, Drive, Picker)
    - Configurar OAuth consent screen
[ ] Setup Apps Script Project (4h)
    - Criar projeto no Apps Script
    - Configurar Clasp (CLI)
    - Estrutura de arquivos
[ ] Sidebar UI Básico (8h)
    - HTML/CSS do layout
    - Tabs: "Sheets" / "Manual"
    - Placeholder dos componentes
[ ] Google Picker Integration (8h)
    - Implementar seletor de arquivos
    - Range selector
    - Preview de dados

Semana 2:
[ ] Manual Input Grid (12h)
    - Grid editável 10x10
    - Copy/paste funcionando
    - Auto-detect headers
    - Validação de tipos
[ ] Data Preview Component (4h)
    - Exibir primeiras 50 linhas
    - Scroll funcionando
[ ] Deploy Inicial (2h)
    - Deploy no Apps Script
    - Testar em apresentação real
```

**Entregável**: Usuário consegue abrir sidebar e inserir/importar dados

**Testes**:
- [ ] Importar range de 100 linhas do Sheets
- [ ] Colar 50 linhas do Excel
- [ ] Preview mostra dados corretamente

---

### **Sprint 3-4: AI Integration** (Semanas 3-4)

**Objetivos**: IA sugere gráficos

**Tarefas (Dev)**:
```
Semana 3:
[ ] Setup Cloud Function (6h)
    - Criar projeto Node.js
    - Estrutura de /api/analyze-data
    - Deploy no GCP
[ ] Heuristics Engine (8h)
    - Implementar 5 regras principais:
      * Temporal → Line
      * Single series → Column
      * Part-to-whole → Stacked 100%
      * Bridge → Waterfall
      * Default → Column
[ ] Gemini API Integration (8h)
    - Cliente Google AI SDK (@google/generative-ai)
    - Prompt engineering (v1)
    - JSON parsing e validação

Semana 4:
[ ] API Error Handling (4h)
    - Retry logic
    - Fallback para heuristics
    - Timeout handling
[ ] Frontend: Suggestion Cards (8h)
    - UI dos 3 cards
    - Exibir tipo, confidence, reason
    - Loading state ("Analyzing...")
[ ] Conectar Frontend ↔ Backend (4h)
    - Apps Script chama Cloud Function
    - Passar dados formatados
    - Atualizar UI com resposta
[ ] Testing & Refinement (6h)
    - Testar 20 datasets diferentes
    - Ajustar prompts
    - Medir latência
```

**Entregável**: IA analisa dados e mostra 3 sugestões em < 3s

**Testes**:
- [ ] 10 datasets → IA retorna 3 sugestões válidas
- [ ] Latência p95 < 3s
- [ ] Fallback funciona se IA falhar

---

### **Sprint 5-6: Chart Generation** (Semanas 5-6)

**Objetivos**: Gerar e inserir gráficos básicos

**Tarefas (Dev)**:
```
Semana 5:
[ ] Slides API Integration (6h)
    - Wrapper para batchUpdate
    - Obter slide ativo
    - Calcular posicionamento
[ ] Chart Type: Column (8h)
    - Clustered Column
    - Stacked Column
    - 100% Stacked Column
    - Styling (cores, labels)
[ ] Chart Type: Bar (6h)
    - Implementar variantes
    - Reuso de lógica do Column
[ ] Chart Library UI (6h)
    - Grid 2x5 de ícones
    - Hover effects
    - Seleção visual

Semana 6:
[ ] Chart Type: Line (4h)
    - Line e Line with Markers
[ ] Chart Type: Waterfall (12h)
    - Geração customizada (shapes)
    - Lógica de "bridge"
    - Labels de variação
[ ] Styling System (6h)
    - Paleta de cores (Professional Blue)
    - Fontes consistentes
    - Data labels automáticos
[ ] Preview Thumbnail Generator (4h)
    - Renderizar miniatura do gráfico
    - Cache no sessionStorage
```

**Entregável**: Usuário consegue gerar e inserir 4 tipos (Column, Bar, Line, Waterfall)

**Testes**:
- [ ] Cada tipo insere corretamente no slide
- [ ] Cores e styling aplicados
- [ ] Latência < 2s do clique ao gráfico aparecer

---

### **Sprint 7-8: Polish & MVP Launch** (Semanas 7-8)

**Objetivos**: Produto completo e polido

**Tarefas (Dev)**:
```
Semana 7:
[ ] Chart Type: Mekko (10h)
    - Implementação complexa (shapes)
    - Lógica de proporção
[ ] Customization Panel (8h)
    - Color Palette selector
    - Title input (com IA suggestion)
    - Data labels toggle
    - Legend position dropdown
[ ] AI Title Suggestion (4h)
    - Endpoint /api/suggest-title
    - Integração com frontend
    - Aplicar título automaticamente
[ ] Preview System (4h)
    - Atualizar preview ao mudar config
    - Debounce de 300ms

Semana 8:
[ ] Onboarding Flow (6h)
    - Modal de boas-vindas (primeira vez)
    - Tutorial interativo (3 passos)
    - Skip option
[ ] Analytics Integration (4h)
    - Google Analytics 4
    - Eventos customizados (8 eventos)
    - Testar tracking
[ ] Bug Fixes & Edge Cases (8h)
    - Testar com dados vazios
    - Testar com caracteres especiais
    - Testar com 1000 linhas
    - Handling de erros de rede
[ ] Deploy Beta (4h)
    - Whitelist 50 emails
    - Deploy production
    - Enviar convites
[ ] Documentation (4h)
    - README.md
    - User guide (em Notion ou Docs)
    - FAQ
```

**Entregável**: MVP funcional lançado para 50 early adopters

**Testes**:
- [ ] 10 cenários end-to-end funcionando
- [ ] Onboarding testado com 3 usuários
- [ ] Sem erros críticos em 100 charts gerados

---

### **Sprint 9-10: Feedback & Iterate** (Semanas 9-10)

**Objetivos**: Melhorias baseadas em uso real

**Tarefas (Product + Dev)**:
```
Semana 9:
[ ] Coletar Feedback (contínuo)
    - Form estruturado (NPS + perguntas abertas)
    - Entrevistas com 10 usuários (30min cada)
    - Analisar analytics (quais gráficos mais usados)
[ ] Ajustar Prompts de IA (8h)
    - Medir accuracy (% usuários usam sugestão #1)
    - Se < 70% → iterar prompts
    - Adicionar exemplos ao prompt
[ ] Performance Optimization (8h)
    - Identificar bottlenecks (Cloud Monitoring)
    - Otimizar queries/API calls
    - Reduzir cold starts
[ ] UX Tweaks (8h)
    - Ajustar baseado em feedback
    - Melhorar mensagens de erro
    - Ajustar tooltips e labels

Semana 10:
[ ] Security Audit (4h)
    - Revisar OAuth scopes
    - Testar rate limiting
    - Penetration testing básico
[ ] Final Bug Fixes (8h)
    - Resolver issues críticos
    - Testar em diferentes browsers
[ ] Prepare Public Launch (8h)
    - Google Workspace Marketplace listing
    - Screenshots e demo video
    - Landing page simples
    - Pricing page (Free tier defined)
[ ] Launch! (4h)
    - Mudar de "unlisted" para "public"
    - Anunciar em redes sociais
    - Email para beta testers
```

**Entregável**: Produto refinado pronto para lançamento público

**Métricas de Sucesso (fim Sprint 10)**:
- [ ] NPS > 40
- [ ] Accuracy IA > 70% (usuários escolhem sugestão #1)
- [ ] Error rate < 2%
- [ ] 500+ charts gerados
- [ ] 100+ MAU

---

## 12. Riscos e Mitigações

| Risco                              | Impacto | Prob. | Mitigação                                    | Responsável |
|------------------------------------|---------|-------|----------------------------------------------|-------------|
| **IA sugere gráfico errado**       | Alto    | Média | Heuristics de fallback (60% cobertura)       | Tech Lead   |
| **Performance ruim (> 5s)**        | Alto    | Baixa | Sampling de dados grandes, cache             | DevOps      |
| **Google Slides API muda**         | Alto    | Baixa | Versioning, monitorar breaking changes       | Tech Lead   |
| **Custos de IA muito altos**       | Médio   | Baixa | Heuristics first, cache de prompts           | Product     |
| **Baixa adoção inicial**           | Alto    | Média | Beta fechado, onboarding guiado, feedback    | Product     |
| **Usuários não entendem IA**       | Médio   | Média | Explicar razão de cada sugestão, tooltips    | Product     |
| **Dados sensíveis vazam**          | Alto    | Baixa | Não armazenar dados, audit de segurança      | Tech Lead   |
| **Marketplace rejeita add-on**     | Médio   | Baixa | Revisar guidelines antes, testar aprovação   | Product     |

---

## 13. Equipe e Responsabilidades

### 13.1 Roles (Time Mínimo)

**Product Lead** (1 pessoa - 20h/semana):
- Priorização de features
- Feedback de usuários
- Roadmap e métricas
- Go-to-market

**Tech Lead / Fullstack Dev** (1 pessoa - 40h/semana):
- Arquitetura e decisões técnicas
- Apps Script (frontend)
- Cloud Functions (backend)
- DevOps e deploy

**Design (opcional)** (freelancer - 10h total):
- UI/UX do sidebar
- Ícones dos gráficos
- Paleta de cores

**Total**: 1.5 FTE + freelancer

### 13.2 Ferramentas de Trabalho

- **Código**: GitHub (repo privado)
- **Tasks**: Linear ou Notion
- **Comunicação**: Slack ou Discord
- **Design**: Figma
- **Docs**: Notion ou Google Docs

---

## 14. Pós-MVP (Roadmap Futuro)

### 14.1 Features Planejadas (3-6 meses)

**Q1 2026**:
- Mais tipos de gráficos (Pie, Scatter, Gantt)
- Templates de gráficos customizados
- Biblioteca compartilhada (Team plan)
- Export para PowerPoint

**Q2 2026**:
- Multi-chart generation (criar dashboard de 6 gráficos)
- Integração com BigQuery (dados grandes)
- API pública (para devs)
- White-label (Enterprise)

### 14.2 Evolução Técnica

**Migração para React** (se UI ficar muito complexa):
- Apps Script suporta React via bundling (Webpack)
- Melhora manutenibilidade

**Machine Learning próprio** (se volume escalar):
- Treinar modelo de classificação (tipo de gráfico)
- Reduzir custo de IA em 80%
- Latência < 100ms

---

## 15. Conclusão

Este documento define uma arquitetura **simples, escalável e pragmática** para o MVP do Smart Chart Co-Pilot.

**Decisões-chave**:
✅ **Serverless** (Cloud Functions) = custo variável, sem infra
✅ **Apps Script** (frontend) = integração nativa com Google
✅ **Gemini Flash API** (IA) = custo-benefício ideal para análise contextual
✅ **Heuristics first** = performance e custo otimizados
✅ **8 tipos de gráficos** = suficiente para 80% dos casos de uso

**Próximos Passos Imediatos**:
1. Setup Google Cloud Project (hoje)
2. Criar repositório GitHub (hoje)
3. Prototipar sidebar básico (amanhã)
4. Validar Gemini Flash API com 10 exemplos (esta semana)

**Estimativa de Entrega**: 10 semanas (2.5 meses) com 1 dev full-time

---

**Status**: ✅ Documento aprovado - Ready to start Sprint 1
**Última Atualização**: Outubro 2025
**Autor**: Arquiteto de Software
**Aprovação**: Product Lead
