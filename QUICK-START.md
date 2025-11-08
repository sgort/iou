# 🚀 Quick Start Guide

## Onmiddellijke Acties (< 5 minuten)

### 1. Test Lokaal

```bash
# Ga naar de map
cd lelystad-demo

# OPTIE 1: Met npm (aanbevolen)
npm run dev
# Opent automatisch http://localhost:3000

# OPTIE 2: Direct openen (werkt ook)
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux

# OPTIE 3: Via Python server
python3 -m http.server 8000
# Open http://localhost:8000
```

**Verwacht resultaat**: Browser opent met Lelystad Ringweg demonstrator

---

### 2. Verken de Use Cases

#### Compliance Dashboard
1. Klik op eerste tab (al actief)
2. Bekijk de 4 summary cards
3. Probeer filters:
   - Wegvak → "Laan van Nieuw Land"
   - Status → "In behandeling"
4. Klik "Details" bij een requirement

#### Jurisdictionele Coördinatie
1. Klik tweede tab
2. Toggle kaartlagen aan/uit
3. Scroll naar "Overlap Analyse"
4. Klik op een requirement link

#### Knowledge Graph
1. Klik derde tab
2. Klik "Ecologisch Werkprotocol" entry point
3. Graph verschijnt met relaties
4. Klik op een gerelateerd concept
5. Bekijk SPARQL query onderaan

---

### 3. Deploy naar Azure (15 minuten)

#### Optie A: Via Azure Portal (Aanbevolen)

1. **GitHub Setup** (2 min):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/JOUW-USERNAME/lelystad-demo.git
   git push -u origin main
   ```

2. **Azure Portal** (10 min):
   - Log in: https://portal.azure.com
   - Klik "+ Create a resource"
   - Zoek "Static Web App" → Create
   - Vul in:
     * Name: `lelystad-ringweg-demo`
     * Region: West Europe
     * Source: GitHub
     * Repository: `lelystad-demo`
     * Branch: `main`
     * App location: `/`
   - Create

3. **Test** (3 min):
   - Wacht op deployment (1-2 min)
   - Kopieer URL (bijv. `happy-stone-abc123.azurestaticapps.net`)
   - Open in browser
   - ✅ Klaar!

#### Optie B: Via Azure CLI (5 minuten)

```bash
# Login
az login

# Deploy
az staticwebapp create \
  --name lelystad-ringweg-demo \
  --resource-group rg-lelystad-demo \
  --source https://github.com/JOUW-USERNAME/lelystad-demo \
  --location westeurope \
  --branch main \
  --app-location "/"

# Done! URL wordt getoond in output
```

---

### 4. Custom Domain (iou.open-regels.nl)

#### Bij je DNS provider

Voeg deze records toe:

```
Type: CNAME
Name: iou
Value: [jouw-azure-url].azurestaticapps.net

Type: TXT  
Name: _dnsauth.iou
Value: [krijg je van Azure Portal → Custom domains]
```

#### In Azure Portal

1. Static Web App → Custom domains
2. "+ Add" → Custom domain on other DNS
3. Voer in: `iou.open-regels.nl`
4. Kopieer de TXT record
5. Voeg toe bij DNS provider
6. Wacht 5-10 minuten
7. Klik "Validate"

---

## 📊 Verwachte Resultaten

### Lokaal
✅ Drie werkende tabs  
✅ 19 requirements in tabel  
✅ Filters werken  
✅ Graph visualiseert relaties  
✅ Geen console errors

### Azure Deployment  
✅ Site bereikbaar via Azure URL  
✅ HTTPS automatisch actief  
✅ Alle functionaliteit werkt  
✅ Snelle laadtijd (<1 sec)

### Custom Domain
✅ iou.open-regels.nl bereikbaar  
✅ Automatisch HTTPS certificaat  
✅ Redirects van HTTP → HTTPS  
✅ Wereldwijd beschikbaar

---

## 🐛 Troubleshooting

### "python3: command not found"
```bash
# Probeer python in plaats van python3
python -m http.server 8000
```

### "git: command not found"
Download Git: https://git-scm.com/downloads

### Azure deployment faalt
1. Check GitHub token in Secrets
2. Verifieer workflow file bestaat
3. Bekijk Actions tab voor logs

### Site toont 404
1. Verifieer app_location is `/`
2. Check of index.html in root staat
3. Re-deploy via GitHub push

### Custom domain werkt niet
```bash
# Check DNS propagatie
nslookup iou.open-regels.nl

# Moet verwijzen naar Azure URL
# Wacht langer als het nog niet werkt (tot 24u)
```

---

## 📞 Hulp Nodig?

**Documentatie**:
- Zie `README.md` voor project overview
- Zie `DEPLOYMENT.md` voor uitgebreide deployment gids
- Zie `PROJECT-OVERVIEW.md` voor complete feature lijst

**Online Resources**:
- Azure SWA Docs: https://learn.microsoft.com/azure/static-web-apps/
- GitHub Issues: https://github.com/JOUW-USERNAME/lelystad-demo/issues

---

## ✨ Volgende Stappen

Na succesvolle deployment:

1. **Deel met Stakeholders**
   ```
   "Kijk naar onze nieuwe demonstrator: https://iou.open-regels.nl
   
   Dit toont hoe we compliance, coördinatie en kennisbeheer 
   kunnen integreren voor het Ringweg project."
   ```

2. **Verzamel Feedback**
   - Wat werkt goed?
   - Wat ontbreekt?
   - Welke use cases zijn prioriteit?

3. **Plan Iteratie 2**
   - Meer requirements toevoegen
   - Real map integratie
   - TriplyDB connectie

---

**Je bent klaar om te starten! 🎉**

Succes met je demonstrator!
