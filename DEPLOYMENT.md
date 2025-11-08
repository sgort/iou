# Deployment Guide - Lelystad Ringweg Demonstrator

## Quick Start voor Azure Static Web Apps

### Optie 1: Via Azure Portal (Aanbevolen voor beginners)

#### Stap 1: GitHub Repository Klaarzetten

1. Maak een nieuwe repository op GitHub:
   - Ga naar https://github.com/new
   - Naam: `lelystad-ringweg-demo`
   - Public of Private (jouw keuze)
   - Klik "Create repository"

2. Upload de bestanden:
   ```bash
   cd /pad/naar/lelystad-demo
   git init
   git add .
   git commit -m "Initial commit: Lelystad demonstrator"
   git branch -M main
   git remote add origin https://github.com/JOUW-USERNAME/lelystad-ringweg-demo.git
   git push -u origin main
   ```

#### Stap 2: Azure Static Web App Aanmaken

1. Log in op [Azure Portal](https://portal.azure.com)

2. Klik op "+ Create a resource" (linksboven)

3. Zoek naar "Static Web App" en selecteer

4. Klik "Create"

5. Vul het formulier in:
   - **Basics tab**:
     - Subscription: Selecteer je Azure subscription
     - Resource Group: Maak nieuwe → `rg-lelystad-demo`
     - Name: `lelystad-ringweg-demo`
     - Plan type: Free
     - Region: West Europe (of dichterbij)
   
   - **Deployment tab**:
     - Source: GitHub
     - GitHub Account: Klik "Sign in with GitHub" (autoriseer Azure)
     - Organization: Je GitHub username
     - Repository: `lelystad-ringweg-demo`
     - Branch: `main`
   
   - **Build Details**:
     - Build Presets: Custom
     - App location: `/`
     - Api location: (leeg laten)
     - Output location: (leeg laten)

6. Klik "Review + create" → "Create"

7. Wacht 1-2 minuten op deployment

8. Wanneer klaar, klik "Go to resource"

9. Kopieer de URL (bijv. `https://happy-stone-1234abcd.azurestaticapps.net`)

10. Test de URL in je browser - je demonstrator zou moeten werken!

#### Stap 3: Custom Domain Toevoegen (iou.open-regels.nl)

1. In je Static Web App, klik "Custom domains" in het linkermenu

2. Klik "+ Add"

3. Selecteer "Custom domain on other DNS"

4. Voer in: `iou.open-regels.nl`

5. Azure toont je:
   - Een CNAME record
   - Een TXT record voor validatie

6. Ga naar je DNS provider (waar je open-regels.nl hebt geregistreerd)

7. Voeg de records toe:
   ```
   Type: CNAME
   Name: iou
   Value: happy-stone-1234abcd.azurestaticapps.net
   TTL: 3600 (of auto)

   Type: TXT
   Name: _dnsauth.iou
   Value: [de lange string die Azure geeft]
   TTL: 3600
   ```

8. Wacht 5-10 minuten voor DNS propagatie

9. Klik "Validate" in Azure Portal

10. Wanneer succesvol, is je site bereikbaar op `https://iou.open-regels.nl`

---

### Optie 2: Via Azure CLI (Voor gevorderden)

#### Vereisten
```bash
# Installeer Azure CLI indien nodig
# macOS:
brew install azure-cli

# Windows:
# Download van https://aka.ms/installazurecliwindows

# Linux:
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

#### Deployment Script

```bash
# 1. Login bij Azure
az login

# 2. Stel subscription in (indien meerdere)
az account set --subscription "JOUW_SUBSCRIPTION_NAME"

# 3. Maak resource group
az group create \
  --name rg-lelystad-demo \
  --location westeurope

# 4. Maak static web app met GitHub koppeling
az staticwebapp create \
  --name lelystad-ringweg-demo \
  --resource-group rg-lelystad-demo \
  --source https://github.com/JOUW-USERNAME/lelystad-ringweg-demo \
  --location westeurope \
  --branch main \
  --app-location "/" \
  --login-with-github

# 5. Haal de deployment token op
az staticwebapp secrets list \
  --name lelystad-ringweg-demo \
  --resource-group rg-lelystad-demo

# 6. Voeg custom domain toe
az staticwebapp hostname set \
  --name lelystad-ringweg-demo \
  --resource-group rg-lelystad-demo \
  --hostname iou.open-regels.nl
```

---

## GitHub Actions Workflow

De workflow is al aangemaakt in `.github/workflows/azure-static-web-apps.yml`.

### Workflow Geheim Toevoegen

Azure maakt automatisch een deployment token aan en voegt deze toe als GitHub Secret wanneer je via de Portal deployt.

Als je handmatig wilt deployen:

1. Haal de token op:
   ```bash
   az staticwebapp secrets list \
     --name lelystad-ringweg-demo \
     --resource-group rg-lelystad-demo \
     --query "properties.apiKey" -o tsv
   ```

2. Ga naar GitHub repository → Settings → Secrets and variables → Actions

3. Klik "New repository secret"

4. Naam: `AZURE_STATIC_WEB_APPS_API_TOKEN`

5. Value: [plak de token]

6. Klik "Add secret"

### Automatische Deployment

Nu bij elke `git push` naar `main`:
1. GitHub Actions wordt getriggerd
2. Code wordt gebouwd (hoewel wij geen build stap hebben)
3. Bestanden worden geüpload naar Azure
4. Je site is binnen 1-2 minuten bijgewerkt

---

## DNS Configuratie Details

### Voor verschillende DNS providers

#### Cloudflare
1. Log in op Cloudflare
2. Selecteer je domein `open-regels.nl`
3. Ga naar DNS
4. Add record:
   - Type: CNAME
   - Name: iou
   - Target: jouw-app.azurestaticapps.net
   - Proxy status: DNS only (grijze cloud)
5. Add record:
   - Type: TXT
   - Name: _dnsauth.iou
   - Content: [Azure validatie token]

#### GoDaddy
1. Log in op GoDaddy
2. Ga naar My Products → DNS
3. Add → CNAME:
   - Host: iou
   - Points to: jouw-app.azurestaticapps.net
   - TTL: 1 hour
4. Add → TXT:
   - Host: _dnsauth.iou
   - TXT Value: [Azure validatie token]
   - TTL: 1 hour

#### TransIP
1. Log in op TransIP
2. Selecteer domein → DNS
3. Nieuwe record:
   - Type: CNAME
   - Naam: iou
   - Waarde: jouw-app.azurestaticapps.net.
   - TTL: 3600
4. Nieuwe record:
   - Type: TXT
   - Naam: _dnsauth.iou
   - Waarde: [Azure validatie token]
   - TTL: 3600

---

## Verificatie en Testen

### 1. Basis Functionaliteit Test

```bash
# Test of de site bereikbaar is
curl -I https://iou.open-regels.nl

# Verwachte response:
# HTTP/2 200
# content-type: text/html
```

### 2. HTTPS Certificaat Verificatie

```bash
# Check SSL certificaat
openssl s_client -connect iou.open-regels.nl:443 -servername iou.open-regels.nl

# Of via browser:
# - Klik op het slotje in de adresbalk
# - Certificaat zou van Let's Encrypt moeten zijn
```

### 3. Functionaliteit Checklist

- [ ] Homepage laadt correct
- [ ] Alle drie de tabs zijn klikbaar (Compliance, Jurisdictioneel, Knowledge)
- [ ] Compliance Dashboard toont 19 requirements
- [ ] Filters werken (wegvak, status, domein)
- [ ] Jurisdictional view toont 3 overlaps
- [ ] Knowledge Graph entry points zijn klikbaar
- [ ] SPARQL query wordt getoond
- [ ] Responsive design werkt op mobile
- [ ] Geen console errors in browser devtools

---

## Troubleshooting

### Probleem: Deployment faalt in GitHub Actions

**Oplossing**:
1. Check of `AZURE_STATIC_WEB_APPS_API_TOKEN` correct is ingesteld in GitHub Secrets
2. Verifieer dat de workflow file correct is (`.github/workflows/azure-static-web-apps.yml`)
3. Check de Actions logs in GitHub voor specifieke foutmeldingen

### Probleem: Custom domain werkt niet

**Oplossing**:
1. Verifieer DNS records:
   ```bash
   nslookup iou.open-regels.nl
   # Moet verwijzen naar je Azure Static Web App
   
   nslookup -type=TXT _dnsauth.iou.open-regels.nl
   # Moet je validatie token tonen
   ```
2. Wacht langer - DNS propagatie kan tot 24 uur duren
3. Check of Azure validatie succesvol was in Portal → Custom domains

### Probleem: Site toont 404

**Oplossing**:
1. Verifieer dat `app_location` in workflow is ingesteld op `/`
2. Check of alle files (index.html, styles.css, etc.) in de root staan
3. Bekijk deployment logs in Azure Portal

### Probleem: CSS/JS laden niet

**Oplossing**:
1. Verifieer paths in index.html:
   ```html
   <link rel="stylesheet" href="styles.css">
   <script src="data.js"></script>
   <script src="app.js"></script>
   ```
2. Check browser console voor 404 errors
3. Verify files zijn meegenomen in deployment (check Azure Portal → Files)

---

## Kosten

**Azure Static Web Apps Free Tier bevat**:
- 100 GB bandwidth per maand
- 0.5 GB storage
- Gratis SSL certificaat
- Gratis custom domain
- Unlimited static content

Voor deze demonstrator = **€0,00 per maand**

Als je meer nodig hebt, upgrade naar Standard tier (€8/maand).

---

## Monitoring en Analytics

### Optie 1: Azure Application Insights (Gratis tier)

1. In Azure Portal → je Static Web App
2. Klik "Application Insights" in menu
3. Enable Application Insights
4. Bekijk:
   - Page views
   - User sessions
   - Performance metrics

### Optie 2: Google Analytics

Voeg toe aan `index.html` vóór `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Updates en Maintenance

### Inhoud Updaten

1. Wijzig de files lokaal
2. Test lokaal:
   ```bash
   python3 -m http.server 8000
   # Open http://localhost:8000
   ```
3. Commit en push:
   ```bash
   git add .
   git commit -m "Update: beschrijving van wijziging"
   git push origin main
   ```
4. Deployment gebeurt automatisch binnen 2 minuten

### Data Updaten

Wijzig `data.js`:
- Voeg requirements toe/weg in `mockData.requirements`
- Pas overlaps aan in `mockData.overlaps`
- Extend knowledge graph in `mockData.knowledgeGraph`

---

## Support

Voor vragen over deployment:
- Azure Static Web Apps docs: https://learn.microsoft.com/azure/static-web-apps/
- GitHub Actions docs: https://docs.github.com/actions

Voor vragen over het project:
- Provincie Flevoland
- Project: Lelystad-Zuid Ringweg

---

**Succes met de deployment! 🚀**
