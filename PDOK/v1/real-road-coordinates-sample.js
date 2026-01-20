/**
 * SAMPLE Real Road Coordinates for Lelystad Ringweg Project
 * 
 * These are geographically realistic coordinates for the Lelystad Zuid area.
 * NOTE: These are approximations based on the Lelystad area geography.
 * For production use, fetch actual data from PDOK NWB using the provided scripts.
 * 
 * Coordinate System: EPSG:4326 (WGS84) - [latitude, longitude]
 * Format: Leaflet-compatible [lat, lon] arrays
 * 
 * Source: Approximated for demonstration purposes
 * Replace with actual PDOK NWB data for production!
 */

const realRoadCoordinatesSample = {
    metadata: {
        source: 'Sample coordinates for demonstration',
        note: 'Replace with actual PDOK NWB data for production',
        crs: 'EPSG:4326 (WGS84)',
        center: [52.5085, 5.4750],
        date: '2026-11-11',
        production_ready: false
    },

    // Laan van Nieuw Land - Provincial road section (approx 4.2 km)
    // Runs roughly north-south through Lelystad Zuid
    laanVanNieuwLand: {
        type: 'LineString',
        coordinates: [
            // Southern starting point (near Warande)
            [52.4980, 5.4720],
            [52.4990, 5.4728],
            [52.5000, 5.4735],
            [52.5010, 5.4740],
            [52.5020, 5.4742],
            [52.5030, 5.4745],
            [52.5040, 5.4748],
            [52.5050, 5.4750],
            [52.5060, 5.4753],
            [52.5070, 5.4755],
            [52.5080, 5.4757],
            [52.5090, 5.4760],
            [52.5100, 5.4763],
            [52.5110, 5.4765],
            [52.5120, 5.4768],
            [52.5130, 5.4770],
            [52.5140, 5.4773],
            [52.5150, 5.4775],
            [52.5160, 5.4778],
            [52.5170, 5.4780],
            [52.5180, 5.4783],
            [52.5190, 5.4785],
            [52.5200, 5.4788],
            [52.5210, 5.4790],
            // Northern end point (near connection to N309)
            [52.5220, 5.4795]
        ],
        properties: {
            name: 'Laan van Nieuw Land',
            road_type: 'Provincial',
            jurisdiction: 'Provincie Flevoland',
            length_km: 4.2,
            lanes: 2,
            status: 'planned',
            color: '#01689B',
            weight: 5,
            opacity: 0.8,
            designation: 'N309 (planned extension)',
            description: 'Provinciale rondweg zuidzijde Lelystad',
            source: 'Sample data - replace with PDOK NWB'
        }
    },

    // Verlengde Westerdreef - Municipal road section (approx 2.1 km)
    // Runs east-west connecting to the Laan van Nieuw Land
    verlengdeWesterdreef: {
        type: 'LineString',
        coordinates: [
            // Western start (connection to existing Westerdreef)
            [52.5085, 5.4580],
            [52.5088, 5.4600],
            [52.5090, 5.4620],
            [52.5092, 5.4640],
            [52.5093, 5.4660],
            [52.5094, 5.4680],
            [52.5095, 5.4700],
            [52.5095, 5.4720],
            [52.5095, 5.4740],
            // Eastern end (junction with Laan van Nieuw Land)
            [52.5095, 5.4760]
        ],
        properties: {
            name: 'Verlengde Westerdreef',
            road_type: 'Municipal',
            jurisdiction: 'Gemeente Lelystad',
            length_km: 2.1,
            lanes: 2,
            status: 'planned',
            color: '#F39200',
            weight: 5,
            opacity: 0.8,
            designation: 'Municipal collector road',
            description: 'Gemeentelijke verbindingsweg Lelystad-Zuid',
            source: 'Sample data - replace with PDOK NWB'
        }
    },

    // Junction point where both roads meet
    junction: {
        type: 'Point',
        coordinates: [52.5095, 5.4760],
        properties: {
            name: 'Knooppunt Laan van Nieuw Land / Westerdreef',
            type: 'junction',
            description: 'Primary junction between provincial and municipal sections',
            color: '#D52B1E',
            icon: 'junction'
        }
    },

    // NNN Corridor (ecological zone) - rough polygon
    nnnCorridor: {
        type: 'Polygon',
        coordinates: [[
            [52.5050, 5.4680],
            [52.5150, 5.4680],
            [52.5150, 5.4820],
            [52.5050, 5.4820],
            [52.5050, 5.4680]
        ]],
        properties: {
            name: 'NNN Corridor',
            type: 'ecological_zone',
            designation: 'Natuurnetwerk Nederland',
            color: '#39870C',
            fillColor: '#E8F8E8',
            opacity: 0.5,
            fillOpacity: 0.3,
            description: 'Ecologische verbindingszone'
        }
    },

    // Natura 2000 area - circular approximation
    natura2000Area: {
        type: 'Point',
        coordinates: [52.5140, 5.4900],
        properties: {
            name: 'Natura 2000 Gebied (approx)',
            type: 'protected_area',
            radius: 800, // meters
            designation: 'Natura 2000',
            color: '#7FCDBB',
            fillColor: '#D5F4E6',
            opacity: 0.7,
            fillOpacity: 0.3,
            description: 'Natura 2000 beschermd natuurgebied'
        }
    },

    // Protected species habitat
    protectedHabitat: {
        type: 'Point',
        coordinates: [52.5060, 5.4720],
        properties: {
            name: 'Beschermd Habitat',
            type: 'protected_habitat',
            radius: 500, // meters
            species: 'Vleermuizen, Rugstreeppad',
            color: '#FFD700',
            fillColor: '#FFF9E6',
            opacity: 0.8,
            fillOpacity: 0.4,
            description: 'Leefgebied beschermde soorten'
        }
    },

    // Reference points for labels (from project documentation)
    referencePoints: {
        westerdreef: {
            coordinates: [52.5090, 5.4650],
            label: 'Westerdreef (bestaand)'
        },
        warande: {
            coordinates: [52.4985, 5.4715],
            label: 'Warande'
        },
        aansluiting9: {
            coordinates: [52.5220, 5.4800],
            label: 'Aansluiting 9 (N309)'
        }
    },

    // Helper function to add these to a Leaflet map
    addToLeafletMap: function(map) {
        // Provincial road
        const laanPolyline = L.polyline(
            this.laanVanNieuwLand.coordinates,
            {
                color: this.laanVanNieuwLand.properties.color,
                weight: this.laanVanNieuwLand.properties.weight,
                opacity: this.laanVanNieuwLand.properties.opacity
            }
        ).addTo(map);
        
        laanPolyline.bindPopup(`
            <strong>${this.laanVanNieuwLand.properties.name}</strong><br>
            <em>${this.laanVanNieuwLand.properties.road_type}</em><br>
            Jurisdictie: ${this.laanVanNieuwLand.properties.jurisdiction}<br>
            Lengte: ${this.laanVanNieuwLand.properties.length_km} km<br>
            Status: ${this.laanVanNieuwLand.properties.status}
        `);

        // Municipal road
        const westerdreefPolyline = L.polyline(
            this.verlengdeWesterdreef.coordinates,
            {
                color: this.verlengdeWesterdreef.properties.color,
                weight: this.verlengdeWesterdreef.properties.weight,
                opacity: this.verlengdeWesterdreef.properties.opacity
            }
        ).addTo(map);
        
        westerdreefPolyline.bindPopup(`
            <strong>${this.verlengdeWesterdreef.properties.name}</strong><br>
            <em>${this.verlengdeWesterdreef.properties.road_type}</em><br>
            Jurisdictie: ${this.verlengdeWesterdreef.properties.jurisdiction}<br>
            Lengte: ${this.verlengdeWesterdreef.properties.length_km} km<br>
            Status: ${this.verlengdeWesterdreef.properties.status}
        `);

        // Junction marker
        const junctionMarker = L.circleMarker(
            this.junction.coordinates,
            {
                radius: 8,
                fillColor: this.junction.properties.color,
                color: '#FFFFFF',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }
        ).addTo(map);
        
        junctionMarker.bindPopup(`
            <strong>${this.junction.properties.name}</strong><br>
            ${this.junction.properties.description}
        `);

        // NNN Corridor
        const nnnPolygon = L.polygon(
            this.nnnCorridor.coordinates,
            {
                color: this.nnnCorridor.properties.color,
                fillColor: this.nnnCorridor.properties.fillColor,
                opacity: this.nnnCorridor.properties.opacity,
                fillOpacity: this.nnnCorridor.properties.fillOpacity
            }
        ).addTo(map);
        
        nnnPolygon.bindPopup(`
            <strong>${this.nnnCorridor.properties.name}</strong><br>
            ${this.nnnCorridor.properties.description}<br>
            <em>${this.nnnCorridor.properties.designation}</em>
        `);

        // Natura 2000 (as circle)
        const natura2000Circle = L.circle(
            this.natura2000Area.coordinates,
            {
                radius: this.natura2000Area.properties.radius,
                color: this.natura2000Area.properties.color,
                fillColor: this.natura2000Area.properties.fillColor,
                opacity: this.natura2000Area.properties.opacity,
                fillOpacity: this.natura2000Area.properties.fillOpacity
            }
        ).addTo(map);
        
        natura2000Circle.bindPopup(`
            <strong>${this.natura2000Area.properties.name}</strong><br>
            ${this.natura2000Area.properties.description}<br>
            <em>${this.natura2000Area.properties.designation}</em>
        `);

        // Protected habitat
        const habitatCircle = L.circle(
            this.protectedHabitat.coordinates,
            {
                radius: this.protectedHabitat.properties.radius,
                color: this.protectedHabitat.properties.color,
                fillColor: this.protectedHabitat.properties.fillColor,
                opacity: this.protectedHabitat.properties.opacity,
                fillOpacity: this.protectedHabitat.properties.fillOpacity
            }
        ).addTo(map);
        
        habitatCircle.bindPopup(`
            <strong>${this.protectedHabitat.properties.name}</strong><br>
            Soorten: ${this.protectedHabitat.properties.species}<br>
            ${this.protectedHabitat.properties.description}
        `);

        // Fit map to show all features
        const group = L.featureGroup([
            laanPolyline,
            westerdreefPolyline,
            nnnPolygon,
            natura2000Circle,
            habitatCircle
        ]);
        map.fitBounds(group.getBounds(), { padding: [50, 50] });

        return {
            laanPolyline,
            westerdreefPolyline,
            junctionMarker,
            nnnPolygon,
            natura2000Circle,
            habitatCircle
        };
    }
};

// Export for use in modules (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = realRoadCoordinatesSample;
}

// Also make available as global variable for browser
if (typeof window !== 'undefined') {
    window.realRoadCoordinatesSample = realRoadCoordinatesSample;
}
