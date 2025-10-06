# smart-chart-copilot

🚀 **AI-powered chart generation for Google Slides**

An intelligent add-on that uses Gemini AI to suggest and create professional charts in Google Slides with one click.

## 📊 Features

- **AI-Powered Suggestions**: Gemini 2.0 Flash analyzes your data and suggests the best chart types
- **Multiple Data Sources**: Import from Google Sheets or paste data manually
- **8 Chart Types**: Column, Bar, Line, Waterfall, Mekko, and more
- **One-Click Insertion**: Professional charts added to your slides instantly
- **Customization**: Colors, titles, labels, and legend positioning

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│   Google Slides Add-on (Frontend)  │
│   - Apps Script + HTML/CSS/JS      │
│   - Data Input & Preview            │
│   - Chart Customization UI          │
└──────────────┬──────────────────────┘
               │
               │ HTTPS/REST
               ▼
┌─────────────────────────────────────┐
│   Cloud Functions (Backend)         │
│   - Node.js 20                      │
│   - Gemini API Integration          │
│   - Chart Analysis & Suggestions    │
└─────────────────────────────────────┘
```

## 📁 Project Structure

```
smart-chart-copilot/
├── gas-project/              # Google Apps Script files
│   ├── Code.gs              # Server-side logic
│   ├── Sidebar.html         # UI
│   ├── Styles.html          # CSS
│   └── appsscript.json      # Manifest
├── cloud-functions/
│   ├── analyze-data/        # AI analysis endpoint
│   └── suggest-title/       # Title suggestion endpoint
├── docs/
│   ├── PRD.docx             # Product Requirements
│   ├── arquitetura.md       # Architecture docs
│   ├── referencias.md       # GitHub references
│   └── plano-implementacao-v2-simplificado.md
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Google Cloud CLI (`gcloud`)
- Clasp CLI for Apps Script
- Gemini API key

### Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/luisotaviomoretti/smart-chart-copilot.git
   cd smart-chart-copilot
   ```

2. **Install dependencies**
   ```bash
   cd cloud-functions/analyze-data
   npm install
   ```

3. **Configure GCP**
   ```bash
   # Create project
   gcloud projects create smart-chart-copilot

   # Enable APIs
   gcloud services enable \
     slides.googleapis.com \
     sheets.googleapis.com \
     cloudfunctions.googleapis.com \
     generativelanguage.googleapis.com
   ```

4. **Set up Gemini API**
   ```bash
   # Store API key in Secret Manager
   gcloud secrets create gemini-api-key --data-file=-
   # Paste your API key, then Ctrl+D
   ```

5. **Deploy Apps Script**
   ```bash
   cd gas-project
   clasp login
   clasp push
   ```

6. **Deploy Cloud Functions**
   ```bash
   cd cloud-functions/analyze-data
   gcloud functions deploy analyzeData \
     --runtime nodejs20 \
     --trigger-http \
     --allow-unauthenticated \
     --region us-central1
   ```

## 🛠️ Development

### Local Testing

```bash
# Test Cloud Function locally
cd cloud-functions/analyze-data
npm start
curl http://localhost:8080

# Push Apps Script changes
cd gas-project
clasp push
clasp open  # Opens in browser
```

### Deployment

```bash
# Apps Script
clasp push

# Cloud Functions
gcloud functions deploy analyzeData --runtime nodejs20 ...

# Tag version
git tag v0.1.0
git push --tags
```

## 📚 Documentation

- [PRD](./PRD.docx) - Product Requirements Document
- [Architecture](./arquitetura.md) - Technical architecture
- [Implementation Plan](./plano-implementacao-v2-simplificado.md) - Development roadmap
- [References](./referencias.md) - GitHub repositories used

## 🎯 Roadmap

### MVP (v0.1.0 - v1.0.0) - 6-8 weeks
- [x] FASE 0: Setup & Infrastructure (1 day)
- [ ] FASE 1: Data Input (3-4 days)
- [ ] FASE 2: AI Integration (4-5 days)
- [ ] FASE 3: Chart Generation (5-7 days)
- [ ] FASE 4: Polish & Customization (3-4 days)
- [ ] FASE 5: Beta Testing (1 week)
- [ ] FASE 6: Public Launch (3-4 days)

### Post-MVP
- [ ] Additional chart types (Pie, Scatter, Gantt)
- [ ] Templates library
- [ ] Multi-chart dashboard generation
- [ ] Export to PowerPoint

## 🤝 Contributing

This is a solo development project, but feedback and suggestions are welcome!

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙋‍♂️ Author

**Luis Otavio Moretti**
- GitHub: [@luisotaviomoretti](https://github.com/luisotaviomoretti)

## 🙏 Acknowledgments

Built using:
- [Google Gemini 2.0 Flash](https://ai.google.dev/)
- [Google Apps Script](https://developers.google.com/apps-script)
- [Google Cloud Functions](https://cloud.google.com/functions)
- References from [GoogleCloudPlatform/generative-ai](https://github.com/GoogleCloudPlatform/generative-ai)

---

**Status**: 🚧 In Development (FASE 0 - Setup)

**Last Updated**: October 2025
