// Script pour récupérer les genres et plateformes de l'API IGDB
// Ne pas supprimer ce fichier !

const fs = require('fs');
const path = require('path');

// Charger les variables d'environnement manuellement depuis .env.local
function loadEnvVars() {
    const envFiles = ['.env.local', '.env'];
    
    for (const envFile of envFiles) {
        try {
            const envPath = path.join(__dirname, '..', envFile);
            const envContent = fs.readFileSync(envPath, 'utf8');
            
            envContent.split('\n').forEach(line => {
                line = line.trim();
                if (line && !line.startsWith('#') && line.includes('=')) {
                    const [key, ...values] = line.split('=');
                    if (key && values.length > 0) {
                        const cleanKey = key.trim();
                        const cleanValue = values.join('=').trim().replace(/^["']|["']$/g, '');
                        process.env[cleanKey] = cleanValue;
                        console.log(`🔑 Loaded: ${cleanKey}`);
                    }
                }
            });
            
            console.log(`✅ Loaded environment from ${envFile}`);
            break;
        } catch (error) {
            // Fichier non trouvé, continuer avec le suivant
            continue;
        }
    }
}

// IGDB_CONFIG sera initialisé après le chargement des variables d'environnement

async function makeRequest(endpoint, query) {
    const response = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
        method: 'POST',
        headers: {
            'Client-ID': process.env.IGDB_CLIENT_ID,
            'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
            'Content-Type': 'text/plain',
        },
        body: query,
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(`IGDB API error: ${response.status} ${response.statusText}`);
    }

    return data;
}

async function fetchGenres() {
    console.log('🎮 Fetching genres from IGDB...');
    
    const query = `
        fields id, name;
        limit 500;
        sort name asc;
    `;
    
    try {
        const genres = await makeRequest('genres', query);
        console.log(`✅ Genres retrieved: ${genres.length}`);
        
        console.log('\n📋 GENRES LIST:');
        genres.forEach((genre, index) => {
            console.log(`  ${index + 1}. ${genre.name} (ID: ${genre.id})`);
        });
        
        return genres;
    } catch (error) {
        console.error('❌ Error fetching genres:', error);
    }
}

async function fetchPlatforms() {
    console.log('\n🖥️ Fetching platforms from IGDB...');
    
    const query = `
        fields id, name, category;
        limit 500;
        sort name asc;
    `;
    
    try {
        const platforms = await makeRequest('platforms', query);
        console.log(`✅ Platforms retrieved: ${platforms.length}`);
        
        console.log('\n📋 PLATFORMS LIST:');
        platforms.forEach((platform, index) => {
            console.log(`  ${index + 1}. ${platform.name} (ID: ${platform.id})`);
        });
        
        return platforms;
    } catch (error) {
        console.error('❌ Error fetching platforms:', error);
    }
}

async function main() {
    loadEnvVars();
    
    console.log('🔍 Debug credentials:');
    console.log(`Client ID: ${process.env.IGDB_CLIENT_ID ? 'Found' : 'Missing'}`);
    console.log(`Access Token: ${process.env.IGDB_ACCESS_TOKEN ? 'Found' : 'Missing'}`);
    
    if (!process.env.IGDB_CLIENT_ID || !process.env.IGDB_ACCESS_TOKEN) {
        console.error('❌ Missing IGDB credentials in environment variables');
        console.log('Make sure IGDB_CLIENT_ID and IGDB_ACCESS_TOKEN are set');
        return;
    }
    
    console.log('🚀 Starting IGDB data fetch...\n');
    
    const genres = await fetchGenres();
    const platforms = await fetchPlatforms();
    
    console.log('\n📊 SUMMARY:');
    console.log(`- ${genres ? genres.length : 0} genres found`);
    console.log(`- ${platforms ? platforms.length : 0} platforms found`);
    console.log('\n✅ Script completed successfully!');
    console.log('🔒 This script will NOT be deleted');
}

main().catch(console.error);