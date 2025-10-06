# Plano de Implementação - Smart Chart Co-Pilot MVP
## Execução Rápida, Poderosa e Solo

**Versão:** 2.0 (Simplificada)
**Data:** Outubro 2025
**Objetivo:** MVP funcional em 6-8 semanas - dev solo, branch única, máxima velocidade

---

## 📋 Princípios Fundamentais (Solo Dev)

### ⚡ Velocidade com Qualidade
1. **Ship rápido, iterar depois**: MVP funcional antes de perfeição
2. **Testar o essencial**: Testes manuais + validação em produção
3. **Commits frequentes**: Git como backup, não controle complexo
4. **Ir direto ao ponto**: Pular burocracia, focar em funcionalidade

### 🧩 Sequência Lógica (Simplificada)
1. **Setup mínimo viável**: Infraestrutura básica em 1 dia
2. **Feature por vez**: Implementar, testar manualmente, commitar
3. **Deploy incremental**: Cada fase vai direto para produção
4. **Validação prática**: Testar com dados reais, não mocks

### 🚀 Execução Solo
1. **Branch única (main)**: Commits diretos, tags para versões
2. **Zero overhead**: Sem PRs, sem approvals, sem pipelines complexos
3. **Reutilizar ao máximo**: Copiar código das referências (referencias.md)
4. **Documentar o necessário**: README + comments inline quando crítico

---

## 🎯 Visão Geral das Fases (Simplificada)

```
FASE 0: Setup Rápido (1 dia)
   ↓ ✅ Infra básica + primeiro deploy

FASE 1: Data Input (3-4 dias)
   ↓ ✅ Import Sheets + Manual grid funcionando

FASE 2: IA + Backend (4-5 dias)
   ↓ ✅ Gemini respondendo + 3 sugestões no UI

FASE 3: Charts Core (5-7 dias)
   ↓ ✅ 4 tipos inserindo no slide

FASE 4: Polish Essencial (3-4 dias)
   ↓ ✅ Customização + UX básico

FASE 5: Beta + Ajustes (1 semana)
   ↓ ✅ 10-20 beta testers + feedback

FASE 6: Launch (3-4 dias)
   ↓ 🚀 Marketplace público
```

**Total: 6-8 semanas (1.5-2 meses) - dev solo**

---

## 🚀 FASE 0: Setup Rápido
**Duração:** 1 dia (6-8h)
**Objetivo:** Infraestrutura mínima funcionando + primeiro deploy

### 📦 0.1 Git + Estrutura Básica (30min)

**Tarefas:**
```bash
# Setup ultra-rápido
[ ] Criar repo Git (GitHub/local)
    git init smart-chart-copilot
    cd smart-chart-copilot

[ ] Estrutura de pastas
    mkdir -p gas-project cloud-functions/analyze-data
    touch README.md .gitignore .env.example

[ ] .gitignore básico
    node_modules/
    .env
    .clasp.json
    *.log

[ ] Primeiro commit
    git add .
    git commit -m "feat: initial setup"
    git branch -M main
    git remote add origin [URL]
    git push -u origin main
```

**Estratégia de Versionamento (Solo):**
- ✅ Branch única: `main`
- ✅ Commits diretos (sem PRs)
- ✅ Tags para versões: `v0.1.0`, `v0.2.0`, etc
- ✅ Rollback: `git revert` ou `git reset --hard [commit]`

**Exemplo de commits:**
```bash
# Durante desenvolvimento
git add .
git commit -m "feat: add data input grid"
git push

# Marcar versões
git tag v0.1.0 -m "MVP data input"
git push --tags

# Rollback se necessário
git revert HEAD  # ou git reset --hard HEAD~1
```

---

### ☁️ 0.2 Google Cloud Platform Setup (2h)

**Tarefas:**
```bash
# GCP Setup rápido (sem ambientes separados)
[ ] Criar projeto único: smart-chart-copilot
    - Billing ativo
    - Budget alert: $100/mês

[ ] Habilitar APIs (copiar/colar tudo de uma vez)
    gcloud services enable \
      slides.googleapis.com \
      sheets.googleapis.com \
      drive.googleapis.com \
      cloudfunctions.googleapis.com \
      secretmanager.googleapis.com \
      generativelanguage.googleapis.com

[ ] OAuth 2.0 (configuração mínima)
    - Consent screen: Internal (teste rápido)
    - Client ID: Web application
    - Scopes mínimos:
      * presentations.currentonly
      * spreadsheets.readonly

[ ] Gemini API Key
    - Criar em: https://ai.google.dev/
    - Salvar em Secret Manager:
      gcloud secrets create gemini-api-key --data-file=-
      # Colar API key, Ctrl+D
```

---

### 📱 0.3 Apps Script Setup (2h)

**Tarefas:**
```bash
[ ] Instalar Clasp
    npm install -g @google/clasp
    clasp login

[ ] Criar projeto (copiar estrutura pronta)
    clasp create --type standalone --title "Smart Chart Co-Pilot"
    cd gas-project

[ ] Copiar arquivos base (do React-Google-Apps-Script)
    # Baixar: github.com/enuchi/React-Google-Apps-Script
    # Copiar: Code.gs, Sidebar.html, appsscript.json

[ ] Deploy teste
    clasp push
    clasp open  # Verificar no browser
```

**Referência rápida:**
- Template: `enuchi/React-Google-Apps-Script` (copiar estrutura)
- Simplificar: Remover React, só HTML/JS vanilla

---

### 🔧 0.4 Cloud Function Básica (2h)

**Tarefas:**
```bash
[ ] Setup mínimo
    cd cloud-functions/analyze-data
    npm init -y
    npm install @google-cloud/functions-framework @google/genai

[ ] Função hello world
    # index.js
    const functions = require('@google-cloud/functions-framework');

    functions.http('analyzeData', (req, res) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.json({ status: 'ok' });
    });

[ ] Deploy direto (sem staging)
    gcloud functions deploy analyzeData \
      --runtime nodejs20 \
      --trigger-http \
      --allow-unauthenticated \
      --region us-central1

[ ] Testar
    curl https://us-central1-PROJECT.cloudfunctions.net/analyzeData
    # Expect: {"status":"ok"}
```

---

### ✅ Checklist Final FASE 0 (Simplificada)

```
Essencial:
[ ] Git repo criado + main branch
[ ] GCP project com APIs habilitadas
[ ] OAuth Client ID funcionando
[ ] Gemini API key no Secret Manager
[ ] Apps Script deployado (abre sidebar vazio)
[ ] Cloud Function responde via HTTPS

Opcional (pular por agora):
[ ] CI/CD (fazer depois se necessário)
[ ] Testes automatizados (fazer na FASE 5)
[ ] Documentação completa (README básico ok)
```

**🎯 Meta:** Tudo funcionando em 1 dia (6-8h)

**Rollback rápido:**
```bash
git reset --hard HEAD~1  # Voltar 1 commit
git push --force
```

---

## 🏗️ FASE 1: Data Input
**Duração:** 3-4 dias
**Objetivo:** Importar dados (Sheets + manual) e mostrar preview

### 📊 1.1 Sidebar UI Básico (Dia 1 - 4h)

**Tarefas:**
```html
<!-- Sidebar.html -->
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <?!= include('Styles'); ?>
  </head>
  <body>
    <div id="app">
      <header>
        <h2>📊 Smart Chart Co-Pilot</h2>
      </header>

      <section id="data-input">
        <div class="tabs">
          <button class="tab active" data-tab="sheets">Google Sheets</button>
          <button class="tab" data-tab="manual">Manual Input</button>
        </div>

        <div id="sheets-tab" class="tab-content active">
          <button id="picker-button">Select from Drive</button>
          <div id="range-input" style="display:none">
            <input type="text" placeholder="Sheet1!A1:D10" id="range" />
            <button id="import-button">Import</button>
          </div>
        </div>

        <div id="manual-tab" class="tab-content">
          <div id="manual-grid"></div>
        </div>
      </section>

      <section id="data-preview">
        <h3>Preview</h3>
        <div id="preview-table"></div>
      </section>
    </div>

    <?!= include('Client.js'); ?>
  </body>
</html>
```

**Atalho:**
- Copiar estrutura de: `apps-script-samples/slides/translate/sidebar.html`
- CSS básico (sem frameworks)

**Validação:**
✅ Sidebar abre + tabs funcionam

---

### 🔗 1.2 Google Picker + Import Sheets (Dia 1-2 - 6h)

**Tarefas:**
```javascript
// Client.js.html
function showPicker() {
  google.script.run
    .withSuccessHandler(createPicker)
    .getOAuthToken();
}

function createPicker(token) {
  const picker = new google.picker.PickerBuilder()
    .addView(google.picker.ViewId.SPREADSHEETS)
    .setOAuthToken(token)
    .setCallback(pickerCallback)
    .build();
  picker.setVisible(true);
}

function pickerCallback(data) {
  if (data.action === google.picker.Action.PICKED) {
    const fileId = data.docs[0].id;
    document.getElementById('range-input').style.display = 'block';
    document.getElementById('selected-file-id').value = fileId;
  }
}
```

```javascript
// Code.gs
function getOAuthToken() {
  return ScriptApp.getOAuthToken();
}

function importFromSheets(fileId, range) {
  const ss = SpreadsheetApp.openById(fileId);
  const sheet = ss.getSheetByName(range.split('!')[0]);
  const rangeData = sheet.getRange(range.split('!')[1]).getValues();

  return {
    data: rangeData,
    headers: rangeData[0],
    rows: rangeData.slice(1)
  };
}
```

**Atalho:**
- Copiar exemplo de Picker de: `apps-script-samples`
- Simplificar: só Spreadsheets, sem outras views

**Validação:**
✅ Import funciona + preview exibe dados

---

### ✍️ 1.3 Manual Input Grid (Dia 2-3 - 4h)

**Tarefas (versão simplificada):**
```html
<!-- Manual Grid usando Handsontable (lightweight) ou vanilla -->
<div id="manual-grid"></div>

<script>
// Vanilla implementation (sem libs externas)
function createManualGrid() {
  const grid = document.getElementById('manual-grid');
  const table = document.createElement('table');

  // Criar 10x10 grid editável
  for (let i = 0; i < 10; i++) {
    const row = table.insertRow();
    for (let j = 0; j < 10; j++) {
      const cell = row.insertCell();
      const input = document.createElement('input');
      input.type = 'text';
      input.dataset.row = i;
      input.dataset.col = j;
      cell.appendChild(input);
    }
  }

  grid.appendChild(table);

  // Paste support
  table.addEventListener('paste', handlePaste);
}

function handlePaste(e) {
  e.preventDefault();
  const text = e.clipboardData.getData('text/plain');
  const rows = text.split('\n').map(r => r.split('\t'));

  // Populate grid
  const startRow = parseInt(e.target.dataset.row);
  const startCol = parseInt(e.target.dataset.col);

  rows.forEach((row, i) => {
    row.forEach((value, j) => {
      const input = document.querySelector(
        `[data-row="${startRow + i}"][data-col="${startCol + j}"]`
      );
      if (input) input.value = value;
    });
  });

  // Auto-detect headers
  detectHeaders();
}

function detectHeaders() {
  const firstRow = document.querySelectorAll('[data-row="0"]');
  const isHeader = Array.from(firstRow).every(input =>
    isNaN(input.value) && input.value.trim() !== ''
  );

  if (isHeader) {
    firstRow.forEach(input => input.classList.add('header'));
  }
}
</script>
```

**Atalho rápido:**
- Usar `<textarea>` simples (paste only)
- Parse: `text.split('\n').map(row => row.split('\t'))`
- Pular grid complexo para MVP

**Validação:**
✅ Copy/paste funciona + parse correto

---

### 📋 1.4 Preview Simples (Dia 3 - 2h)

**Tarefas (mínimo viável):**
```javascript
// Code.gs
function validateData(data) {
  const headers = data[0];
  const rows = data.slice(1);

  // Validações
  const validation = {
    valid: true,
    errors: [],
    warnings: [],
    stats: {
      rows: rows.length,
      cols: headers.length,
      types: detectColumnTypes(rows)
    }
  };

  // Checar se tem dados
  if (rows.length === 0) {
    validation.valid = false;
    validation.errors.push('No data rows found');
  }

  // Checar colunas vazias
  headers.forEach((header, i) => {
    const isEmpty = rows.every(row => !row[i] || row[i] === '');
    if (isEmpty) {
      validation.warnings.push(`Column "${header}" is empty`);
    }
  });

  // Checar limite (1000 linhas)
  if (rows.length > 1000) {
    validation.warnings.push('Dataset has >1000 rows, will be sampled');
  }

  return validation;
}

function detectColumnTypes(rows) {
  const types = {};
  const firstRow = rows[0];

  firstRow.forEach((value, i) => {
    const columnValues = rows.map(row => row[i]);

    if (columnValues.every(v => !isNaN(v) && v !== '')) {
      types[i] = 'number';
    } else if (columnValues.every(v => isValidDate(v))) {
      types[i] = 'date';
    } else {
      types[i] = 'string';
    }
  });

  return types;
}
```

**Simplificação:**
- Mostrar só primeiras 10 linhas (table HTML simples)
- Validação básica: checar se tem dados

**Validação:**
✅ Preview funciona + mostra primeiras 10 linhas

---

### ✅ Checklist FASE 1 (Simplificada)

```
Essencial:
[ ] Import do Sheets funciona (Picker + range)
[ ] Paste manual funciona (textarea)
[ ] Preview mostra dados (table HTML)
[ ] Detecta headers automaticamente

Commit & Deploy:
git add .
git commit -m "feat: data input completo"
git tag v0.1.0
git push --tags
clasp push  # Deploy Apps Script
```

**🎯 Meta:** Data input funcional em 3-4 dias

**Teste rápido:**
1. Importar planilha com 20 linhas ✅
2. Colar dados do Excel ✅
3. Preview mostra corretamente ✅

---

## 🧠 FASE 2: IA + Backend
**Duração:** 4-5 dias
**Objetivo:** Gemini sugere 3 gráficos + UI mostra cards

### 🔌 2.1 Gemini API Client (Dia 1-2 - 6h)

**Atalho: Copiar exemplo pronto de `GoogleCloudPlatform/generative-ai`**

**Tarefas:**
```javascript
// cloud-functions/analyze-data/gemini-client.js
const { GoogleGenerativeAI } = require('@google/genai');

class GeminiClient {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1024,
        responseMimeType: 'application/json'
      }
    });
  }

  async analyzeData(data, headers, types) {
    const prompt = this.buildPrompt(data, headers, types);

    try {
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        }
      });

      const response = result.response;
      const jsonResponse = JSON.parse(response.text());

      return this.validateResponse(jsonResponse);
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error(`AI analysis failed: ${error.message}`);
    }
  }

  buildPrompt(data, headers, types) {
    const sample = data.slice(0, 5);

    return `
Analyze this dataset and suggest 3 chart types:

DATA:
- Rows: ${data.length}
- Columns: ${headers.length}
- Headers: ${headers.join(', ')}
- Types: ${JSON.stringify(types)}
- Sample (first 5 rows):
${JSON.stringify(sample, null, 2)}

RESPOND WITH JSON:
{
  "suggestions": [
    {
      "chart_type": "column_clustered|waterfall|line|etc",
      "confidence": 0-100,
      "reason": "One clear sentence (max 15 words)"
    }
  ]
}
`;
  }

  validateResponse(response) {
    if (!response.suggestions || response.suggestions.length !== 3) {
      throw new Error('Invalid response: must have 3 suggestions');
    }

    response.suggestions.forEach(s => {
      if (!s.chart_type || !s.confidence || !s.reason) {
        throw new Error('Invalid suggestion format');
      }
      if (s.confidence < 0 || s.confidence > 100) {
        throw new Error('Confidence must be 0-100');
      }
    });

    return response;
  }
}

const SYSTEM_PROMPT = `
You are an expert data visualization consultant specializing in business presentations.

Your task: Analyze datasets and suggest the 3 best chart types.

AVAILABLE CHART TYPES:
- column_clustered, column_stacked, column_stacked_100
- bar_clustered, bar_stacked, bar_stacked_100
- line, line_markers
- waterfall, mekko

RULES:
1. Always return exactly 3 suggestions
2. Order by confidence (highest first)
3. Reason must be specific and actionable (max 15 words)
4. Prefer simpler charts when appropriate
5. Consider: time series → line, comparison → column, part-to-whole → stacked

RESPOND ONLY WITH VALID JSON.
`;

module.exports = GeminiClient;
```

**Referências:**
- SDK: `googleapis/js-genai` (oficial)
- Prompts: `GoogleCloudPlatform/generative-ai/gemini/prompts`

**Validação (GATE 2.1):**
- ✅ Cliente inicializa sem erros
- ✅ Chamada à API retorna JSON válido
- ✅ Validação de response funciona
- ✅ Error handling robusto

---

### 🧮 2.2 Heuristics Engine (Fallback)

**Tarefas (Dia 10-11):**
```javascript
// cloud-functions/analyze-data/heuristics.js
class HeuristicsEngine {
  analyze(data, headers, types) {
    const patterns = this.detectPatterns(data, headers, types);

    // Se confiança > 80%, retorna sem chamar IA
    if (patterns.confidence > 80) {
      return {
        suggestions: patterns.suggestions,
        source: 'heuristics',
        confidence: patterns.confidence
      };
    }

    return null; // Deixa IA decidir
  }

  detectPatterns(data, headers, types) {
    const rules = [
      this.detectTimeSeries(data, headers, types),
      this.detectComparison(data, headers, types),
      this.detectPartToWhole(data, headers, types),
      this.detectBridge(data, headers, types)
    ];

    // Pega a regra com maior confiança
    const best = rules.sort((a, b) => b.confidence - a.confidence)[0];

    return best;
  }

  detectTimeSeries(data, headers, types) {
    // Detecta se primeira coluna é temporal
    const firstColType = types[0];
    const hasDateOrPeriod = firstColType === 'date' ||
      headers[0].match(/quarter|month|year|date/i);

    if (hasDateOrPeriod) {
      return {
        confidence: 90,
        suggestions: [
          {
            chart_type: 'line',
            confidence: 90,
            reason: 'Temporal data best shown with line chart'
          },
          {
            chart_type: 'column_clustered',
            confidence: 70,
            reason: 'Alternative for period comparison'
          },
          {
            chart_type: 'line_markers',
            confidence: 60,
            reason: 'Emphasize data points'
          }
        ]
      };
    }

    return { confidence: 0, suggestions: [] };
  }

  detectComparison(data, headers, types) {
    // Single series numérico → Column chart
    const numericCols = Object.values(types).filter(t => t === 'number').length;

    if (numericCols === 1 && data.length <= 10) {
      return {
        confidence: 85,
        suggestions: [
          {
            chart_type: 'column_clustered',
            confidence: 85,
            reason: 'Single series comparison'
          },
          {
            chart_type: 'bar_clustered',
            confidence: 75,
            reason: 'Horizontal alternative for long labels'
          },
          {
            chart_type: 'line',
            confidence: 50,
            reason: 'If trend matters'
          }
        ]
      };
    }

    return { confidence: 0, suggestions: [] };
  }

  detectPartToWhole(data, headers, types) {
    // Detecta se soma = 100% (ou próximo)
    const numericCols = Object.keys(types).filter(k => types[k] === 'number');

    if (numericCols.length === 1) {
      const values = data.map(row => row[numericCols[0]]);
      const sum = values.reduce((a, b) => a + b, 0);

      if (Math.abs(sum - 100) < 5) {
        return {
          confidence: 95,
          suggestions: [
            {
              chart_type: 'column_stacked_100',
              confidence: 95,
              reason: 'Values sum to 100%, shows composition'
            },
            {
              chart_type: 'bar_stacked_100',
              confidence: 85,
              reason: 'Horizontal alternative'
            },
            {
              chart_type: 'column_stacked',
              confidence: 70,
              reason: 'If absolute values matter'
            }
          ]
        };
      }
    }

    return { confidence: 0, suggestions: [] };
  }

  detectBridge(data, headers, types) {
    // Detecta waterfall pattern: inicial + variações + final
    if (data.length >= 3 && data.length <= 10) {
      const firstRow = data[0];
      const lastRow = data[data.length - 1];

      const hasStartEnd =
        headers[0].match(/initial|start|begin/i) &&
        headers[headers.length - 1].match(/final|end|total/i);

      if (hasStartEnd) {
        return {
          confidence: 92,
          suggestions: [
            {
              chart_type: 'waterfall',
              confidence: 92,
              reason: 'Shows value bridge from start to end'
            },
            {
              chart_type: 'column_clustered',
              confidence: 60,
              reason: 'Alternative simple comparison'
            },
            {
              chart_type: 'line',
              confidence: 50,
              reason: 'If progression matters'
            }
          ]
        };
      }
    }

    return { confidence: 0, suggestions: [] };
  }
}

module.exports = HeuristicsEngine;
```

**Validação (GATE 2.2):**
- ✅ 5 regras implementadas
- ✅ Time series detectado corretamente
- ✅ Comparison detectado corretamente
- ✅ Part-to-whole (100%) detectado
- ✅ Bridge/Waterfall detectado

---

### 🔗 2.3 Cloud Function Integration

**Tarefas (Dia 11-12):**
```javascript
// cloud-functions/analyze-data/index.js
const functions = require('@google-cloud/functions-framework');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const GeminiClient = require('./gemini-client');
const HeuristicsEngine = require('./heuristics');

const secretClient = new SecretManagerServiceClient();
const heuristics = new HeuristicsEngine();

functions.http('analyzeData', async (req, res) => {
  // CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  try {
    const { data, headers, types } = req.body;

    // Validação de input
    if (!data || !headers || data.length === 0) {
      return res.status(400).json({
        error: 'Invalid input: data and headers required'
      });
    }

    // Sampling se > 100 linhas
    const sampledData = data.length > 100
      ? data.slice(0, 100)
      : data;

    console.log('Analyzing data:', {
      rows: data.length,
      cols: headers.length
    });

    // 1. Tentar heuristics primeiro
    const heuristicResult = heuristics.analyze(sampledData, headers, types);

    if (heuristicResult && heuristicResult.confidence > 80) {
      console.log('Using heuristics (confidence:', heuristicResult.confidence, ')');
      return res.json({
        suggestions: heuristicResult.suggestions,
        metadata: {
          source: 'heuristics',
          processing_time_ms: 10
        }
      });
    }

    // 2. Chamar Gemini API
    console.log('Heuristics inconclusive, calling Gemini API');

    const apiKey = await getSecret('gemini-api-key');
    const gemini = new GeminiClient(apiKey);

    const startTime = Date.now();
    const aiResult = await gemini.analyzeData(sampledData, headers, types);
    const processingTime = Date.now() - startTime;

    console.log('Gemini response:', aiResult);

    return res.json({
      suggestions: aiResult.suggestions,
      metadata: {
        source: 'gemini',
        processing_time_ms: processingTime,
        model: 'gemini-2.0-flash'
      }
    });

  } catch (error) {
    console.error('Error analyzing data:', error);

    // Fallback final: Column chart padrão
    return res.json({
      suggestions: [
        {
          chart_type: 'column_clustered',
          confidence: 50,
          reason: 'Default suggestion (error in analysis)'
        },
        {
          chart_type: 'bar_clustered',
          confidence: 40,
          reason: 'Alternative comparison chart'
        },
        {
          chart_type: 'line',
          confidence: 30,
          reason: 'If trend is important'
        }
      ],
      metadata: {
        source: 'fallback',
        error: error.message
      }
    });
  }
});

async function getSecret(name) {
  const [version] = await secretClient.accessSecretVersion({
    name: `projects/${process.env.GCP_PROJECT}/secrets/${name}/versions/latest`
  });

  return version.payload.data.toString();
}
```

**Validação (GATE 2.3):**
- ✅ Endpoint responde em < 3s (p95)
- ✅ Heuristics funciona (60% dos casos)
- ✅ Gemini API funciona (40% dos casos)
- ✅ Fallback nunca falha (sempre retorna 3 sugestões)
- ✅ CORS configurado

---

### 🎨 2.4 Frontend: Suggestion Cards

**Tarefas (Dia 12-13):**
```html
<!-- Sidebar.html - Seção de sugestões -->
<section id="ai-suggestions" style="display:none">
  <h3>🤖 AI Suggestions</h3>
  <div id="suggestions-loading" class="loading">
    <div class="spinner"></div>
    <p>Analyzing your data...</p>
  </div>

  <div id="suggestions-cards"></div>

  <button id="browse-all-charts" class="secondary">
    📚 Browse All Chart Types
  </button>
</section>
```

```javascript
// Client.js.html
async function analyzeData() {
  const data = getCurrentData(); // from data input
  const headers = getHeaders();
  const types = getColumnTypes();

  showLoading();

  try {
    const response = await fetch('https://us-central1-PROJECT.cloudfunctions.net/analyzeData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, headers, types })
    });

    const result = await response.json();

    hideLoading();
    renderSuggestions(result.suggestions);

    // Analytics
    logEvent('ai_suggestions_received', {
      source: result.metadata.source,
      processing_time: result.metadata.processing_time_ms
    });

  } catch (error) {
    hideLoading();
    showError('Failed to analyze data. Please try manual selection.');
  }
}

function renderSuggestions(suggestions) {
  const container = document.getElementById('suggestions-cards');
  container.innerHTML = '';

  suggestions.forEach((suggestion, index) => {
    const card = document.createElement('div');
    card.className = 'suggestion-card';
    if (index === 0) card.classList.add('best-match');

    card.innerHTML = `
      <div class="chart-icon">${getChartIcon(suggestion.chart_type)}</div>
      <div class="chart-info">
        <h4>${formatChartName(suggestion.chart_type)}</h4>
        <div class="confidence">
          <span class="badge">${suggestion.confidence}% match</span>
        </div>
        <p class="reason">${suggestion.reason}</p>
      </div>
      <button class="select-chart" data-type="${suggestion.chart_type}">
        Select This Chart
      </button>
    `;

    container.appendChild(card);
  });

  // Event listeners
  document.querySelectorAll('.select-chart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const chartType = e.target.dataset.type;
      selectChart(chartType);
    });
  });
}

function getChartIcon(type) {
  const icons = {
    'column_clustered': '📊',
    'bar_clustered': '📈',
    'line': '📉',
    'waterfall': '🌊',
    'mekko': '🎯'
  };
  return icons[type] || '📊';
}
```

**Validação (GATE 2.4):**
- ✅ Loading state aparece durante análise
- ✅ 3 cards renderizados corretamente
- ✅ Confiança (%) exibida
- ✅ Razão legível (max 15 palavras)
- ✅ Click em "Select" funciona

---

### ✅ GATE 3: IA Retornando Sugestões

**Checklist Obrigatória:**

```
Backend (Cloud Functions):
[ ] Heuristics detecta 5 padrões
[ ] Gemini API integrado
[ ] Response sempre válido (3 sugestões)
[ ] Latência p95 < 3s
[ ] Error handling robusto
[ ] Fallback nunca falha

Frontend (Sidebar):
[ ] Loading state durante análise
[ ] 3 cards renderizados
[ ] Confiança (%) visível
[ ] Razão clara e concisa
[ ] "Select" button funciona

Testes End-to-End:
[ ] Dataset temporal → Line chart sugerido
[ ] Dataset comparação → Column chart sugerido
[ ] Dataset soma=100% → Stacked 100% sugerido
[ ] Dataset bridge → Waterfall sugerido
[ ] IA offline → Fallback funciona
```

**Testes Automatizados:**
```javascript
// test/ai-integration.test.js
describe('AI Integration', () => {
  test('heuristics detects time series', () => {
    const data = [['Q1', 100], ['Q2', 150]];
    const headers = ['Quarter', 'Revenue'];
    const types = { 0: 'string', 1: 'number' };

    const result = heuristics.analyze(data, headers, types);
    expect(result.suggestions[0].chart_type).toBe('line');
  });

  test('gemini returns 3 suggestions', async () => {
    const gemini = new GeminiClient(API_KEY);
    const result = await gemini.analyzeData(mockData, mockHeaders, mockTypes);

    expect(result.suggestions).toHaveLength(3);
    expect(result.suggestions[0].confidence).toBeGreaterThan(0);
  });
});
```

**Performance Benchmark:**
```bash
# Testar latência
for i in {1..10}; do
  curl -X POST https://us-central1-PROJECT.cloudfunctions.net/analyzeData \
    -H "Content-Type: application/json" \
    -d @test-data.json \
    -w "Time: %{time_total}s\n"
done

# Resultado esperado: p95 < 3s
```

**Rollback Plan:**
- Se Gemini API falhar constantemente → usar só heuristics
- Se latência > 5s → implementar cache de prompts
- Branch `feature/ai-layer` merge só após testes 100%

**🎯 Critério de Sucesso:**
- 70% dos datasets retornam sugestão correta (#1)
- Latência < 3s em 95% dos casos
- Zero crashes (fallback sempre funciona)

---

## 🎨 FASE 3: Visualization Layer
**Duração:** 2 semanas (10 dias úteis)
**Objetivo:** Gerar e inserir 4 tipos de gráficos no slide

### 📊 3.1 Chart.js Setup & Simple Charts

**Tarefas (Dia 14-16):**
```javascript
// Code.gs - Chart generation usando Google Slides API
function insertColumnChart(data, config) {
  const presentation = SlidesApp.getActivePresentation();
  const slide = presentation.getSelection().getCurrentPage();

  if (!slide) {
    throw new Error('No slide selected');
  }

  // Calcular posição (centro do slide)
  const pageWidth = slide.getPageWidth();
  const pageHeight = slide.getPageHeight();
  const chartWidth = pageWidth * 0.7;
  const chartHeight = pageHeight * 0.6;
  const x = (pageWidth - chartWidth) / 2;
  const y = (pageHeight - chartHeight) / 2;

  // Criar DataTable para Chart
  const dataTable = Charts.newDataTable();

  // Headers
  data.headers.forEach(header => {
    dataTable.addColumn(
      isNumeric(data.rows[0][header]) ? Charts.ColumnType.NUMBER : Charts.ColumnType.STRING,
      header
    );
  });

  // Rows
  data.rows.forEach(row => {
    dataTable.addRow(row);
  });

  // Criar chart
  const chart = Charts.newColumnChart()
    .setDataTable(dataTable.build())
    .setTitle(config.title || 'Chart Title')
    .setColors(getColorPalette(config.colorPalette))
    .setLegendPosition(Charts.Position.RIGHT)
    .setOption('width', chartWidth)
    .setOption('height', chartHeight);

  if (config.showDataLabels) {
    chart.setOption('dataLabels', 'value');
  }

  // Converter para imagem e inserir
  const chartBlob = chart.build().getAs('image/png');
  const image = slide.insertImage(chartBlob, x, y, chartWidth, chartHeight);

  // Metadata (para editar depois)
  image.setTitle(config.chartType);
  image.setDescription(JSON.stringify({
    type: config.chartType,
    data: data,
    config: config
  }));

  return {
    success: true,
    imageId: image.getObjectId()
  };
}

function getColorPalette(palette) {
  const palettes = {
    'professional': ['#4285F4', '#34A853', '#FBBC04', '#EA4335'],
    'consulting': ['#5F6368', '#80868B', '#9AA0A6', '#BDC1C6'],
    'corporate': ['#0F9D58', '#F4B400', '#DB4437', '#4285F4']
  };

  return palettes[palette] || palettes['professional'];
}

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}
```

**Implementar 3 variantes:**
- Column Clustered
- Column Stacked
- Column Stacked 100%

**Referências:**
- Chart.js: Core library (para preview no sidebar)
- Google Charts: Para gerar gráficos no Apps Script
- `apps-script-samples/slides/api/Snippets.gs`

**Validação (GATE 3.1):**
- ✅ Column chart inserido no slide
- ✅ Cores aplicadas (paleta profissional)
- ✅ Título editável
- ✅ Data labels opcionais
- ✅ Posicionado no centro

---

### 📈 3.2 Bar & Line Charts

**Tarefas (Dia 16-18):**
```javascript
// Code.gs
function insertBarChart(data, config) {
  // Similar ao Column, mas horizontal
  const chart = Charts.newBarChart()
    .setDataTable(dataTable.build())
    .setTitle(config.title)
    .setColors(getColorPalette(config.colorPalette))
    .setStacked(config.stacked || false);

  // ... resto igual ao Column
}

function insertLineChart(data, config) {
  const chart = Charts.newLineChart()
    .setDataTable(dataTable.build())
    .setTitle(config.title)
    .setColors(getColorPalette(config.colorPalette))
    .setCurveStyle(Charts.CurveStyle.SMOOTH)
    .setPointStyle(Charts.PointStyle.MEDIUM);

  if (config.showMarkers) {
    chart.setPointStyle(Charts.PointStyle.LARGE);
  }

  // ... resto igual
}
```

**Validação (GATE 3.2):**
- ✅ Bar chart (3 variantes) funciona
- ✅ Line chart (2 variantes) funciona
- ✅ Marcadores opcionais em Line
- ✅ Stacked bars funciona

---

### 🌊 3.3 Waterfall Chart (Custom)

**Tarefas (Dia 18-21):**
```javascript
// Code.gs - Waterfall precisa ser custom (shapes)
function insertWaterfallChart(data, config) {
  const slide = SlidesApp.getActivePresentation().getSelection().getCurrentPage();

  // Calcular valores acumulados
  const waterfall = calculateWaterfall(data);

  // Criar shapes (retângulos) para cada barra
  const shapes = [];
  const barWidth = 50;
  const spacing = 20;
  let xPos = 100;

  waterfall.forEach((item, i) => {
    const barHeight = Math.abs(item.value) * 2; // Scale
    const yPos = item.cumulative > 0
      ? 300 - (item.cumulative * 2)
      : 300;

    // Retângulo da barra
    const rect = slide.insertShape(
      SlidesApp.ShapeType.RECTANGLE,
      xPos, yPos, barWidth, barHeight
    );

    // Cor: verde (positivo), vermelho (negativo)
    const color = item.value >= 0 ? '#34A853' : '#EA4335';
    rect.getFill().setSolidFill(color);
    rect.getBorder().setTransparent();

    // Label do valor
    if (config.showDataLabels) {
      const label = slide.insertTextBox(
        item.value > 0 ? `+${item.value}` : item.value,
        xPos, yPos - 20, barWidth, 15
      );
      label.getText().getTextStyle().setFontSize(10);
    }

    // Conector (linha pontilhada)
    if (i < waterfall.length - 1) {
      const connector = slide.insertLine(
        SlidesApp.LineCategory.STRAIGHT,
        xPos + barWidth, yPos,
        xPos + barWidth + spacing, waterfall[i + 1].cumulative * 2
      );
      connector.setDashStyle(SlidesApp.DashStyle.DASH);
    }

    shapes.push(rect);
    xPos += barWidth + spacing;
  });

  // Agrupar todos os shapes
  const group = slide.group(shapes);
  group.setTitle('Waterfall Chart');

  return { success: true, groupId: group.getObjectId() };
}

function calculateWaterfall(data) {
  let cumulative = 0;

  return data.rows.map(row => {
    const value = row[1]; // Assumindo segunda coluna é o valor
    const start = cumulative;
    cumulative += value;

    return {
      label: row[0],
      value: value,
      start: start,
      cumulative: cumulative
    };
  });
}
```

**Referências:**
- Plugin: `everestate/chartjs-plugin-waterfall`
- Lógica de cálculo: Bridge chart pattern

**Validação (GATE 3.3):**
- ✅ Waterfall renderizado corretamente
- ✅ Cores: verde (positivo), vermelho (negativo)
- ✅ Conectores (linhas) entre barras
- ✅ Labels de valores
- ✅ Grouped como um objeto único

---

### 📚 3.4 Chart Library UI

**Tarefas (Dia 21-23):**
```html
<!-- Sidebar.html - Chart library -->
<section id="chart-library" style="display:none">
  <h3>📚 All Chart Types</h3>

  <div class="chart-grid">
    <div class="chart-type" data-type="column_clustered">
      <div class="chart-icon">📊</div>
      <span>Clustered Column</span>
    </div>

    <div class="chart-type" data-type="column_stacked">
      <div class="chart-icon">📊</div>
      <span>Stacked Column</span>
    </div>

    <div class="chart-type" data-type="column_stacked_100">
      <div class="chart-icon">📊</div>
      <span>100% Stacked Column</span>
    </div>

    <div class="chart-type popular" data-type="bar_clustered">
      <div class="chart-icon">📈</div>
      <span>Clustered Bar</span>
      <span class="badge">Popular</span>
    </div>

    <!-- ... outros 4 tipos ... -->
  </div>
</section>

<style>
.chart-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.chart-type {
  border: 1px solid #DADCE0;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.chart-type:hover {
  border-color: #4285F4;
  background: #F8F9FA;
}

.chart-type.selected {
  border-color: #4285F4;
  background: #E8F0FE;
}

.chart-type.popular::after {
  content: '⭐';
  position: absolute;
  top: 8px;
  right: 8px;
}

.chart-icon {
  font-size: 32px;
  margin-bottom: 8px;
}
</style>
```

**Validação (GATE 3.4):**
- ✅ Grid 2x5 renderizado
- ✅ 8 tipos de gráficos exibidos
- ✅ Hover effect funciona
- ✅ Seleção visual (border azul)
- ✅ Tag "Popular" nos 3 mais usados

---

### ✅ GATE 4: 4 Tipos de Gráficos Funcionando

**Checklist Obrigatória:**

```
Chart Generation:
[ ] Column (3 variantes) insere corretamente
[ ] Bar (3 variantes) insere corretamente
[ ] Line (2 variantes) insere corretamente
[ ] Waterfall insere corretamente
[ ] Todos posicionados no centro do slide
[ ] Cores aplicadas (3 paletas)

UI/UX:
[ ] Chart library mostra 8 tipos
[ ] Seleção visual funciona
[ ] Preview thumbnail (opcional)
[ ] Loading state durante geração

Qualidade Visual:
[ ] Fontes consistentes (Google Sans/Arial)
[ ] Data labels legíveis
[ ] Legend posicionada corretamente
[ ] Grid lines sutis

Testes End-to-End:
[ ] Selecionar Column → insere em < 2s
[ ] Selecionar Waterfall → insere em < 3s
[ ] Dados com caracteres especiais → funciona
[ ] Dataset com 100 linhas → funciona
[ ] Gráfico é editável (mover/redimensionar)
```

**Testes de Regressão:**
```javascript
// test/chart-generation.test.js
describe('Chart Generation', () => {
  test('column chart renders correctly', () => {
    const result = insertColumnChart(mockData, mockConfig);
    expect(result.success).toBe(true);
    expect(result.imageId).toBeDefined();
  });

  test('waterfall calculates cumulative correctly', () => {
    const data = [[100], [-20], [30]];
    const waterfall = calculateWaterfall(data);
    expect(waterfall[0].cumulative).toBe(100);
    expect(waterfall[1].cumulative).toBe(80);
    expect(waterfall[2].cumulative).toBe(110);
  });
});
```

**Performance Test:**
```javascript
// Medir tempo de geração
console.time('chart-generation');
insertColumnChart(largeDataset, config);
console.timeEnd('chart-generation');
// Expectativa: < 2s para 100 linhas
```

**Rollback Plan:**
- Se Waterfall falhar → mostrar mensagem "Coming soon"
- Se geração > 5s → adicionar timeout e fallback
- Versionamento de cada tipo de gráfico (v1.0.0)

**🎯 Critério de Sucesso:**
- 4 tipos (Column, Bar, Line, Waterfall) funcionam 100%
- Latência < 2s para inserir gráfico
- Visual profissional (indistinguível de manual)

---

## 🎨 FASE 4: Enhancement Layer
**Duração:** 1 semana (5 dias úteis)
**Objetivo:** Customização + polish + UX final

### 🎨 4.1 Customization Panel

**Tarefas (Dia 24-25):**
```html
<!-- Sidebar.html - Customization section -->
<section id="customization" class="collapsible collapsed">
  <h3 onclick="toggleCollapse(this)">
    ⚙️ Customize
    <span class="arrow">▼</span>
  </h3>

  <div class="content">
    <div class="form-group">
      <label>Color Palette</label>
      <div class="palette-selector">
        <div class="palette active" data-palette="professional">
          <div class="color-preview">
            <span style="background:#4285F4"></span>
            <span style="background:#34A853"></span>
            <span style="background:#FBBC04"></span>
          </div>
          <span>Professional</span>
        </div>

        <div class="palette" data-palette="consulting">
          <div class="color-preview">
            <span style="background:#5F6368"></span>
            <span style="background:#80868B"></span>
            <span style="background:#9AA0A6"></span>
          </div>
          <span>Consulting</span>
        </div>

        <div class="palette" data-palette="corporate">
          <div class="color-preview">
            <span style="background:#0F9D58"></span>
            <span style="background:#F4B400"></span>
            <span style="background:#DB4437"></span>
          </div>
          <span>Corporate</span>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="chart-title">Chart Title</label>
      <input type="text" id="chart-title" placeholder="Enter chart title...">
      <button id="suggest-title" class="icon-btn">💡 AI Suggest</button>
    </div>

    <div class="form-group">
      <label>
        <input type="checkbox" id="show-labels" checked>
        Show data labels
      </label>
    </div>

    <div class="form-group">
      <label for="legend-position">Legend Position</label>
      <select id="legend-position">
        <option value="right" selected>Right</option>
        <option value="bottom">Bottom</option>
        <option value="none">None</option>
      </select>
    </div>
  </div>
</section>

<script>
function toggleCollapse(header) {
  const section = header.parentElement;
  section.classList.toggle('collapsed');

  const arrow = header.querySelector('.arrow');
  arrow.textContent = section.classList.contains('collapsed') ? '▼' : '▲';
}
</script>
```

**Validação (GATE 4.1):**
- ✅ Painel abre/fecha (collapsible)
- ✅ 3 paletas de cores selecionáveis
- ✅ Título editável
- ✅ Data labels toggle
- ✅ Legend position dropdown

---

### 💡 4.2 AI Title Suggestion

**Tarefas (Dia 25-26):**
```javascript
// cloud-functions/suggest-title/index.js
const functions = require('@google-cloud/functions-framework');
const { GoogleGenerativeAI } = require('@google/genai');

functions.http('suggestTitle', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const { data_summary, chart_type } = req.body;

  const apiKey = await getSecret('gemini-api-key');
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 50
    }
  });

  const prompt = `
Based on this data and chart type, suggest a clear, action-oriented title:

DATA CONTEXT: ${data_summary}
CHART TYPE: ${chart_type}

RESPOND WITH:
A single title (max 8 words) that clearly states the insight or comparison shown.

Examples:
- "Revenue Grew 45% Year-over-Year"
- "EMEA Leads in Market Share"
- "Cost Reduction Drove Margin Expansion"

TITLE:
`;

  try {
    const result = await model.generateContent(prompt);
    const title = result.response.text().trim().replace(/['"]/g, '');

    res.json({ title });
  } catch (error) {
    // Fallback: generic title
    res.json({ title: `${chart_type.replace('_', ' ')} Chart` });
  }
});
```

```javascript
// Client.js.html - Frontend
document.getElementById('suggest-title').addEventListener('click', async () => {
  const data = getCurrentData();
  const chartType = getSelectedChartType();

  // Summary dos dados
  const summary = `${data.rows.length} rows, ${data.headers.join(', ')}`;

  showLoading('Suggesting title...');

  const response = await fetch('https://.../suggest-title', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data_summary: summary,
      chart_type: chartType
    })
  });

  const result = await response.json();

  document.getElementById('chart-title').value = result.title;
  hideLoading();
});
```

**Validação (GATE 4.2):**
- ✅ Click em "💡 AI Suggest" chama API
- ✅ Título gerado em < 2s
- ✅ Título aplicado no input
- ✅ Fallback se IA falhar

---

### ✨ 4.3 Preview & Polish

**Tarefas (Dia 26-28):**
```html
<!-- Preview thumbnail -->
<section id="chart-preview">
  <h3>Preview</h3>
  <canvas id="preview-canvas" width="300" height="200"></canvas>
</section>

<script>
// Usar Chart.js para preview rápido
function updatePreview() {
  const config = getCurrentConfig();
  const data = getCurrentData();

  const ctx = document.getElementById('preview-canvas').getContext('2d');

  // Destruir chart anterior
  if (window.previewChart) {
    window.previewChart.destroy();
  }

  // Criar novo chart
  window.previewChart = new Chart(ctx, {
    type: config.chartType.split('_')[0], // 'column' | 'bar' | 'line'
    data: {
      labels: data.headers,
      datasets: [{
        data: data.rows[0],
        backgroundColor: getColorPalette(config.colorPalette)
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: { position: config.legendPosition },
        title: { display: true, text: config.title }
      }
    }
  });
}

// Debounce para performance
const debouncedUpdate = debounce(updatePreview, 300);

document.getElementById('chart-title').addEventListener('input', debouncedUpdate);
document.querySelectorAll('.palette').forEach(p => {
  p.addEventListener('click', debouncedUpdate);
});
</script>
```

**Polimento UX:**
- Animações suaves (CSS transitions)
- Loading skeletons
- Error messages claros
- Success feedback ao inserir gráfico

**Validação (GATE 4.3):**
- ✅ Preview atualiza em tempo real
- ✅ Debounce funciona (não trava)
- ✅ Animações suaves
- ✅ Feedback visual em todas as ações

---

### 🎓 4.4 Onboarding (First-time User)

**Tarefas (Dia 28):**
```javascript
// Code.gs - Check first time user
function onOpen() {
  const ui = SlidesApp.getUi();
  ui.createMenu('Smart Chart Co-Pilot')
    .addItem('Open', 'showSidebar')
    .addToUi();

  // Check first time
  const userProperties = PropertiesService.getUserProperties();
  const hasUsedBefore = userProperties.getProperty('has_used');

  if (!hasUsedBefore) {
    // Show onboarding modal
    const html = HtmlService.createHtmlOutputFromFile('Onboarding')
      .setWidth(400)
      .setHeight(300);
    ui.showModalDialog(html, 'Welcome to Smart Chart Co-Pilot!');

    userProperties.setProperty('has_used', 'true');
  }
}
```

```html
<!-- Onboarding.html -->
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Google Sans', Arial; padding: 20px; }
    h2 { color: #4285F4; }
    .step { margin: 16px 0; }
    .step-number {
      display: inline-block;
      width: 24px;
      height: 24px;
      background: #4285F4;
      color: white;
      border-radius: 50%;
      text-align: center;
      margin-right: 8px;
    }
    button {
      background: #4285F4;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h2>📊 Welcome to Smart Chart Co-Pilot!</h2>

  <div class="step">
    <span class="step-number">1</span>
    <strong>Input your data</strong> - Import from Sheets or paste manually
  </div>

  <div class="step">
    <span class="step-number">2</span>
    <strong>Get AI suggestions</strong> - We analyze and suggest best charts
  </div>

  <div class="step">
    <span class="step-number">3</span>
    <strong>Insert chart</strong> - One click to add to your slide
  </div>

  <button onclick="google.script.host.close()">Got it, let's start!</button>
</body>
</html>
```

**Validação (GATE 4.4):**
- ✅ Modal aparece na primeira vez
- ✅ Não aparece novamente depois
- ✅ 3 passos claros
- ✅ "Got it" fecha modal

---

### ✅ GATE 5: Customização Completa

**Checklist Obrigatória:**

```
Customization:
[ ] 3 paletas de cores funcionam
[ ] Título editável (aplica no gráfico)
[ ] AI title suggestion em < 2s
[ ] Data labels toggle funciona
[ ] Legend position funciona

Preview:
[ ] Preview renderizado com Chart.js
[ ] Atualiza em tempo real (debounced)
[ ] Responsivo (300x200px)

UX/Polish:
[ ] Animações suaves (transitions)
[ ] Loading states em todas as ações
[ ] Error messages claros
[ ] Success feedback ao inserir

Onboarding:
[ ] Modal aparece primeira vez
[ ] UserProperties salva estado
[ ] 3 passos claros
[ ] Skippable

Testes End-to-End:
[ ] Mudar paleta → preview atualiza
[ ] AI suggest title → aplica corretamente
[ ] Customizar tudo → insere com config
[ ] Primeiro uso → onboarding aparece
```

**Testes de Usabilidade:**
```
Teste com 3 usuários (beta testers):
[ ] Conseguem inserir dados em < 30s
[ ] Entendem as sugestões da IA
[ ] Customização é intuitiva
[ ] Gráfico final ficou profissional
```

**🎯 Critério de Sucesso:**
- Customização funciona 100%
- Onboarding reduz tempo de setup em 50%
- Preview melhora confiança do usuário

---

## 🚢 FASE 5: Production Readiness
**Duração:** 1 semana (5 dias úteis)
**Objetivo:** Observabilidade, testes, segurança e deploy

### 📊 5.1 Analytics & Monitoring

**Tarefas (Dia 29-30):**
```javascript
// Code.gs - Google Analytics 4 integration
function initAnalytics() {
  const MEASUREMENT_ID = 'G-XXXXXXXXXX';
  const API_SECRET = getSecret('ga4-api-secret');

  return {
    trackEvent: function(eventName, params) {
      const payload = {
        client_id: Session.getActiveUser().getEmail(),
        events: [{
          name: eventName,
          params: {
            ...params,
            engagement_time_msec: 100
          }
        }]
      };

      UrlFetchApp.fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
        {
          method: 'POST',
          contentType: 'application/json',
          payload: JSON.stringify(payload)
        }
      );
    }
  };
}

// Eventos principais
const analytics = initAnalytics();

function onDataImported(source, rows) {
  analytics.trackEvent('data_imported', {
    source: source, // 'sheets' | 'manual'
    rows: rows,
    timestamp: new Date().toISOString()
  });
}

function onChartGenerated(type, customization) {
  analytics.trackEvent('chart_generated', {
    chart_type: type,
    color_palette: customization.colorPalette,
    has_custom_title: customization.title !== '',
    ai_suggested: customization.aiSuggested || false
  });
}

function onAISuggestionAccepted(position) {
  analytics.trackEvent('ai_suggestion_accepted', {
    position: position, // 1, 2, ou 3
    timestamp: new Date().toISOString()
  });
}
```

**Cloud Functions Logging:**
```javascript
// cloud-functions/analyze-data/index.js
const { Logging } = require('@google-cloud/logging');
const logging = new Logging();
const log = logging.log('chart-copilot');

functions.http('analyzeData', async (req, res) => {
  const startTime = Date.now();

  // Log entrada
  await log.write(log.entry({
    severity: 'INFO',
    resource: { type: 'cloud_function' },
    jsonPayload: {
      event: 'analyze_data_start',
      rows: req.body.data.length,
      cols: req.body.headers.length
    }
  }));

  try {
    const result = await analyzeData(req.body);
    const duration = Date.now() - startTime;

    // Log sucesso
    await log.write(log.entry({
      severity: 'INFO',
      jsonPayload: {
        event: 'analyze_data_success',
        source: result.metadata.source,
        duration_ms: duration,
        top_suggestion: result.suggestions[0].chart_type
      }
    }));

    res.json(result);
  } catch (error) {
    // Log erro
    await log.write(log.entry({
      severity: 'ERROR',
      jsonPayload: {
        event: 'analyze_data_error',
        error: error.message,
        stack: error.stack
      }
    }));

    res.status(500).json({ error: error.message });
  }
});
```

**Validação (GATE 5.1):**
- ✅ GA4 configurado e recebendo eventos
- ✅ 8 eventos principais implementados
- ✅ Cloud Logging captura INFO e ERROR
- ✅ Dashboards no Cloud Monitoring

---

### 🧪 5.2 Automated Testing

**Tarefas (Dia 30-31):**
```javascript
// test/integration.test.js (Jest)
describe('End-to-End Integration', () => {
  let testData;

  beforeEach(() => {
    testData = {
      data: [['Q1', 100], ['Q2', 150], ['Q3', 120]],
      headers: ['Quarter', 'Revenue'],
      types: { 0: 'string', 1: 'number' }
    };
  });

  test('full flow: data import → AI → chart generation', async () => {
    // 1. Simulate data import
    const importResult = importData(testData);
    expect(importResult.valid).toBe(true);

    // 2. Call AI analysis
    const aiResult = await analyzeData(testData);
    expect(aiResult.suggestions).toHaveLength(3);
    expect(aiResult.suggestions[0].chart_type).toBe('line'); // Time series

    // 3. Generate chart
    const chartResult = generateChart(aiResult.suggestions[0], testData);
    expect(chartResult.success).toBe(true);
  });

  test('handles errors gracefully', async () => {
    const invalidData = { data: [], headers: [] };

    const result = await analyzeData(invalidData);
    expect(result.error).toBeDefined();
    expect(result.suggestions).toHaveLength(3); // Fallback
  });

  test('performance: AI response < 3s', async () => {
    const start = Date.now();
    await analyzeData(testData);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(3000);
  });
});
```

**CI/CD Pipeline (GitHub Actions):**
```yaml
# .github/workflows/test-and-deploy.yml
name: Test & Deploy

on:
  push:
    branches: [develop, staging, main]
  pull_request:
    branches: [develop, staging, main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          cd cloud-functions/analyze-data
          npm ci

      - name: Run unit tests
        run: npm test

      - name: Run integration tests
        run: npm run test:integration
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}

      - name: Check code coverage
        run: npm run coverage
        # Fail if coverage < 80%

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/staging'
    runs-on: ubuntu-latest
    steps:
      - uses: google-github-actions/auth@v1
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}

      - name: Deploy to staging
        run: |
          gcloud functions deploy analyze-data \
            --region us-central1 \
            --runtime nodejs20 \
            --trigger-http \
            --allow-unauthenticated \
            --set-env-vars ENV=staging

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: google-github-actions/auth@v1
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}

      - name: Deploy to production
        run: |
          gcloud functions deploy analyze-data \
            --region us-central1 \
            --runtime nodejs20 \
            --trigger-http \
            --allow-unauthenticated \
            --set-env-vars ENV=production
```

**Validação (GATE 5.2):**
- ✅ 20+ testes automatizados
- ✅ Code coverage > 80%
- ✅ CI/CD pipeline funcionando
- ✅ Deploy automático (staging + prod)

---

### 🔒 5.3 Security Audit

**Tarefas (Dia 31-32):**
```bash
# Security checklist

# 1. OAuth Scopes - Princípio do menor privilégio
[ ] Remover scopes desnecessários
[ ] Usar .currentonly quando possível
[ ] Documentar cada scope no README

# 2. API Keys & Secrets
[ ] Nunca commitar .env
[ ] Usar Secret Manager para produção
[ ] Rotacionar Gemini API key mensalmente

# 3. Input Validation
[ ] Sanitizar todos os inputs do usuário
[ ] Validar tipos de dados
[ ] Limitar tamanho de datasets (max 1000 linhas)

# 4. Rate Limiting
[ ] Cloud Functions: 60 req/min/user
[ ] Gemini API: 50 req/min (tier 1)
[ ] Implementar exponential backoff

# 5. Data Privacy
[ ] Não armazenar dados do usuário
[ ] Logs anonimizados (hash de emails)
[ ] GDPR compliance (dados temporários)
```

```javascript
// Code.gs - Input sanitization
function sanitizeInput(value) {
  if (typeof value === 'string') {
    // Remove scripts
    return value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .substring(0, 1000); // Max 1000 chars
  }
  return value;
}

function validateDataset(data) {
  if (!Array.isArray(data)) {
    throw new Error('Data must be an array');
  }

  if (data.length > 1000) {
    throw new Error('Dataset too large (max 1000 rows)');
  }

  // Sanitizar cada célula
  return data.map(row =>
    row.map(cell => sanitizeInput(cell))
  );
}
```

**Penetration Testing (básico):**
```bash
# Testar injeção
curl -X POST https://.../analyzeData \
  -H "Content-Type: application/json" \
  -d '{"data": [["<script>alert(1)</script>"]]}'

# Expectativa: Script removido ou escapado

# Testar rate limit
for i in {1..100}; do
  curl -X POST https://.../analyzeData &
done

# Expectativa: 429 Too Many Requests após 60 req/min
```

**Validação (GATE 5.3):**
- ✅ OAuth scopes mínimos
- ✅ Secrets no Secret Manager
- ✅ Input sanitization implementado
- ✅ Rate limiting funcionando
- ✅ Penetration test passou

---

### 📚 5.4 Documentation

**Tarefas (Dia 32-33):**
```markdown
# README.md (repositório)

## Smart Chart Co-Pilot - MVP

### Setup Local

1. Clone repo:
   ```bash
   git clone https://github.com/org/smart-chart-copilot
   cd smart-chart-copilot
   ```

2. Install dependencies:
   ```bash
   cd cloud-functions/analyze-data
   npm install
   ```

3. Configure .env:
   ```bash
   cp .env.example .env
   # Adicionar GEMINI_API_KEY
   ```

4. Run locally:
   ```bash
   npm start
   # Cloud Function em http://localhost:8080
   ```

5. Deploy Apps Script:
   ```bash
   cd gas-project
   clasp login
   clasp push
   clasp deploy
   ```

### Arquitetura

[Diagrama de arquitetura]

### API Endpoints

#### POST /analyzeData
Analisa dados e retorna 3 sugestões de gráficos.

**Request:**
```json
{
  "data": [["Q1", 100], ["Q2", 150]],
  "headers": ["Quarter", "Revenue"],
  "types": {"0": "string", "1": "number"}
}
```

**Response:**
```json
{
  "suggestions": [
    {
      "chart_type": "line",
      "confidence": 90,
      "reason": "Temporal data best shown with line chart"
    }
  ],
  "metadata": {
    "source": "heuristics",
    "processing_time_ms": 15
  }
}
```

### Troubleshooting

**Erro: "OAuth consent required"**
- Verificar scopes no appsscript.json
- Re-autorizar: Extensions > Smart Chart > Open

**Erro: "Gemini API quota exceeded"**
- Heuristics fallback ativado automaticamente
- Aguardar 1 minuto (rate limit)

### Contributing

1. Criar branch: `git checkout -b feature/nova-feature`
2. Fazer changes
3. Testar: `npm test`
4. PR para `develop`

---

# USER_GUIDE.md (para usuários finais)

## Como Usar o Smart Chart Co-Pilot

### 1. Abrir o Add-on

1. Abra sua apresentação no Google Slides
2. Menu: Extensions > Smart Chart Co-Pilot > Open
3. Sidebar abrirá à direita

### 2. Inserir Dados

**Opção A: Importar do Google Sheets**
1. Clique em "Select from Drive"
2. Escolha sua planilha
3. Digite o range (ex: Sheet1!A1:D10)
4. Clique "Import"

**Opção B: Colar Dados**
1. Tab "Manual Input"
2. Copie dados do Excel/Sheets
3. Cole no grid (Ctrl+V)
4. Headers detectados automaticamente

### 3. Escolher Gráfico

**IA Automática:**
- 3 sugestões aparecem automaticamente
- Clique em "Select This Chart" na melhor opção

**Manual:**
- Clique "Browse All Chart Types"
- Escolha entre 8 tipos disponíveis

### 4. Customizar (opcional)

1. Abra "Customize"
2. Escolha paleta de cores
3. Edite título (ou use "AI Suggest")
4. Configure labels e legenda

### 5. Inserir no Slide

1. Clique "Insert Chart into Slide"
2. Gráfico aparece no centro do slide
3. Mova/redimensione como qualquer imagem

### Dicas

💡 Datasets temporais (Q1, Q2, Jan, Fev) → IA sugere Line chart
💡 Valores que somam 100% → IA sugere Stacked 100%
💡 Variação inicial→final → IA sugere Waterfall
```

**Validação (GATE 5.4):**
- ✅ README.md completo (setup + API)
- ✅ USER_GUIDE.md para usuários finais
- ✅ Code comments inline (JSDoc)
- ✅ .env.example documentado

---

### ✅ GATE 6: Beta Launch Aprovado

**Checklist Obrigatória:**

```
Observabilidade:
[ ] Google Analytics 4 configurado
[ ] 8 eventos principais tracked
[ ] Cloud Logging capturando logs
[ ] Dashboard no Cloud Monitoring

Testes:
[ ] 20+ testes automatizados (Jest)
[ ] Code coverage > 80%
[ ] CI/CD pipeline funcionando
[ ] Deploy staging bem-sucedido

Segurança:
[ ] OAuth scopes mínimos
[ ] Input sanitization
[ ] Rate limiting ativo
[ ] Secrets no Secret Manager
[ ] Penetration test básico passou

Documentação:
[ ] README.md completo
[ ] USER_GUIDE.md para usuários
[ ] API docs (endpoints)
[ ] Troubleshooting guide

Performance:
[ ] Latência p95 < 3s (AI)
[ ] Latência p95 < 2s (chart generation)
[ ] Error rate < 2%
[ ] Uptime > 99% (staging, 1 semana)
```

**Beta Testers (50 early adopters):**
```bash
# Criar whitelist
[ ] Selecionar 50 emails (consultores, PMs, analistas)
[ ] Adicionar ao OAuth consent screen (Internal testing)
[ ] Enviar convite personalizado
```

**Email de Convite:**
```
Subject: You're invited to beta test Smart Chart Co-Pilot 🚀

Hi [Name],

You've been selected as an early adopter for Smart Chart Co-Pilot,
an AI-powered add-on that creates professional charts in Google Slides
with one click.

What you'll get:
✅ AI suggests the best chart type for your data
✅ 8 professional chart types (Column, Bar, Line, Waterfall, etc)
✅ One-click insertion into slides
✅ 100% free during beta

How to get started:
1. Install: [link]
2. Watch 2-min tutorial: [video]
3. Share feedback: [form]

We'd love your input to make this even better!

Thanks,
[Product Lead]
```

**🎯 Critério de Sucesso:**
- 50 beta testers instalaram add-on
- Staging estável por 1 semana (uptime > 99%)
- Todos os testes passando
- Documentação completa

---

## 🎉 FASE 6: Launch & Iteration
**Duração:** 2 semanas (10 dias úteis)
**Objetivo:** Lançamento público + feedback loop

### 🚀 6.1 Beta Launch (Semana 1)

**Tarefas (Dia 34-35):**
```bash
# Deploy production
[ ] Merge staging → main (PR com aprovação)
[ ] CI/CD deploya automaticamente para production
[ ] Verificar Cloud Functions em produção
[ ] Verificar Apps Script publicado

# Monitoring
[ ] Ativar alertas:
    - Error rate > 5% (15min) → Email
    - Latency p95 > 5s (30min) → Email
    - Custo diário > $20 → Email

# Comunicação
[ ] Enviar emails para 50 beta testers
[ ] Postar em LinkedIn (anúncio)
[ ] Criar landing page simples (opcional)
```

**Onboarding Guiado:**
```javascript
// Enhanced onboarding para beta
function showBetaOnboarding() {
  const html = HtmlService.createHtmlOutputFromFile('BetaOnboarding')
    .setWidth(500)
    .setHeight(400);

  SlidesApp.getUi().showModalDialog(html, '🎉 Welcome to Beta!');
}
```

```html
<!-- BetaOnboarding.html -->
<div class="beta-welcome">
  <h2>🎉 Welcome to Smart Chart Co-Pilot Beta!</h2>

  <p>You're one of 50 early adopters testing this AI-powered add-on.</p>

  <div class="quick-start">
    <h3>Quick Start (2 minutes)</h3>
    <ol>
      <li>📊 Import data (Google Sheets or paste)</li>
      <li>🤖 AI suggests 3 best charts</li>
      <li>✨ Customize and insert</li>
    </ol>
  </div>

  <div class="feedback">
    <h3>We Need Your Feedback!</h3>
    <p>Please share your experience after creating 3 charts:</p>
    <a href="https://forms.gle/xxx" target="_blank">
      <button>Give Feedback</button>
    </a>
  </div>

  <button onclick="startTutorial()">Show Me Around</button>
  <button onclick="google.script.host.close()">Skip, Let Me Try</button>
</div>
```

**Validação (GATE 6.1):**
- ✅ 50 beta testers ativos
- ✅ Pelo menos 100 charts gerados
- ✅ Error rate < 2%
- ✅ Feedback form com 20+ respostas

---

### 📊 6.2 Feedback Collection & Analysis

**Tarefas (Dia 36-38):**
```javascript
// Análise de métricas (Google Analytics)
const metrics = {
  // Adoção
  total_users: 50,
  active_users_7d: 35, // 70% retention
  charts_generated: 250,
  avg_charts_per_user: 5,

  // Engagement
  ai_suggestion_acceptance_rate: 68%, // 68% escolhem sugestão #1
  manual_selection_rate: 32%,
  customization_usage: 45%, // 45% customizam antes de inserir

  // Performance
  avg_ai_latency: 2.1s,
  avg_chart_generation: 1.8s,
  error_rate: 1.3%,

  // Chart Types (mais usados)
  top_charts: [
    { type: 'column_clustered', count: 85 },
    { type: 'waterfall', count: 52 },
    { type: 'line', count: 48 }
  ]
};

// Análise de feedback (form)
const feedback = [
  {
    user: 'user1@example.com',
    nps: 9,
    comment: 'AI suggestions are spot on! Saved me 30min per deck.',
    issues: 'Waterfall chart colors hard to customize'
  },
  {
    user: 'user2@example.com',
    nps: 8,
    comment: 'Love it! Would pay for this.',
    issues: 'Need more chart types (pie chart)'
  },
  // ... 18 more
];

// Calcular NPS
const nps_score = calculateNPS(feedback.map(f => f.nps));
console.log('NPS:', nps_score); // Target: > 40

// Issues comuns
const common_issues = groupByIssue(feedback);
/*
{
  'waterfall_colors': 5 mentions,
  'need_pie_chart': 8 mentions,
  'slow_with_large_data': 3 mentions
}
*/
```

**Decisões Baseadas em Feedback:**
```markdown
## Feedback → Action Items

### Top Issues (fix ASAP)
1. **Waterfall colors hard to customize** (5 mentions)
   → Add color picker for individual bars
   → ETA: 2 dias

2. **Need Pie chart** (8 mentions)
   → Add to roadmap (post-MVP)
   → Comunicar aos usuários

3. **Slow with large datasets** (3 mentions)
   → Optimize: sampling + parallel processing
   → ETA: 3 dias

### Nice-to-haves (roadmap)
- Multi-chart generation (6 mentions)
- Templates library (4 mentions)
- Export to PowerPoint (3 mentions)
```

**Validação (GATE 6.2):**
- ✅ 20+ feedback responses (40% response rate)
- ✅ NPS > 40
- ✅ Top 3 issues identificados
- ✅ Action items priorizados

---

### 🔧 6.3 Iteration Sprint

**Tarefas (Dia 38-40):**
```javascript
// Implementar top 3 fixes

// 1. Waterfall colors customization
function customizeWaterfallColors(barIndex, color) {
  const shapes = getWaterfallShapes();
  shapes[barIndex].getFill().setSolidFill(color);
}

// UI: Color picker para cada barra
<div class="waterfall-colors">
  <label>Positive bars:</label>
  <input type="color" value="#34A853">

  <label>Negative bars:</label>
  <input type="color" value="#EA4335">
</div>

// 2. Optimize performance (sampling)
function sampleLargeDataset(data, maxRows = 100) {
  if (data.length <= maxRows) return data;

  // Estratégia: primeiras 50 + últimas 50 + sample do meio
  const first50 = data.slice(0, 50);
  const last50 = data.slice(-50);
  const step = Math.floor(data.length / 50);
  const middle = data.filter((_, i) => i % step === 0).slice(0, 50);

  return [...first50, ...middle, ...last50];
}

// 3. Comunicação sobre Pie chart
function showPieChartTeaser() {
  showToast('📊 Pie chart coming soon! Vote for it in our roadmap.');
}
```

**Deploy de Hotfixes:**
```bash
# Branch de hotfix
git checkout -b hotfix/waterfall-colors
# Implementar fix
git commit -m "fix: add waterfall color customization"
git push origin hotfix/waterfall-colors

# Merge para main (fast-track)
git checkout main
git merge hotfix/waterfall-colors
git push

# CI/CD deploya automaticamente
# Validar em produção
```

**Validação (GATE 6.3):**
- ✅ Top 3 issues corrigidos
- ✅ Deploy de hotfix em produção
- ✅ Comunicação aos beta testers (changelog)
- ✅ Performance melhorada (latência -20%)

---

### 🌍 6.4 Public Launch Preparation

**Tarefas (Dia 41-43):**
```bash
# Google Workspace Marketplace listing

[ ] Criar listing no Marketplace
    - Nome: Smart Chart Co-Pilot
    - Tagline: "AI-powered charts for Google Slides"
    - Descrição longa (500 chars)
    - Screenshots (5 imagens)
    - Demo video (2min no YouTube)

[ ] Definir pricing
    - Free tier: 10 charts/mês
    - Pro: $19/mês (unlimited)

[ ] Compliance
    - Privacy policy (link)
    - Terms of service (link)
    - OAuth verification (Google review)

[ ] Marketing assets
    - Landing page (opcional)
    - Social media posts (LinkedIn, Twitter)
    - Product Hunt launch (opcional)
```

**Screenshots (5 imagens):**
1. Sidebar com data input
2. AI suggestions (3 cards)
3. Waterfall chart no slide
4. Customization panel
5. Final result (professional deck)

**Demo Video (script):**
```
[0:00-0:15] Problema
"Creating professional charts in Google Slides is time-consuming and requires design skills."

[0:15-0:30] Solução
"Smart Chart Co-Pilot uses AI to suggest the best chart type and creates it with one click."

[0:30-1:00] Demo
[Screen recording: Import data → AI suggests → Customize → Insert]

[1:00-1:30] Features
- 8 professional chart types
- AI-powered suggestions
- One-click insertion
- Customizable colors & styles

[1:30-2:00] CTA
"Try it free: Extensions > Get Add-ons > Search 'Smart Chart Co-Pilot'"
```

**Validação (GATE 6.4):**
- ✅ Marketplace listing completo
- ✅ Screenshots profissionais (5)
- ✅ Demo video publicado (YouTube)
- ✅ Privacy policy + ToS publicados
- ✅ Pricing definido

---

### 🎉 6.5 Public Launch

**Tarefas (Dia 43):**
```bash
# Launch day! 🚀

[ ] 9:00 AM - Publicar no Marketplace
    - Mudar de "unlisted" para "public"
    - Verificar listagem ao vivo

[ ] 10:00 AM - Comunicação
    - Email para beta testers (agradecimento)
    - Post no LinkedIn (anúncio)
    - Post no Twitter
    - Atualizar website (se houver)

[ ] 11:00 AM - Monitoring
    - Ativar alertas em tempo real
    - Monitorar dashboard (installs, errors)
    - Equipe em standby para suporte

[ ] Durante o dia
    - Responder comentários/dúvidas
    - Monitorar métricas de adoção
    - Ficar de olho em error rate

[ ] EOD - Retrospectiva
    - Revisar métricas do primeiro dia
    - Celebrar! 🎉
```

**Métricas de Sucesso (Primeiro Dia):**
```javascript
const launchMetrics = {
  installs: 120, // Target: 100+
  active_users: 85,
  charts_generated: 340,
  error_rate: 1.8%, // < 2%
  avg_latency: 2.3s, // < 3s
  marketplace_rating: 4.7, // Target: > 4.5
  support_tickets: 5 // Manageable
};
```

**Validação (GATE 6.5):**
- ✅ Publicado no Marketplace
- ✅ 100+ instalações (primeiro dia)
- ✅ Error rate < 2%
- ✅ Rating > 4.5 (primeiras reviews)
- ✅ Zero downtime

---

### ✅ GATE 7: Public Launch (Sucesso!)

**Checklist Final:**

```
Launch:
[ ] Marketplace público e ao vivo
[ ] 100+ instalações (dia 1)
[ ] Beta testers notificados
[ ] Social media posts publicados

Performance:
[ ] Error rate < 2%
[ ] Latency p95 < 3s
[ ] Uptime 99.9%
[ ] Zero incidentes críticos

Adoção:
[ ] 500+ charts gerados (semana 1)
[ ] 200+ usuários ativos (semana 1)
[ ] NPS > 40
[ ] Rating > 4.5 (Marketplace)

Suporte:
[ ] Support channel ativo (email/chat)
[ ] FAQ documentado
[ ] < 24h response time
```

**🎯 Critério de Sucesso Final:**
- Produto público e estável
- Adoção crescendo organicamente
- Feedback positivo (NPS > 40)
- Fundação para próximas features

---

## 📈 Pós-Launch (Semana 11+)

### Monitoramento Contínuo
```javascript
// Métricas semanais
const weeklyMetrics = {
  week_1: { mau: 200, charts: 1500, nps: 42 },
  week_2: { mau: 350, charts: 2800, nps: 45 },
  week_3: { mau: 450, charts: 4200, nps: 48 },
  // ...
};

// Goals (Mês 3)
const month3_goals = {
  mau: 500,
  charts_total: 5000,
  paying_users: 50, // 10% conversion
  nps: 50
};
```

### Roadmap Próximas Features
1. **Mês 4**: Mekko chart + 2 chart types
2. **Mês 5**: Templates library (compartilhada)
3. **Mês 6**: Multi-chart dashboard generation
4. **Mês 7**: Export para PowerPoint
5. **Mês 8**: Custom branding (Enterprise)

---

## 🛡️ Estratégia de Rollback (Emergências)

### Níveis de Severidade

**🟢 Severidade Baixa (Error rate 2-5%)**
```bash
# Ação: Monitorar + investigar
[ ] Criar issue no GitHub
[ ] Investigar logs (Cloud Logging)
[ ] Fix em próximo sprint
```

**🟡 Severidade Média (Error rate 5-10%)**
```bash
# Ação: Hotfix em 24h
[ ] Criar branch hotfix/
[ ] Implementar fix
[ ] Deploy staging → validar
[ ] Deploy production
[ ] Notificar usuários (se necessário)
```

**🔴 Severidade Alta (Error rate > 10% ou downtime)**
```bash
# Ação: Rollback IMEDIATO
[ ] Identificar commit causador
    git log --oneline -n 10

[ ] Revert commit
    git revert <commit-hash>
    git push origin main

[ ] CI/CD deploya automaticamente versão anterior

[ ] Notificar todos os usuários
    "We experienced a temporary issue and rolled back to a stable version.
    Your data is safe. Service restored."

[ ] Post-mortem meeting (mesma semana)
    - O que aconteceu?
    - Por que não detectamos?
    - Como prevenir?
```

### Contatos de Emergência
```
Tech Lead: [phone/email]
Product Lead: [phone/email]
Google Cloud Support: [link]
Gemini API Support: [link]
```

---

## 📊 Resumo Executivo

### Timeline Completo (10 Semanas)

| Fase | Duração | Entregável | Gate |
|------|---------|------------|------|
| **0. Preparação** | 3 dias | Infraestrutura completa | ✅ Infra validada |
| **1. Foundation** | 1 semana | Data input funcional | ✅ Data input OK |
| **2. Intelligence** | 1 semana | IA sugere gráficos | ✅ IA funcionando |
| **3. Visualization** | 2 semanas | 4 tipos de gráficos | ✅ Charts OK |
| **4. Enhancement** | 1 semana | Customização + UX | ✅ Customização OK |
| **5. Production** | 1 semana | Observabilidade + testes | ✅ Beta ready |
| **6. Launch** | 2 semanas | Lançamento público | ✅ Public launch |

**Total:** 10 semanas (2.5 meses) com 1 dev full-time

### Indicadores de Sucesso

**Técnicos:**
- ✅ Latência p95 < 3s (AI)
- ✅ Latência p95 < 2s (charts)
- ✅ Error rate < 2%
- ✅ Uptime > 99.9%
- ✅ Code coverage > 80%

**Produto:**
- ✅ 500 MAU (mês 3)
- ✅ 5,000 charts gerados (mês 3)
- ✅ NPS > 40
- ✅ Marketplace rating > 4.5
- ✅ 10% conversão free → paid

**Negócio:**
- ✅ Custo < $50/mês (MVP)
- ✅ Feedback loop ativo
- ✅ Roadmap definido (6 meses)

---

## ✅ Checklist Final do Projeto

### Pré-Launch
```
Infraestrutura:
[ ] Google Cloud Project configurado
[ ] Apps Script deployado
[ ] Cloud Functions em produção
[ ] Secret Manager com API keys
[ ] CI/CD pipeline ativo

Código:
[ ] 8 tipos de gráficos funcionando
[ ] IA com 70%+ accuracy
[ ] Customização completa
[ ] Onboarding implementado
[ ] Error handling robusto

Testes:
[ ] 20+ testes automatizados
[ ] Code coverage > 80%
[ ] Performance benchmarks OK
[ ] Security audit completo
[ ] Beta testing (50 usuários)

Documentação:
[ ] README.md completo
[ ] USER_GUIDE.md publicado
[ ] API docs disponíveis
[ ] Troubleshooting guide

Compliance:
[ ] Privacy Policy publicada
[ ] Terms of Service publicados
[ ] OAuth consent screen aprovado
[ ] GDPR compliance
```

### Launch
```
[ ] Marketplace listing ao vivo
[ ] Screenshots profissionais (5)
[ ] Demo video (YouTube)
[ ] Pricing definido
[ ] Support channel ativo
```

### Pós-Launch
```
[ ] Monitoring dashboards
[ ] Alertas configurados
[ ] Feedback loop ativo
[ ] Roadmap próximos 3 meses
[ ] Equipe de suporte treinada
```

---

**Status:** ✅ Plano de Implementação Completo
**Próximo Passo:** Iniciar FASE 0 (Setup de Infraestrutura)
**Responsável:** Tech Lead
**Data de Início:** [DATA]
**ETA de Launch:** [DATA + 10 semanas]

---

## 🎯 Princípios de Execução (Resumo)

1. **🔒 Segurança Primeiro**: Nunca pular gates de validação
2. **🧪 Testar Sempre**: Testes automatizados antes de cada merge
3. **📊 Medir Tudo**: Analytics e logs desde o dia 1
4. **🔄 Iterar Rápido**: Feedback loop semanal
5. **📚 Documentar Inline**: Code comments + README sempre atualizados
6. **🚨 Rollback Ready**: Sempre ter plano B
7. **👥 Comunicação Clara**: Daily updates para stakeholders

**Let's build something amazing! 🚀**
