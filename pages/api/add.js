// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export let aaasd = 0;

export default function handler(req, res) {
    aaasd++;
    res.status(200).json({
        text: 'added',
        AAA: process.env.mySecret,
        KEY_VAULT_NAME: process.env.KEY_VAULT_NAME
    });
}
