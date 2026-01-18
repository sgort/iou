/**
 * Fetch Real Road Data from PDOK NWB WFS
 * 
 * This script fetches actual road geometry for:
 * - Laan van Nieuw Land (Provincial road)
 * - Verlengde Westerdreef / Westerdreef (Municipal road)
 * 
 * It queries the PDOK Nationaal Wegen Bestand (NWB) WFS service and outputs GeoJSON
 * 
 * Usage:
 *   node fetch-road-data.js > real-road-data.json
 */

const https = require('https');

// PDOK WFS endpoint for NWB roads
const WFS_BASE = 'https://service.pdok.nl/rws/nwbwegen/wfs/v1_0';

/**
 * Make a WFS GetFeature request
 */
function fetchWFS(params) {
    return new Promise((resolve, reject) => {
        const queryString = Object.entries(params)
            .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
            .join('&');
        
        const url = `${WFS_BASE}?${queryString}`;
        
        console.error(`Fetching: ${url}`);
        
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                }
            });
        }).on('error', reject);
    });
}

/**
 * Query roads by street name (case-insensitive)
 */
async function queryRoadByName(streetName) {
    const params = {
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        typeName: 'nwbwegen:wegvakken',
        outputFormat: 'json',
        // CQL filter for street name (STR contains the street name)
        CQL_FILTER: `STR ILIKE '%${streetName}%'`,
        // Limit results
        count: 100
    };
    
    return await fetchWFS(params);
}

/**
 * Query roads in a bounding box around Lelystad
 */
async function queryRoadsInBoundingBox() {
    // Bounding box around Lelystad Zuid area (EPSG:4326 WGS84)
    // Southwest corner: [5.45, 52.49], Northeast corner: [5.52, 52.52]
    const bbox = '5.45,52.49,5.52,52.52';
    
    const params = {
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        typeName: 'nwbwegen:wegvakken',
        outputFormat: 'json',
        srsName: 'EPSG:4326',
        bbox: bbox,
        count: 500
    };
    
    return await fetchWFS(params);
}

/**
 * Main function
 */
async function main() {
    try {
        console.error('=== Fetching Real Road Data from PDOK NWB ===\n');
        
        // Strategy 1: Try searching by street name
        console.error('1. Searching for "Laan van Nieuw Land"...');
        let laanResults = null;
        try {
            laanResults = await queryRoadByName('Laan van Nieuw Land');
            console.error(`   Found ${laanResults.features.length} features\n`);
        } catch (err) {
            console.error(`   Error: ${err.message}\n`);
        }
        
        console.error('2. Searching for "Westerdreef"...');
        let westerdreefResults = null;
        try {
            westerdreefResults = await queryRoadByName('Westerdreef');
            console.error(`   Found ${westerdreefResults.features.length} features\n`);
        } catch (err) {
            console.error(`   Error: ${err.message}\n`);
        }
        
        // Strategy 2: Get all roads in the Lelystad Zuid bounding box
        console.error('3. Fetching all roads in Lelystad Zuid bounding box...');
        let bboxResults = null;
        try {
            bboxResults = await queryRoadsInBoundingBox();
            console.error(`   Found ${bboxResults.features.length} features\n`);
        } catch (err) {
            console.error(`   Error: ${err.message}\n`);
        }
        
        // Compile results
        const output = {
            metadata: {
                source: 'PDOK Nationaal Wegen Bestand (NWB)',
                date: new Date().toISOString(),
                crs: 'EPSG:4326',
                bbox: '5.45,52.49,5.52,52.52 (Lelystad Zuid area)',
                note: 'Real road geometry from Dutch national road database'
            },
            roads: {
                laanVanNieuwLand: laanResults,
                westerdreef: westerdreefResults,
                allInBoundingBox: bboxResults
            }
        };
        
        // Output JSON to stdout
        console.log(JSON.stringify(output, null, 2));
        
        console.error('\n=== Fetch Complete ===');
        console.error('To save: node fetch-road-data.js > real-road-data.json');
        
    } catch (error) {
        console.error('ERROR:', error.message);
        process.exit(1);
    }
}

main();
