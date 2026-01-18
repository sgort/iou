# Replacing Mock Coordinates with Real PDOK GeoJSON Data

## Overview

This guide explains how to replace the mock coordinates in your Lelystad Ringweg demonstrator with real road geometry from the PDOK Nationaal Wegen Bestand (NWB) WFS service.

## Data Source

**PDOK NWB WFS Service:**
- Endpoint: `https://service.pdok.nl/rws/nwbwegen/wfs/v1_0`
- Dataset: Nationaal Wegen Bestand (NWB) - All public roads in Netherlands
- Format: GeoJSON (EPSG:4326 WGS84)
- Documentation: https://www.pdok.nl/introductie/-/article/nationaal-wegen-bestand-nwb-wegen

## Approach Options

### Option 1: Pre-fetch Data (Recommended for Production)

Fetch the real road data once and embed it in your `data.js` file:

**Steps:**
1. Use the provided `pdok-fetcher.js` script in browser console
2. Save the GeoJSON data
3. Update `data.js` with real coordinates
4. No runtime API calls needed

**Advantages:**
- ✅ No CORS issues
- ✅ Faster page load
- ✅ Works offline
- ✅ Predictable performance

### Option 2: Dynamic Fetch (For Development)

Fetch data dynamically when the map loads:

**Advantages:**
- ✅ Always up-to-date data
- ✅ Can handle data updates

**Disadvantages:**
- ❌ Requires CORS or proxy
- ❌ Slower initial load
- ❌ Depends on PDOK service availability

## Implementation Steps

### Step 1: Fetch Real Data

Run this in your browser console on your development site:

```javascript
// Copy pdok-fetcher.js content or load it as a script

const fetcher = new PDOKRoadDataFetcher();
const data = await fetcher.fetchLelystadRoads();

// View the data
console.log('Complete data:', data);

// Get Leaflet-compatible coordinates
const laanCoords = fetcher.mergeRoadSegments(
    data.roads.laanVanNieuwLand.features
);
const westerdreefCoords = fetcher.mergeRoadSegments(
    data.roads.westerdreef.features
);

console.log('Laan van Nieuw Land coordinates:', laanCoords);
console.log('Westerdreef coordinates:', westerdreefCoords);

// Copy these arrays to use in data.js
copy(JSON.stringify({ laanCoords, westerdreefCoords }, null, 2));
```

### Step 2: Update data.js

Add a new section to `data.js` with real road geometry:

```javascript
// Real road geometry from PDOK NWB (EPSG:4326)
const realRoadGeometry = {
    // Laan van Nieuw Land (Provincial road - 4.2 km)
    laanVanNieuwLand: {
        type: 'LineString',
        coordinates: [
            // [lat, lon] format for Leaflet
            // REPLACE WITH ACTUAL COORDINATES FROM STEP 1
            [52.5085, 5.4750],
            [52.5095, 5.4765],
            // ... more coordinates
        ],
        properties: {
            name: 'Laan van Nieuw Land',
            jurisdiction: 'Provincie Flevoland',
            length_km: 4.2,
            source: 'PDOK NWB',
            color: '#01689B' // Provincial blue
        }
    },
    
    // Verlengde Westerdreef (Municipal road - 2.1 km)
    verlengdeWesterdreef: {
        type: 'LineString',
        coordinates: [
            // [lat, lon] format for Leaflet
            // REPLACE WITH ACTUAL COORDINATES FROM STEP 1
            [52.5115, 5.4850],
            [52.5125, 5.4865],
            // ... more coordinates
        ],
        properties: {
            name: 'Verlengde Westerdreef',
            jurisdiction: 'Gemeente Lelystad',
            length_km: 2.1,
            source: 'PDOK NWB',
            color: '#F39200' // Municipal orange
        }
    }
};
```

### Step 3: Update Map Initialization in app.js

Find where you currently initialize the Leaflet map (likely around line 200-300 in app.js) and update it to use real coordinates:

```javascript
initializeJurisdictionalMap() {
    console.log('[V8] Initializing map with real PDOK data...');
    
    // Wait for the view to be visible
    setTimeout(() => {
        const mapContainer = document.getElementById('jurisdictional-map');
        if (!mapContainer) return;
        
        // Clear placeholder
        mapContainer.innerHTML = '';
        
        // Create Leaflet map
        this.map = L.map('jurisdictional-map').setView([52.5085, 5.4750], 13);
        
        // Add base layers
        const satelliteLayer = L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: 'Esri',
                maxZoom: 19
            }
        );
        
        const osmLayer = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution: '© OpenStreetMap'
            }
        );
        
        satelliteLayer.addTo(this.map);
        
        // Add REAL road geometry from PDOK
        const laanPolyline = L.polyline(
            realRoadGeometry.laanVanNieuwLand.coordinates,
            {
                color: realRoadGeometry.laanVanNieuwLand.properties.color,
                weight: 5,
                opacity: 0.8
            }
        ).addTo(this.map);
        
        laanPolyline.bindPopup(`
            <strong>${realRoadGeometry.laanVanNieuwLand.properties.name}</strong><br>
            Jurisdictie: ${realRoadGeometry.laanVanNieuwLand.properties.jurisdiction}<br>
            Lengte: ${realRoadGeometry.laanVanNieuwLand.properties.length_km} km<br>
            <em>Bron: ${realRoadGeometry.laanVanNieuwLand.properties.source}</em>
        `);
        
        const westerdreefPolyline = L.polyline(
            realRoadGeometry.verlengdeWesterdreef.coordinates,
            {
                color: realRoadGeometry.verlengdeWesterdreef.properties.color,
                weight: 5,
                opacity: 0.8
            }
        ).addTo(this.map);
        
        westerdreefPolyline.bindPopup(`
            <strong>${realRoadGeometry.verlengdeWesterdreef.properties.name}</strong><br>
            Jurisdictie: ${realRoadGeometry.verlengdeWesterdreef.properties.jurisdiction}<br>
            Lengte: ${realRoadGeometry.verlengdeWesterdreef.properties.length_km} km<br>
            <em>Bron: ${realRoadGeometry.verlengdeWesterdreef.properties.source}</em>
        `);
        
        // Fit map to show both roads
        const bounds = L.featureGroup([laanPolyline, westerdreefPolyline]).getBounds();
        this.map.fitBounds(bounds, { padding: [50, 50] });
        
        // Add scale
        L.control.scale().addTo(this.map);
        
        // Add layer control
        L.control.layers(
            {
                'Satelliet': satelliteLayer,
                'OpenStreetMap': osmLayer
            },
            {},
            { position: 'topright' }
        ).addTo(this.map);
        
        console.log('[V8] Map initialized with real PDOK geometry');
    }, 50);
}
```

## Alternative: WFS Layer Integration

For truly dynamic data, you can use a Leaflet WFS plugin or fetch on-demand:

```javascript
async loadRoadFromPDOK(roadName) {
    const url = 'https://service.pdok.nl/rws/nwbwegen/wfs/v1_0';
    const params = new URLSearchParams({
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        typeName: 'nwbwegen:wegvakken',
        outputFormat: 'application/json',
        CQL_FILTER: `STR ILIKE '%${roadName}%'`,
        srsName: 'EPSG:4326'
    });
    
    const response = await fetch(`${url}?${params}`);
    const geoJson = await response.json();
    
    // Add to map
    L.geoJSON(geoJson, {
        style: (feature) => ({
            color: roadName.includes('Laan') ? '#01689B' : '#F39200',
            weight: 5,
            opacity: 0.8
        })
    }).addTo(this.map);
}
```

## Expected Data Format

The PDOK NWB returns features like this:

```json
{
    "type": "Feature",
    "geometry": {
        "type": "LineString",
        "coordinates": [
            [5.4750, 52.5085],  // [lon, lat] in WGS84
            [5.4765, 52.5095],
            [5.4780, 52.5105]
        ]
    },
    "properties": {
        "STR": "Laan van Nieuw Land",
        "WVK_ID": "123456",
        "WEGBEHSRT": "P",  // P = Province
        "BST_CODE": "25",   // Municipality code
        // ... many more attributes
    }
}
```

## Troubleshooting

### CORS Issues

If you encounter CORS errors when fetching from PDOK:

**Solution 1: Use a proxy**
```javascript
const proxyUrl = 'https://corsproxy.io/?';
const pdokUrl = 'https://service.pdok.nl/rws/nwbwegen/wfs/v1_0?...';
fetch(proxyUrl + encodeURIComponent(pdokUrl))
```

**Solution 2: Pre-fetch (Recommended)**
Just save the GeoJSON and embed it in your application.

### No Results Found

If the query returns empty results:

1. Check street name spelling
2. Try broader bbox query
3. Verify the road is in NWB database
4. Try searching for partial names: "Nieuw Land" instead of "Laan van Nieuw Land"

### Wrong Coordinate Format

- **GeoJSON format**: `[longitude, latitude]`
- **Leaflet format**: `[latitude, longitude]`

Always convert when loading GeoJSON into Leaflet.

## Testing

After implementation:

1. **Hard refresh** your browser (Ctrl+Shift+R)
2. Check console for `[V8]` markers
3. Verify coordinates are in Lelystad area (lat ~52.50, lon ~5.47)
4. Test map interactions (zoom, pan, popups)
5. Verify roads render as connected polylines

## Benefits of Real Data

✅ **Accurate**: Exact road geometry from authoritative source
✅ **Complete**: All road segments included
✅ **Maintained**: NWB updated monthly by Rijkswaterstaat
✅ **Rich metadata**: Road manager, type, municipality codes
✅ **Standardized**: Follows Dutch geo standards
✅ **Interoperable**: Can connect to other PDOK services

## Next Steps

After implementing real road coordinates:

1. **Add real NNN/Natura 2000 boundaries** from PDOK
2. **Add real municipal/provincial boundaries** from Bestuurlijke Grenzen WFS
3. **Implement spatial queries** to detect actual overlaps
4. **Add labels and markers** for locations mentioned in project docs
5. **Connect to TriplyDB** for semantic enrichment

## Resources

- PDOK NWB Docs: https://www.pdok.nl/introductie/-/article/nationaal-wegen-bestand-nwb-wegen
- WFS Tutorial: https://pdok.github.io/webservices-workshop/
- Leaflet Docs: https://leafletjs.com/reference.html
- GeoJSON Spec: https://geojson.org/

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify PDOK service status: https://www.pdok.nl/status
3. Test WFS queries directly in browser
4. Check coordinate transformations (WGS84 vs RD)
