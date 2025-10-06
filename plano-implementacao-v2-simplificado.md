# Plano de Implementação - Smart Chart Co-Pilot MVP
## ⚡ Versão Simplificada - Solo Dev

**Versão:** 2.0 (Ultra Simplificada)
**Data:** Outubro 2025
**Estratégia:** Branch única (main), commits diretos, máxima velocidade

---

## 🎯 Overview Rápido

**Timeline:** 6-8 semanas (1 dev solo)
**Stack:** Apps Script + Cloud Functions (Node.js) + Gemini Flash
**Versionamento:** Git main branch + tags (v0.1.0, v0.2.0...)

### Fases

```
FASE 0: Setup (1 dia) → Infra básica funcionando
FASE 1: Data Input (3-4 dias) → Import + preview
FASE 2: IA (4-5 dias) → Gemini + sugestões
FASE 3: Charts (5-7 dias) → 4 tipos funcionando
FASE 4: Polish (3-4 dias) → Customização básica
FASE 5: Beta (1 semana) → 10-20 testers
FASE 6: Launch (3-4 dias) → Marketplace público
```

---

## 🚀 FASE 0: Setup Rápido (1 dia)

### ✅ Git + Estrutura (COMPLETO)
```bash
# Estrutura criada
git init smart-chart-copilot
cd smart-chart-copilot
mkdir -p gas-project cloud-functions/analyze-data cloud-functions/suggest-title

# .gitignore criado
# .env.example criado
# README.md completo criado

# Primeiro commit
git add .
git commit -m "feat: initial setup - project structure and documentation"
git branch -M main
git remote add origin https://github.com/luisotaviomoretti/smart-chart-copilot.git
git push -u origin main
git tag v0.0.1 -m "FASE 0: Initial setup complete"
git push --tags
```

**Status:** ✅ Completo - Repositório criado e no GitHub

---

### ✅ GCP Setup (COMPLETO)

**Realizado via Console Web:**

```
✅ Projeto criado: smart-chart-copilot
✅ Billing habilitado
✅ APIs habilitadas (via console.cloud.google.com/apis):
   - Google Slides API
   - Google Sheets API
   - Google Drive API
   - Cloud Functions API
   - Secret Manager API
   - Generative Language API (Gemini)

✅ OAuth 2.0 Consent Screen configurado
✅ OAuth Client ID criado e salvo em .env
✅ Gemini API Key obtida (https://ai.google.dev/)
✅ Secret Manager configurado com gemini-api-key
```

**Credenciais salvas em:** `.env` (não commitado)

**Status:** ✅ Completo - Infra GCP pronta

### Apps Script
```bash
npm install -g @google/clasp
clasp login
clasp create --type standalone --title "Smart Chart Co-Pilot"
clasp push
```

### Cloud Function Hello World
```bash
cd cloud-functions/analyze-data
npm init -y
npm install @google-cloud/functions-framework @google/genai

# index.js
cat > index.js << 'EOF'
const functions = require('@google-cloud/functions-framework');
functions.http('analyzeData', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({ status: 'ok' });
});
EOF

# Deploy
gcloud functions deploy analyzeData \
  --runtime nodejs20 \
  --trigger-http \
  --allow-unauthenticated \
  --region us-central1
```

### ✅ Checklist FASE 0
- [ ] Git repo + main branch
- [ ] GCP APIs habilitadas
- [ ] Apps Script deployado
- [ ] Cloud Function responde

**Commit:**
```bash
git add .
git commit -m "feat: infra completa"
git tag v0.0.1
git push origin main --tags
```

---

## 🏗️ FASE 1: Data Input (3-4 dias)

### Dia 1: Sidebar UI (4h)
**Copiar de:** `apps-script-samples/slides/translate`

```html
<!-- gas-project/Sidebar.html -->
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial; padding: 16px; }
    .tab { cursor: pointer; padding: 8px; }
    .tab.active { border-bottom: 2px solid #4285F4; }
  </style>
</head>
<body>
  <div id="tabs">
    <span class="tab active" onclick="showTab('sheets')">Sheets</span>
    <span class="tab" onclick="showTab('manual')">Manual</span>
  </div>

  <div id="sheets-tab">
    <button onclick="showPicker()">Select Google Sheet</button>
    <input id="range" placeholder="Sheet1!A1:D10">
    <button onclick="importData()">Import</button>
  </div>

  <div id="manual-tab" style="display:none">
    <textarea id="paste-area" rows="10"></textarea>
    <button onclick="parseManual()">Load Data</button>
  </div>

  <div id="preview"></div>

  <script>
    function showTab(tab) {
      document.getElementById('sheets-tab').style.display =
        tab === 'sheets' ? 'block' : 'none';
      document.getElementById('manual-tab').style.display =
        tab === 'manual' ? 'block' : 'none';
    }

    function showPicker() {
      google.script.run.withSuccessHandler(createPicker).getOAuthToken();
    }

    function createPicker(token) {
      new google.picker.PickerBuilder()
        .addView(google.picker.ViewId.SPREADSHEETS)
        .setOAuthToken(token)
        .setCallback(data => {
          if (data.action === 'picked') {
            window.selectedFileId = data.docs[0].id;
          }
        })
        .build().setVisible(true);
    }

    function importData() {
      const range = document.getElementById('range').value;
      google.script.run
        .withSuccessHandler(showPreview)
        .importFromSheets(window.selectedFileId, range);
    }

    function parseManual() {
      const text = document.getElementById('paste-area').value;
      const data = text.split('\n').map(r => r.split('\t'));
      showPreview({ data });
    }

    function showPreview(result) {
      const preview = document.getElementById('preview');
      let html = '<table border="1">';
      result.data.slice(0, 10).forEach(row => {
        html += '<tr>' + row.map(c => `<td>${c}</td>`).join('') + '</tr>';
      });
      html += '</table>';
      preview.innerHTML = html;
      window.currentData = result.data;
    }
  </script>
</body>
</html>
```

```javascript
// gas-project/Code.gs
function onOpen() {
  SlidesApp.getUi()
    .createMenu('Smart Chart Co-Pilot')
    .addItem('Open', 'showSidebar')
    .addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Smart Chart Co-Pilot');
  SlidesApp.getUi().showSidebar(html);
}

function getOAuthToken() {
  return ScriptApp.getOAuthToken();
}

function importFromSheets(fileId, range) {
  const ss = SpreadsheetApp.openById(fileId);
  const data = ss.getRange(range).getValues();
  return { data: data };
}
```

### ✅ Checklist FASE 1
- [ ] Sidebar abre
- [ ] Import Sheets funciona
- [ ] Paste manual funciona
- [ ] Preview mostra dados

**Commit:**
```bash
clasp push
git add .
git commit -m "feat: data input completo"
git tag v0.1.0
git push origin main --tags
```

---

## 🧠 FASE 2: IA + Backend (4-5 dias)

### Dia 1-2: Gemini Client (6h)
**Copiar de:** `GoogleCloudPlatform/generative-ai/gemini`

```javascript
// cloud-functions/analyze-data/index.js
const functions = require('@google-cloud/functions-framework');
const { GoogleGenerativeAI } = require('@google/genai');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const secretClient = new SecretManagerServiceClient();

functions.http('analyzeData', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  try {
    const { data, headers } = req.body;

    // Get API key
    const [version] = await secretClient.accessSecretVersion({
      name: 'projects/PROJECT_ID/secrets/gemini-api-key/versions/latest'
    });
    const apiKey = version.payload.data.toString();

    // Call Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1024,
        responseMimeType: 'application/json'
      }
    });

    const prompt = `
Analyze this data and suggest 3 chart types.

DATA:
- Headers: ${headers.join(', ')}
- Sample: ${JSON.stringify(data.slice(0, 5))}

RESPOND WITH JSON:
{
  "suggestions": [
    {
      "chart_type": "column_clustered|line|waterfall|etc",
      "confidence": 0-100,
      "reason": "One sentence (max 15 words)"
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const response = JSON.parse(result.response.text());

    res.json({
      suggestions: response.suggestions.slice(0, 3),
      metadata: { source: 'gemini' }
    });

  } catch (error) {
    // Fallback
    res.json({
      suggestions: [
        { chart_type: 'column_clustered', confidence: 50, reason: 'Default suggestion' },
        { chart_type: 'bar_clustered', confidence: 40, reason: 'Alternative' },
        { chart_type: 'line', confidence: 30, reason: 'If trend matters' }
      ],
      metadata: { source: 'fallback', error: error.message }
    });
  }
});
```

### Dia 3: Frontend Cards (4h)

```html
<!-- Adicionar em Sidebar.html -->
<div id="suggestions"></div>

<script>
async function analyzeData() {
  const data = window.currentData;
  const headers = data[0];

  document.getElementById('suggestions').innerHTML = 'Analyzing...';

  const response = await fetch('https://us-central1-PROJECT.cloudfunctions.net/analyzeData', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: data.slice(1), headers })
  });

  const result = await response.json();

  let html = '<h3>AI Suggestions</h3>';
  result.suggestions.forEach(s => {
    html += `
      <div class="card" onclick="selectChart('${s.chart_type}')">
        <h4>${s.chart_type}</h4>
        <p>${s.confidence}% match</p>
        <p>${s.reason}</p>
      </div>
    `;
  });

  document.getElementById('suggestions').innerHTML = html;
}

function selectChart(type) {
  window.selectedChartType = type;
  alert('Selected: ' + type);
}
</script>
```

### ✅ Checklist FASE 2
- [ ] Cloud Function chama Gemini
- [ ] 3 sugestões retornadas
- [ ] UI mostra cards
- [ ] Fallback funciona

**Deploy:**
```bash
cd cloud-functions/analyze-data
npm install
gcloud functions deploy analyzeData \
  --runtime nodejs20 \
  --trigger-http \
  --allow-unauthenticated \
  --region us-central1

cd ../..
git add .
git commit -m "feat: IA integration completa"
git tag v0.2.0
git push origin main --tags
```

---

## 🎨 FASE 3: Charts Core (5-7 dias)

### Dia 1-3: Column + Bar (12h)

```javascript
// gas-project/Code.gs
function insertColumnChart(data, config) {
  const presentation = SlidesApp.getActivePresentation();
  const slide = presentation.getSelection().getCurrentPage();

  // Criar DataTable
  const dataTable = Charts.newDataTable();
  data.headers.forEach(h => dataTable.addColumn(Charts.ColumnType.STRING, h));
  data.rows.forEach(r => dataTable.addRow(r));

  // Criar chart
  const chart = Charts.newColumnChart()
    .setDataTable(dataTable.build())
    .setTitle(config.title || 'Chart')
    .setColors(['#4285F4', '#34A853', '#FBBC04'])
    .build();

  // Inserir no slide
  const blob = chart.getAs('image/png');
  const pageWidth = slide.getPageWidth();
  const pageHeight = slide.getPageHeight();
  const width = pageWidth * 0.7;
  const height = pageHeight * 0.6;
  const x = (pageWidth - width) / 2;
  const y = (pageHeight - height) / 2;

  slide.insertImage(blob, x, y, width, height);

  return { success: true };
}

function insertBarChart(data, config) {
  // Similar ao Column, trocar para BarChart
  const chart = Charts.newBarChart()
    .setDataTable(dataTable.build())
    .setTitle(config.title || 'Chart')
    .setColors(['#4285F4', '#34A853'])
    .build();
  // ... resto igual
}

function insertLineChart(data, config) {
  const chart = Charts.newLineChart()
    .setDataTable(dataTable.build())
    .setTitle(config.title || 'Chart')
    .setCurveStyle(Charts.CurveStyle.SMOOTH)
    .build();
  // ... resto igual
}
```

### Dia 4-5: Waterfall (Custom) (10h)

```javascript
function insertWaterfallChart(data, config) {
  const slide = SlidesApp.getActivePresentation().getSelection().getCurrentPage();

  // Calcular valores acumulados
  let cumulative = 0;
  const waterfall = data.rows.map(row => {
    const value = row[1];
    const start = cumulative;
    cumulative += value;
    return { label: row[0], value, start, cumulative };
  });

  // Criar retângulos (shapes)
  const shapes = [];
  let xPos = 100;
  const barWidth = 50;

  waterfall.forEach((item, i) => {
    const height = Math.abs(item.value) * 2;
    const yPos = item.value > 0 ? 300 - (item.cumulative * 2) : 300 - (item.start * 2);

    const rect = slide.insertShape(
      SlidesApp.ShapeType.RECTANGLE,
      xPos, yPos, barWidth, height
    );

    rect.getFill().setSolidFill(item.value >= 0 ? '#34A853' : '#EA4335');
    shapes.push(rect);
    xPos += barWidth + 20;
  });

  // Agrupar
  const group = slide.group(shapes);
  return { success: true };
}
```

### Frontend: Insert Chart

```html
<!-- Sidebar.html -->
<button onclick="insertChart()">Insert Chart</button>

<script>
function insertChart() {
  const chartType = window.selectedChartType;
  const data = {
    headers: window.currentData[0],
    rows: window.currentData.slice(1)
  };
  const config = { title: 'Chart Title' };

  google.script.run
    .withSuccessHandler(() => alert('Chart inserted!'))
    .withFailureHandler(e => alert('Error: ' + e))
    [`insert${chartType.split('_')[0].charAt(0).toUpperCase() + chartType.split('_')[0].slice(1)}Chart`](data, config);
}
</script>
```

### ✅ Checklist FASE 3
- [ ] Column chart insere
- [ ] Bar chart insere
- [ ] Line chart insere
- [ ] Waterfall insere (custom)

**Commit:**
```bash
clasp push
git add .
git commit -m "feat: 4 chart types funcionando"
git tag v0.3.0
git push origin main --tags
```

---

## ✨ FASE 4: Polish Essencial (3-4 dias)

### Customização Básica

```html
<!-- Adicionar em Sidebar.html -->
<div id="customization">
  <h3>Customize</h3>

  <label>Title:</label>
  <input id="chart-title" placeholder="Enter title">

  <label>Colors:</label>
  <select id="palette">
    <option value="professional">Professional Blue</option>
    <option value="consulting">Consulting Gray</option>
  </select>

  <label>
    <input type="checkbox" id="show-labels" checked>
    Show data labels
  </label>
</div>

<script>
function insertChart() {
  const config = {
    title: document.getElementById('chart-title').value,
    colorPalette: document.getElementById('palette').value,
    showDataLabels: document.getElementById('show-labels').checked
  };
  // ... usar config ao inserir
}
</script>
```

### Onboarding Simples

```javascript
// Code.gs
function onOpen() {
  const ui = SlidesApp.getUi();
  ui.createMenu('Smart Chart Co-Pilot').addItem('Open', 'showSidebar').addToUi();

  const userProps = PropertiesService.getUserProperties();
  if (!userProps.getProperty('seen_onboarding')) {
    const html = HtmlService.createHtmlOutput(`
      <h2>Welcome to Smart Chart Co-Pilot!</h2>
      <p>1. Import or paste data</p>
      <p>2. AI suggests charts</p>
      <p>3. Click to insert</p>
      <button onclick="google.script.host.close()">Got it!</button>
    `).setWidth(300).setHeight(200);
    ui.showModalDialog(html, 'Welcome');
    userProps.setProperty('seen_onboarding', 'true');
  }
}
```

### ✅ Checklist FASE 4
- [ ] Customização funciona
- [ ] Onboarding aparece 1x
- [ ] UX polido

**Commit:**
```bash
clasp push
git add .
git commit -m "feat: customização e onboarding"
git tag v0.4.0
git push origin main --tags
```

---

## 🧪 FASE 5: Beta (1 semana)

### Setup Beta

```bash
# OAuth consent screen
# Adicionar 10-20 emails de testers (Internal testing)

# Deploy final
clasp push
gcloud functions deploy analyzeData --runtime nodejs20 ...
```

### Feedback Form
- Criar Google Form simples
- Perguntas:
  1. NPS (0-10)
  2. O que funcionou?
  3. O que não funcionou?
  4. Sugestões?

### Iterações
- Dia 1-2: Enviar convites, coletar feedback
- Dia 3-4: Corrigir bugs críticos
- Dia 5: Validar correções

### ✅ Checklist FASE 5
- [ ] 10+ beta testers ativos
- [ ] 50+ charts gerados
- [ ] Bugs críticos corrigidos
- [ ] NPS > 7

---

## 🚀 FASE 6: Launch (3-4 dias)

### Marketplace Listing

```
Nome: Smart Chart Co-Pilot
Tagline: AI-powered charts for Google Slides

Descrição:
Create professional charts in Google Slides with AI suggestions.
- Import data from Sheets or paste manually
- AI recommends best chart types
- 8 chart types available
- One-click insertion

Screenshots: 5 imagens
Video: Demo 2min (YouTube)

Pricing:
- Free: 10 charts/month
- Pro: $19/month unlimited
```

### Deploy Final

```bash
# Tag versão 1.0
git tag v1.0.0 -m "Public launch"
git push --tags

# Deploy production
clasp push
gcloud functions deploy analyzeData --runtime nodejs20 ...

# Publicar no Marketplace
# Console: console.cloud.google.com/apis/credentials
# OAuth consent → Publish app
```

### Go-Live

1. Publicar no Marketplace (9h AM)
2. Post LinkedIn/Twitter
3. Email para beta testers (agradecimento)
4. Monitorar métricas (installs, errors)

### ✅ Checklist FASE 6
- [ ] Marketplace público
- [ ] 100+ installs (dia 1)
- [ ] Error rate < 2%
- [ ] Rating > 4.5

---

## 📊 Workflow Diário (Solo Dev)

### Morning (4h)
```bash
# 1. Pull updates (caso tenha commitado de outro PC)
git pull

# 2. Trabalhar na feature do dia
# ... código ...

# 3. Testar localmente
clasp push
# Abrir Slides, testar

# 4. Commit
git add .
git commit -m "feat: [descrição]"
git push
```

### Afternoon (4h)
```bash
# 5. Continuar feature ou próxima

# 6. Deploy se estável
gcloud functions deploy ...  # se mudou backend

# 7. Commit EOD
git add .
git commit -m "wip: [onde parou]"
git push
```

### Versioning
```bash
# Quando fase completa
git tag v0.X.0 -m "Fase X completa"
git push --tags
```

---

## 🛡️ Rollback Rápido

### Se algo quebrar:
```bash
# Opção 1: Revert último commit
git revert HEAD
git push

# Opção 2: Reset para tag anterior
git reset --hard v0.3.0
git push --force

# Opção 3: Rollback Cloud Function
gcloud functions deploy analyzeData --source=v0.2.0/
```

---

## 📝 Commits Recomendados

### Padrão
```
feat: [descrição]     # Nova funcionalidade
fix: [descrição]      # Bug fix
wip: [descrição]      # Work in progress (EOD)
refactor: [descrição] # Refactoring
docs: [descrição]     # Documentação
```

### Exemplos
```bash
git commit -m "feat: add Google Picker integration"
git commit -m "fix: waterfall colors not applying"
git commit -m "wip: working on customization panel"
git commit -m "refactor: simplify data validation"
```

---

## 🎯 Meta Final

**6-8 semanas:**
- ✅ MVP funcional
- ✅ 500+ charts gerados
- ✅ 100+ usuários ativos
- ✅ NPS > 40
- ✅ Marketplace público

**Próximos passos (pós-MVP):**
1. Mais chart types (Pie, Scatter)
2. Templates library
3. Multi-chart dashboard
4. Export para PowerPoint

---

**Status:** ✅ Plano pronto para execução
**Branch:** `main` (única)
**Estratégia:** Commits diretos, tags para versões, rollback via git
**Duração:** 6-8 semanas solo dev

🚀 **Let's ship it!**
