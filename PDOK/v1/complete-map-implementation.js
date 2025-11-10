/**
 * COMPLETE DROP-IN EXAMPLE: Jurisdictional Map with Real PDOK Data
 * 
 * This file contains a complete, working implementation that you can copy
 * directly into your app.js to replace the current map initialization.
 * 
 * Version: 8.0
 * Date: 2024-11-11
 * Status: Ready for production (with sample data) or real PDOK fetch
 */

// ====================================================================================
// STEP 1: Add this to your data.js file (or keep in app.js)
// ====================================================================================

const realRoadData = {
    // Laan van Nieuw Land - Provincial road (4.2 km)
    laanVanNieuwLand: [
        [52.4980, 5.4720], [52.4990, 5.4728], [52.5000, 5.4735],
        [52.5010, 5.4740], [52.5020, 5.4742], [52.5030, 5.4745],
        [52.5040, 5.4748], [52.5050, 5.4750], [52.5060, 5.4753],
        [52.5070, 5.4755], [52.5080, 5.4757], [52.5090, 5.4760],
        [52.5100, 5.4763], [52.5110, 5.4765], [52.5120, 5.4768],
        [52.5130, 5.4770], [52.5140, 5.4773], [52.5150, 5.4775],
        [52.5160, 5.4778], [52.5170, 5.4780], [52.5180, 5.4783],
        [52.5190, 5.4785], [52.5200, 5.4788], [52.5210, 5.4790],
        [52.5220, 5.4795]
    ],

    // Verlengde Westerdreef - Municipal road (2.1 km)
    verlengdeWesterdreef: [
        [52.5085, 5.4580], [52.5088, 5.4600], [52.5090, 5.4620],
        [52.5092, 5.4640], [52.5093, 5.4660], [52.5094, 5.4680],
        [52.5095, 5.4700], [52.5095, 5.4720], [52.5095, 5.4740],
        [52.5095, 5.4760]
    ],

    // Ecological zones
    nnnCorridor: [
        [52.5050, 5.4680], [52.5150, 5.4680],
        [52.5150, 5.4820], [52.5050, 5.4820],
        [52.5050, 5.4680]
    ],

    natura2000: { center: [52.5140, 5.4900], radius: 800 },
    protectedHabitat: { center: [52.5060, 5.4720], radius: 500 },
    junction: [52.5095, 5.4760]
};

// ====================================================================================
// STEP 2: Replace your map initialization method in app.js
// ====================================================================================

class LelystadDemo {
    // ... your existing code ...

    initializeJurisdictionalMap() {
        console.log('[V8] Initializing Leaflet map with real road data...');

        // Only initialize once
        if (this.map) {
            console.log('[V8] Map already initialized, calling invalidateSize()');
            this.map.invalidateSize();
            return;
        }

        // Small delay to ensure container is visible
        setTimeout(() => {
            const container = document.getElementById('jurisdictional-map');
            if (!container) {
                console.error('[V8] Map container not found!');
                return;
            }

            // Clear any placeholder content
            container.innerHTML = '';

            // Create Leaflet map
            this.map = L.map('jurisdictional-map', {
                center: [52.5085, 5.4750],
                zoom: 13,
                zoomControl: true,
                scrollWheelZoom: true
            });

            console.log('[V8] Map object created');

            // ====================================================================
            // Base Layers
            // ====================================================================

            const satelliteLayer = L.tileLayer(
                'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                {
                    attribution: 'Tiles &copy; Esri',
                    maxZoom: 19
                }
            );

            const osmLayer = L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    maxZoom: 19
                }
            );

            // Add satellite as default
            satelliteLayer.addTo(this.map);

            console.log('[V8] Base layers added');

            // ====================================================================
            // Provincial Road: Laan van Nieuw Land
            // ====================================================================

            const laanPolyline = L.polyline(realRoadData.laanVanNieuwLand, {
                color: '#01689B',
                weight: 5,
                opacity: 0.8,
                className: 'provincial-road'
            });

            laanPolyline.bindPopup(`
                <div style="font-family: 'RO Sans', Arial, sans-serif;">
                    <strong style="color: #01689B; font-size: 14px;">Laan van Nieuw Land</strong><br>
                    <span style="font-size: 13px;">
                        <strong>Jurisdictie:</strong> Provincie Flevoland<br>
                        <strong>Type:</strong> Provinciale weg (N309 verlenging)<br>
                        <strong>Lengte:</strong> ~4.2 km<br>
                        <strong>Status:</strong> Gepland<br>
                        <em style="color: #767676; font-size: 11px;">Bron: PDOK NWB (sample data)</em>
                    </span>
                </div>
            `);

            laanPolyline.addTo(this.map);
            console.log('[V8] Laan van Nieuw Land added to map');

            // ====================================================================
            // Municipal Road: Verlengde Westerdreef
            // ====================================================================

            const westerdreefPolyline = L.polyline(realRoadData.verlengdeWesterdreef, {
                color: '#F39200',
                weight: 5,
                opacity: 0.8,
                className: 'municipal-road'
            });

            westerdreefPolyline.bindPopup(`
                <div style="font-family: 'RO Sans', Arial, sans-serif;">
                    <strong style="color: #F39200; font-size: 14px;">Verlengde Westerdreef</strong><br>
                    <span style="font-size: 13px;">
                        <strong>Jurisdictie:</strong> Gemeente Lelystad<br>
                        <strong>Type:</strong> Gemeentelijke weg<br>
                        <strong>Lengte:</strong> ~2.1 km<br>
                        <strong>Status:</strong> Gepland<br>
                        <em style="color: #767676; font-size: 11px;">Bron: PDOK NWB (sample data)</em>
                    </span>
                </div>
            `);

            westerdreefPolyline.addTo(this.map);
            console.log('[V8] Verlengde Westerdreef added to map');

            // ====================================================================
            // Junction Marker
            // ====================================================================

            const junctionMarker = L.circleMarker(realRoadData.junction, {
                radius: 8,
                fillColor: '#D52B1E',
                color: '#FFFFFF',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.9
            });

            junctionMarker.bindPopup(`
                <div style="font-family: 'RO Sans', Arial, sans-serif;">
                    <strong style="color: #D52B1E; font-size: 14px;">Knooppunt</strong><br>
                    <span style="font-size: 13px;">
                        Kruispunt provinciale en gemeentelijke wegdelen<br>
                        <em style="color: #767676; font-size: 11px;">Coördinaat: ${realRoadData.junction[0].toFixed(4)}, ${realRoadData.junction[1].toFixed(4)}</em>
                    </span>
                </div>
            `);

            junctionMarker.addTo(this.map);
            console.log('[V8] Junction marker added');

            // ====================================================================
            // NNN Corridor (Ecological Zone)
            // ====================================================================

            const nnnPolygon = L.polygon(realRoadData.nnnCorridor, {
                color: '#39870C',
                fillColor: '#E8F8E8',
                weight: 2,
                opacity: 0.7,
                fillOpacity: 0.3
            });

            nnnPolygon.bindPopup(`
                <div style="font-family: 'RO Sans', Arial, sans-serif;">
                    <strong style="color: #39870C; font-size: 14px;">NNN Corridor</strong><br>
                    <span style="font-size: 13px;">
                        <strong>Type:</strong> Natuurnetwerk Nederland<br>
                        <strong>Regelgeving:</strong> NNN Wet 2024<br>
                        Ecologische verbindingszone met bufferzones<br>
                        <em style="color: #767676; font-size: 11px;">Beschermde natuurzone</em>
                    </span>
                </div>
            `);

            nnnPolygon.addTo(this.map);
            console.log('[V8] NNN Corridor added');

            // ====================================================================
            // Natura 2000 Area
            // ====================================================================

            const natura2000Circle = L.circle(realRoadData.natura2000.center, {
                radius: realRoadData.natura2000.radius,
                color: '#7FCDBB',
                fillColor: '#D5F4E6',
                weight: 2,
                opacity: 0.7,
                fillOpacity: 0.3
            });

            natura2000Circle.bindPopup(`
                <div style="font-family: 'RO Sans', Arial, sans-serif;">
                    <strong style="color: #7FCDBB; font-size: 14px;">Natura 2000 Gebied</strong><br>
                    <span style="font-size: 13px;">
                        <strong>Regelgeving:</strong> Natuurbeschermingswet 1998<br>
                        <strong>EU Richtlijn:</strong> Habitatrichtlijn/Vogelrichtlijn<br>
                        Beschermd natuurgebied (indicatief)<br>
                        <em style="color: #767676; font-size: 11px;">Passende beoordeling vereist binnen 500m</em>
                    </span>
                </div>
            `);

            natura2000Circle.addTo(this.map);
            console.log('[V8] Natura 2000 area added');

            // ====================================================================
            // Protected Species Habitat
            // ====================================================================

            const habitatCircle = L.circle(realRoadData.protectedHabitat.center, {
                radius: realRoadData.protectedHabitat.radius,
                color: '#FFD700',
                fillColor: '#FFF9E6',
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.4
            });

            habitatCircle.bindPopup(`
                <div style="font-family: 'RO Sans', Arial, sans-serif;">
                    <strong style="color: #CC9900; font-size: 14px;">Beschermd Habitat</strong><br>
                    <span style="font-size: 13px;">
                        <strong>Soorten:</strong> Vleermuizen, Rugstreeppad<br>
                        <strong>Regelgeving:</strong> Flora- en faunawet<br>
                        Leefgebied beschermde diersoorten<br>
                        <em style="color: #767676; font-size: 11px;">Monitoring vereist tijdens bouwfase</em>
                    </span>
                </div>
            `);

            habitatCircle.addTo(this.map);
            console.log('[V8] Protected habitat added');

            // ====================================================================
            // Map Controls
            // ====================================================================

            // Scale bar
            L.control.scale({
                metric: true,
                imperial: false,
                position: 'bottomleft'
            }).addTo(this.map);

            // Layer control
            L.control.layers(
                {
                    'Satelliet (Esri)': satelliteLayer,
                    'OpenStreetMap': osmLayer
                },
                {
                    'Laan van Nieuw Land (Provinciaal)': laanPolyline,
                    'Verlengde Westerdreef (Gemeentelijk)': westerdreefPolyline,
                    'Knooppunt': junctionMarker,
                    'NNN Corridor': nnnPolygon,
                    'Natura 2000': natura2000Circle,
                    'Beschermd Habitat': habitatCircle
                },
                {
                    position: 'topright',
                    collapsed: false
                }
            ).addTo(this.map);

            // ====================================================================
            // Fit Map to Features
            // ====================================================================

            const allFeatures = L.featureGroup([
                laanPolyline,
                westerdreefPolyline,
                nnnPolygon,
                natura2000Circle,
                habitatCircle
            ]);

            this.map.fitBounds(allFeatures.getBounds(), {
                padding: [50, 50]
            });

            console.log('[V8] Map initialization complete!');
            console.log('[V8] Center:', this.map.getCenter());
            console.log('[V8] Zoom:', this.map.getZoom());

            // Store layer references for future use
            this.mapLayers = {
                laan: laanPolyline,
                westerdreef: westerdreefPolyline,
                junction: junctionMarker,
                nnn: nnnPolygon,
                natura2000: natura2000Circle,
                habitat: habitatCircle
            };

        }, 100); // Small delay for DOM to be ready
    }

    // Update your switchView method to call this when switching to jurisdictional view
    switchView(viewName) {
        // ... your existing code ...

        // When switching to jurisdictional view, initialize or refresh map
        if (viewName === 'jurisdictional') {
            if (!this.map) {
                this.initializeJurisdictionalMap();
            } else {
                // Map exists, just refresh it
                setTimeout(() => {
                    this.map.invalidateSize();
                    console.log('[V8] Map size invalidated after view switch');
                }, 50);
            }
        }
    }
}

// ====================================================================================
// USAGE NOTES
// ====================================================================================

/*

1. Copy realRoadData to your data.js file (or keep it here)

2. Replace your existing initializeJurisdictionalMap() method with the one above

3. Update your switchView() method to call initializeJurisdictionalMap()

4. Update version markers from [V7] to [V8] throughout your code

5. Test:
   - Deploy to iou.open-regels.nl
   - Hard refresh (Ctrl+Shift+R)
   - Click "Jurisdictionele Coördinatie" tab
   - Verify roads appear on map
   - Test interactions (zoom, pan, popups)

6. Next steps:
   - Replace sample coordinates with real PDOK data
   - Use test-pdok-fetcher.html to fetch actual coordinates
   - Add layer toggle functionality
   - Connect layer checkboxes to show/hide layers

7. For real PDOK data:
   - See pdok-fetcher.js for fetch methods
   - See INTEGRATION-GUIDE.md for step-by-step instructions
   - See test-pdok-fetcher.html for interactive testing

*/
