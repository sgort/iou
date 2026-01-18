/**
 * Browser-Compatible PDOK Road Data Fetcher
 * 
 * This script can be run directly in the browser console or embedded in your app
 * to fetch real road geometry from PDOK NWB WFS service
 */

class PDOKRoadDataFetcher {
    constructor() {
        this.wfsBase = 'https://service.pdok.nl/rws/nwbwegen/wfs/v1_0';
    }

    /**
     * Fetch WFS data using fetch API
     */
    async fetchWFS(params) {
        const queryString = Object.entries(params)
            .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
            .join('&');
        
        const url = `${this.wfsBase}?${queryString}`;
        console.log('Fetching:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    }

    /**
     * Query roads by street name
     */
    async queryRoadByName(streetName, maxResults = 100) {
        const params = {
            service: 'WFS',
            version: '2.0.0',
            request: 'GetFeature',
            typeName: 'nwbwegen:wegvakken',
            outputFormat: 'application/json',
            CQL_FILTER: `STR ILIKE '%${streetName}%'`,
            count: maxResults,
            srsName: 'EPSG:4326'
        };
        
        return await this.fetchWFS(params);
    }

    /**
     * Query roads in bounding box around Lelystad Zuid
     */
    async queryRoadsInLelystad() {
        // Bounding box: Southwest [5.45, 52.49], Northeast [5.52, 52.52]
        const params = {
            service: 'WFS',
            version: '2.0.0',
            request: 'GetFeature',
            typeName: 'nwbwegen:wegvakken',
            outputFormat: 'application/json',
            srsName: 'EPSG:4326',
            bbox: '5.45,52.49,5.52,52.52,EPSG:4326',
            count: 500
        };
        
        return await this.fetchWFS(params);
    }

    /**
     * Get capabilities to understand available filters
     */
    async getCapabilities() {
        const params = {
            service: 'WFS',
            version: '2.0.0',
            request: 'GetCapabilities'
        };
        
        return await this.fetchWFS(params);
    }

    /**
     * Describe feature type to see available attributes
     */
    async describeFeatureType() {
        const params = {
            service: 'WFS',
            version: '2.0.0',
            request: 'DescribeFeatureType',
            typeName: 'nwbwegen:wegvakken',
            outputFormat: 'application/json'
        };
        
        return await this.fetchWFS(params);
    }

    /**
     * Main function to fetch both roads and compile results
     */
    async fetchLelystadRoads() {
        console.log('=== Fetching Lelystad Zuid Road Data from PDOK ===\n');
        
        const results = {
            metadata: {
                source: 'PDOK Nationaal Wegen Bestand (NWB)',
                date: new Date().toISOString(),
                crs: 'EPSG:4326',
                description: 'Real road geometry for Lelystad Zuid Ring Road project'
            },
            roads: {}
        };

        // Try fetching "Laan van Nieuw Land"
        try {
            console.log('Fetching: Laan van Nieuw Land...');
            const laan = await this.queryRoadByName('Laan van Nieuw Land');
            results.roads.laanVanNieuwLand = laan;
            console.log(`✓ Found ${laan.features.length} features for Laan van Nieuw Land`);
        } catch (err) {
            console.error('✗ Error fetching Laan van Nieuw Land:', err.message);
            results.roads.laanVanNieuwLand = { error: err.message };
        }

        // Try fetching "Westerdreef"
        try {
            console.log('Fetching: Westerdreef...');
            const westerdreef = await this.queryRoadByName('Westerdreef');
            results.roads.westerdreef = westerdreef;
            console.log(`✓ Found ${westerdreef.features.length} features for Westerdreef`);
        } catch (err) {
            console.error('✗ Error fetching Westerdreef:', err.message);
            results.roads.westerdreef = { error: err.message };
        }

        // Get all roads in bounding box
        try {
            console.log('Fetching: All roads in Lelystad Zuid bounding box...');
            const bbox = await this.queryRoadsInLelystad();
            results.roads.allInBoundingBox = bbox;
            console.log(`✓ Found ${bbox.features.length} features in bounding box`);
            
            // Show some street names from the bbox
            const streetNames = [...new Set(bbox.features
                .map(f => f.properties.STR)
                .filter(s => s)
                .slice(0, 20))];
            console.log('Sample street names:', streetNames);
        } catch (err) {
            console.error('✗ Error fetching bounding box:', err.message);
            results.roads.allInBoundingBox = { error: err.message };
        }

        console.log('\n=== Fetch Complete ===');
        return results;
    }

    /**
     * Helper to convert the fetched data to Leaflet-compatible format
     */
    convertToLeafletCoords(geoJsonFeature) {
        if (!geoJsonFeature || !geoJsonFeature.geometry) return null;
        
        const coords = geoJsonFeature.geometry.coordinates;
        
        // GeoJSON uses [lon, lat], Leaflet uses [lat, lon]
        if (geoJsonFeature.geometry.type === 'LineString') {
            return coords.map(([lon, lat]) => [lat, lon]);
        } else if (geoJsonFeature.geometry.type === 'MultiLineString') {
            return coords.map(line => line.map(([lon, lat]) => [lat, lon]));
        }
        
        return null;
    }

    /**
     * Merge multiple LineString features into a single continuous path
     */
    mergeRoadSegments(features) {
        const allCoords = [];
        
        features.forEach(feature => {
            if (feature.geometry.type === 'LineString') {
                const leafletCoords = this.convertToLeafletCoords(feature);
                if (leafletCoords) {
                    allCoords.push(...leafletCoords);
                }
            } else if (feature.geometry.type === 'MultiLineString') {
                feature.geometry.coordinates.forEach(line => {
                    const leafletCoords = line.map(([lon, lat]) => [lat, lon]);
                    allCoords.push(...leafletCoords);
                });
            }
        });
        
        return allCoords;
    }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PDOKRoadDataFetcher;
}

// Browser console usage example:
/*
const fetcher = new PDOKRoadDataFetcher();
const data = await fetcher.fetchLelystadRoads();
console.log(JSON.stringify(data, null, 2));

// Save to file (copy from console)
// Or get Leaflet coordinates:
const laanCoords = fetcher.mergeRoadSegments(data.roads.laanVanNieuwLand.features);
const westerdreefCoords = fetcher.mergeRoadSegments(data.roads.westerdreef.features);
*/
