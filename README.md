# Lelystad-Zuid Ringweg - Informatieplatform Demonstrator

Een statische web-demonstrator die de voorgestelde informatiearsitectuur visualiseert voor het Lelystad-Zuid Ringweg project.

## ðŸŽ¯ Doel

Deze demonstrator toont hoe een semantic web-gebaseerde informatiearsitectuur provinciale infrastructuurprojecten kan ondersteunen door:

- **Regulatory compliance management** via linked data
- **Cross-jurisdictional coordination** met geospatiale visualisatie
- **Knowledge graph exploration** voor semantische navigatie

## ðŸ—ï¸ Architectuur Basis

De demonstrator is gebouwd volgens:
- **MIM** (Metamodel voor Informatie Modellering)
- **NL-SBB** (Standaard voor Begrippenbeschrijving)
- **CPSV-AP/CPRMV** (EU Public Service Vocabularies)
- **NL Design System** (Nederlandse overheids-UX standaarden)

## ðŸ“‹ Use Cases

### Use Case A: Compliance Dashboard
Toont alle uitvoerbare eisen per wegvak met:
- Realtime status monitoring
- Verantwoordelijke rollen
- Deadline tracking
- Filtering op domein/status/wegvak

### Use Case C: Jurisdictionele CoÃ¶rdinatie
Visualiseert:
- Provinciale vs. gemeentelijke grenzen
- Ecologische zones (NNN, Natura 2000)
- Overlap-analyses met coÃ¶rdinatievereisten
- Interactieve kaartlagen

### Use Case E: Knowledge Graph Verkenner
Navigatie door:
- Semantische relaties tussen concepten
- Van werkprotocol â†’ regelgeving â†’ verantwoordelijken
- RDF/SKOS concept hiÃ«rarchieÃ«n
- SPARQL queries voor elk pad

## ðŸš€ Deployment naar Azure Static Web Apps

### Vereisten
- Azure account met actieve subscription
- GitHub repository
- Azure CLI (optioneel)

### Stap 1: GitHub Repository Setup

```bash
# Clone of maak nieuwe repository
git init
git add .
git commit -m "Initial commit: Lelystad Ringweg Demonstrator"
git remote add origin https://github.com/YOURUSERNAME/lelystad-ringweg-demo.git
git push -u origin main
```

### Stap 2: Azure Static Web App Aanmaken

#### Via Azure Portal:

1. Ga naar [portal.azure.com](https://portal.azure.com)
2. Klik "+ Create a resource" â†’ "Static Web App"
3. Vul in:
   - **Subscription**: Kies je subscription
   - **Resource Group**: Maak nieuwe of selecteer bestaande
   - **Name**: `lelystad-ringweg-demo`
   - **Hosting plan**: Free
   - **Region**: West Europe
   - **Deployment details**:
     - Source: GitHub
     - Organization: Je GitHub username
     - Repository: `lelystad-ringweg-demo`
     - Branch: `main`
4. **Build Details**:
   - Build Presets: Custom
   - App location: `/`
   - Api location: (leeg laten)
   - Output location: (leeg laten)

5. Klik "Review + create" â†’ "Create"

Azure zal automatisch een GitHub Actions workflow aanmaken.

#### Via Azure CLI:

```bash
# Login
az login

# Create resource group
az group create --name rg-lelystad-demo --location westeurope

# Create static web app
az staticwebapp create \
  --name lelystad-ringweg-demo \
  --resource-group rg-lelystad-demo \
  --source https://github.com/YOURUSERNAME/lelystad-ringweg-demo \
  --location westeurope \
  --branch main \
  --app-location "/" \
  --login-with-github
```

### Stap 3: Custom Domain Configureren (iou.open-regels.nl)

1. In Azure Portal, ga naar je Static Web App
2. Ga naar "Custom domains"
3. Klik "+ Add"
4. Selecteer "Custom domain on other DNS"
5. Voer in: `iou.open-regels.nl`
6. Azure geeft je een TXT record om toe te voegen aan je DNS

**DNS Configuratie (bij je DNS provider):**

```
Type: CNAME
Name: iou
Value: [jouw-azure-static-web-app-url].azurestaticapps.net

Type: TXT
Name: _dnsauth.iou
Value: [validation-token-from-azure]
```

7. Wacht op DNS propagatie (5-10 minuten)
8. Klik "Validate" in Azure Portal

### Stap 4: HTTPS Certificaat

Azure Static Web Apps voorziet automatisch van gratis SSL certificaten via Let's Encrypt zodra het custom domain is geverifieerd.

## ðŸ“ Project Structuur

```
lelystad-demo/
â”œâ”€â”€ index.html          # Hoofd HTML met alle drie views
â”œâ”€â”€ styles.css          # NL Design System geÃ¯nspireerde CSS
â”œâ”€â”€ app.js             # Applicatie logica en interactie
â”œâ”€â”€ data.js            # Mock data (requirements, overlaps, graph)
â”œâ”€â”€ staticwebapp.config.json  # Azure SWA configuratie
â””â”€â”€ README.md          # Deze file
```

## ðŸ› ï¸ Lokale Development

### Quick Start
```bash
# Installeer geen dependencies nodig - pure static files!

# Start development server
npm run dev

# Of gebruik alternatief:
python3 -m http.server 3000
# Open http://localhost:3000
```

### Beschikbare Scripts

```bash
npm run dev      # Start dev server op http://localhost:3000 (opent auto)
npm run serve    # Start server op http://localhost:8080
npm run build    # No-op: static files zijn al klaar
npm run deploy   # Info: deployment via GitHub Actions
```

### Direct Openen (zonder server)
```bash
# Werkt ook, maar CORS restricties mogelijk bij toekomstige API calls
open index.html
```

## ðŸ”„ Updates Deployen

Elke push naar de `main` branch triggert automatisch een nieuwe deployment:

```bash
git add .
git commit -m "Update: [beschrijving]"
git push origin main
```

GitHub Actions zal automatisch builden en deployen naar Azure.

## ðŸ“Š Mock Data

De demonstrator bevat representatieve mock data:
- **19 requirements** verdeeld over 2 wegvakken
- **7 domeinen** (NNN, Natura 2000, Beschermde Soorten, etc.)
- **3 jurisdictional overlaps** tussen provincie en gemeente
- **20+ knowledge graph nodes** met semantische relaties

## ðŸŽ¨ NL Design System Compliance

De UI volgt Nederlandse overheids-richtlijnen:
- Toegankelijkheid (WCAG 2.1 AA)
- Consistent kleurgebruik
- Leesbare typografie
- Responsive design
- Focus states voor keyboard navigatie

## ðŸ”® Toekomstige Extensies

Voor productie-implementatie zou deze demo uitgebreid worden met:
- TriplyDB SPARQL endpoint integratie
- GeoJSON/WFS layers voor echte kaarten (via Leaflet)
- D3.js voor dynamische graph visualisatie
- Authentication/Authorization (Azure AD B2C)
- Real-time updates via WebSockets
- Export functionaliteit (RDF/Turtle, CSV)

## ðŸ“ Licentie

Dit is een demonstrator voor Provincie Flevoland. Niet voor productiegebruik.

## ðŸ‘¥ Contact

Voor vragen over deze demonstrator:
- **Project**: Lelystad-Zuid Ringweg
- **Organisatie**: Provincie Flevoland
- **Type**: Informatiearsitectuur Proof-of-Concept

---

**Status**: ðŸš§ Demonstrator - Niet voor productiegebruik
**Laatste update**: November 2024
**Versie**: 1.0.0
