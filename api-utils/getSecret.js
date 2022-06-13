const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

export const getSecret = name => {
    const credential = new DefaultAzureCredential();
    const vaultName = process.env.KEY_VAULT_NAME;
    const url = `https://${vaultName}.vault.azure.net`;

    const client = new SecretClient(url, credential);

    return client.getSecret(name).then(({ value }) => value);
};
