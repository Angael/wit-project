const admin = require('firebase-admin');

const serviceAccount = {
    type: 'service_account',
    project_id: 'praca-dyplomowa-wit',
    private_key_id: process.env.FB_KEY_ID,
    private_key: process.env.FB_KEY,
    client_email: process.env.FB_EMAIL,
    client_id: process.env.FB_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.FB_CLIENT_CERT,
};

// This if helps in dev mode, because initialization can happen only once
// if (!admin.apps?.length) {
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
// }

module.exports = admin;
