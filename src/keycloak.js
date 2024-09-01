import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
    realm: 'LANDMARKET',
    url: 'http://localhost:8080/',
    clientId: 'LMFE',
    
}
);

export default keycloak;