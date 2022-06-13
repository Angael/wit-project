// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export let aaasd = 0;

export default function handler(req, res) {
    aaasd++;
    res.status(200).json('added');
}
