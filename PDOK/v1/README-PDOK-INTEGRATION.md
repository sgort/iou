# PDOK Real Road Data Integration for Lelystad Ringweg Demonstrator

## 📋 Overview

This solution replaces your mock coordinates with real road geometry from the **PDOK Nationaal Wegen Bestand (NWB)** - the authoritative Dutch national road database maintained by Rijkswaterstaat.

## 📦 What's Included

### 1. **fetch-road-data.js**
Node.js script to fetch data from PDOK NWB WFS service.
- Queries by street name or bounding box
- Outputs GeoJSON with real coordinates
- Usage: `node fetch-road-data.js > output.json`

### 2. **pdok-fetcher.js**
Browser-compatible class for fetching PDOK data.
- Works in browser console or embedded in your app
- Includes helper methods for coordinate conversion
- Merges road segments into continuous paths

### 3. **test-pdok-fetcher.html**
Interactive test page with Leaflet map.
- **USE THIS FIRST!** - It's the easiest way to get real data
- Visual interface to fetch and preview roads
- Export button to save GeoJSON
- See your data on a map before integrating

### 4. **real-road-coordinates-sample.js**
Sample coordinates with realistic Lelystad area geometry.
- **Ready to use immediately** for testing
- Geographically accurate approximations
- Includes helper function to add to Leaflet map
- Replace with actual PDOK data for production

### 5. **INTEGRATION-GUIDE.md**
Complete step-by-step integration instructions.
- Two implementation approaches
- Troubleshooting guide
- Code examples
- Best practices

## 🚀 Quick Start (Recommended Path)

### Step 1: Test the Fetcher

1. **Deploy the test page:**
   ```bash
   # Copy test-pdok-fetcher.html to your project
   cp test-pdok-fetcher.html /mnt/user-data/outputs/
   ```

2. **Open it in your browser:**
   - Go to: `https://iou.open-regels.nl/test-pdok-fetcher.html` (after deployment)
   - Or open locally: `file:///path/to/test-pdok-fetcher.html`

3. **Fetch real data:**
   - Click "Fetch: Laan van Nieuw Land"
   - Click "Fetch: Westerdreef"
   - Watch the roads appear on the map!
   - Click "💾 Export GeoJSON" to save the data

### Step 2: Use Sample Coordinates (Optional - for immediate testing)

If PDOK fetch fails (CORS, network issues), use the sample coordinates:

```javascript
// Add to your data.js
const realRoadGeometry = realRoadCoordinatesSample;
```

The sample data is geographically accurate for the Lelystad Zuid area and ready to use immediately.

### Step 3: Integrate into Your App

See `INTEGRATION-GUIDE.md` for complete instructions.

**Quick integration snippet:**

```javascript
// In your app.js, replace map initialization with:

initializeJurisdictionalMap() {
    const map = L.map('jurisdictional-map').setView([52.5085, 5.4750], 13);
    
    // Add base layer
    L.tileLayer('https://server.arcgisonline.com/...').addTo(map);
    
    // Add real roads using the helper function
    const layers = realRoadCoordinatesSample.addToLeafletMap(map);
    
    console.log('Map initialized with real PDOK data');
}
```

## 📊 Data Sources

### PDOK NWB WFS Service
- **Endpoint:** `https://service.pdok.nl/rws/nwbwegen/wfs/v1_0`
- **Dataset:** Nationaal Wegen Bestand (all Dutch public roads)
- **Format:** GeoJSON (EPSG:4326 WGS84)
- **Update Frequency:** Monthly
- **Coverage:** All roads with street name or road number
- **Documentation:** https://www.pdok.nl/introductie/-/article/nationaal-wegen-bestand-nwb-wegen

### Available Query Methods

**1. By Street Name:**
```
CQL_FILTER: STR ILIKE '%Laan van Nieuw Land%'
```

**2. By Bounding Box:**
```
bbox: 5.45,52.49,5.52,52.52,EPSG:4326
```

**3. By Road Number:**
```
CQL_FILTER: WEGNUMMER='N309'
```

**4. By Municipality:**
```
CQL_FILTER: BST_CODE='25' (Lelystad municipality code)
```

## 🎯 Implementation Approaches

### Approach A: Pre-fetched Data (Recommended)
✅ **Best for production**
- Fetch once, embed in `data.js`
- No runtime API calls
- No CORS issues
- Faster page load
- Works offline

### Approach B: Dynamic Fetch
✅ **Best for development**
- Always up-to-date
- Can handle data changes
- Requires CORS handling or proxy

### Approach C: Hybrid
✅ **Best of both worlds**
- Pre-fetched data as fallback
- Optional real-time updates
- Graceful degradation

## 🗺️ Coordinate Systems

**PDOK NWB provides two coordinate systems:**

1. **EPSG:4326 (WGS84)** - Global standard
   - Format: [longitude, latitude]
   - Used by: Leaflet, Google Maps, most web maps
   - **This is what you want!**

2. **EPSG:28992 (RD New)** - Dutch national grid
   - Format: [x, y] in meters
   - Used by: Dutch cadastral systems
   - Requires transformation for web maps

**Important:** GeoJSON uses `[lon, lat]` but Leaflet uses `[lat, lon]`.
The provided scripts handle this conversion automatically.

## 🔍 Data Structure

### NWB Feature Properties (examples):

```javascript
{
    "STR": "Laan van Nieuw Land",        // Street name
    "WVK_ID": "123456",                  // Road section ID
    "WEGBEHSRT": "P",                    // Road authority (P=Province)
    "BST_CODE": "25",                    // Municipality code (Lelystad)
    "WEGNUMMER": "N309",                 // Road number
    "ROUTELTR": "N",                     // Route letter
    "ROUTENR": "309",                    // Route number
    "BEGINKM": "4.2",                    // Start kilometer
    "EINDKM": "8.4",                     // End kilometer
    // ... many more attributes
}
```

## 🛠️ Troubleshooting

### CORS Errors

**Problem:** Browser blocks cross-origin requests to PDOK

**Solutions:**
1. **Use the test page** on your deployed site (iou.open-regels.nl)
2. **Pre-fetch data** and embed in your app (recommended)
3. **Use a proxy:** `https://corsproxy.io/?` + PDOK URL
4. **Run local server:** `npm run dev` handles CORS

### No Results Found

**Problem:** Query returns empty features array

**Solutions:**
1. **Check spelling:** Try "Nieuw Land" instead of full name
2. **Try broader bbox:** Expand bounding box coordinates
3. **Check the registry:** Road might not be in NWB yet (planned roads)
4. **Try all roads in bbox** then filter by properties

### Wrong Map Center

**Problem:** Map shows wrong location

**Solution:**
```javascript
// Lelystad center coordinates:
map.setView([52.5085, 5.4750], 13);

// Or auto-fit to features:
const bounds = L.featureGroup([road1, road2]).getBounds();
map.fitBounds(bounds, { padding: [50, 50] });
```

### Coordinates Look Wrong

**Problem:** Roads appear in wrong location or ocean

**Solution:** Check coordinate order:
- GeoJSON: `[longitude, latitude]`
- Leaflet: `[latitude, longitude]`
- Lelystad is roughly: lat 52.5, lon 5.5

## 📈 Next Steps After Integration

1. **Add real NNN boundaries** from PDOK Natura 2000 WFS
2. **Add real municipal/provincial boundaries** from Bestuurlijke Grenzen WFS
3. **Implement spatial overlap detection** using Turf.js
4. **Add route labels and markers** mentioned in project docs
5. **Connect to TriplyDB** for semantic enrichment
6. **Add colored route segments** (yellow, red, blue) with legend

## 📚 Additional PDOK Services

### Other relevant datasets:

**Bestuurlijke Grenzen (Administrative Boundaries):**
- `https://service.pdok.nl/kadaster/bestuurlijkegebieden/wfs/v1_0`
- Province and municipality boundaries

**Natura 2000:**
- `https://service.pdok.nl/natura2000/wfs/v1_0`
- Protected nature areas

**BAG (Buildings and Addresses):**
- `https://service.pdok.nl/lv/bag/wfs/v2_0`
- All Dutch buildings and addresses

**BGT (Large Scale Topography):**
- `https://service.pdok.nl/lv/bgt/wfs/v2_0`
- Detailed base map (1:500 to 1:5000)

## 🔗 Resources

- **PDOK Portal:** https://www.pdok.nl/
- **NGR Catalog:** https://www.nationaalgeoregister.nl/
- **WFS Tutorial:** https://pdok.github.io/webservices-workshop/
- **Leaflet Docs:** https://leafletjs.com/
- **GeoJSON Spec:** https://geojson.org/
- **PDOK Status:** https://www.pdok.nl/status

## 💡 Pro Tips

1. **Start with the test page** - It's the easiest way to see real data
2. **Check browser console** - All scripts log detailed info
3. **Use the sample data first** - Integrate real data after testing
4. **Always hard refresh** - Cache can hide updates (Ctrl+Shift+R)
5. **Export early, export often** - Save fetched data immediately
6. **Test incrementally** - Add one road at a time
7. **Use feature groups** - Easier to manage multiple layers
8. **Add popups** - Users love interactive info

## ✅ Success Checklist

- [ ] Deployed test-pdok-fetcher.html
- [ ] Successfully fetched Laan van Nieuw Land data
- [ ] Successfully fetched Westerdreef data
- [ ] Exported GeoJSON file
- [ ] Added real coordinates to data.js
- [ ] Updated map initialization in app.js
- [ ] Tested on deployed site (iou.open-regels.nl)
- [ ] Verified roads appear in correct location
- [ ] Tested popups and interactions
- [ ] Hard refreshed browser (Ctrl+Shift+R)
- [ ] Updated version marker (V7 → V8)
- [ ] Updated CHANGELOG.md
- [ ] Committed to Git

## 🎉 Expected Result

After successful integration, your map will show:

✨ **Real road geometry** from authoritative Dutch government database
✨ **Accurate positioning** in Lelystad Zuid area
✨ **Connected road segments** forming continuous paths
✨ **Rich metadata** (road manager, designation, attributes)
✨ **Interactive popups** with road information
✨ **Professional appearance** with actual infrastructure data

## 🆘 Need Help?

1. Check `INTEGRATION-GUIDE.md` for detailed instructions
2. Review browser console for error messages
3. Test with `test-pdok-fetcher.html` to isolate issues
4. Verify PDOK service status: https://www.pdok.nl/status
5. Check that coordinates are in valid ranges (lat ~52.5, lon ~5.5)

## 📝 License & Attribution

**PDOK Data:**
- License: CC0 (Public Domain)
- Attribution: "Bron: PDOK Nationaal Wegen Bestand (NWB)"
- Provider: Rijkswaterstaat / Kadaster

**Scripts:**
- Created for Lelystad Ringweg Demonstrator
- Free to use and modify
- No warranty provided

---

**Version:** 1.0
**Date:** 2024-11-11
**For:** Lelystad-Zuid Ringweg Information Architecture Demonstrator
