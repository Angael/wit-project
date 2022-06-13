// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { aaasd } from './add';
import { getSecret } from '../../api-utils/getSecret';

let i = 0;
export default async function handler(req, res) {
    try {
        const secret = await getSecret('mySecret');
        i++;
        res.status(200).json({
            name: 'John Doe',
            database: '' + process.env.DB_HOST, // normal env
            mySecret: '' + process.env.mySecret, // keyvault
            i,
            aaasd,
            secret,
        });
    } catch (e) {
        i++;
        res.status(200).json({
            name: 'John Doe',
            database: '' + process.env.DB_HOST, // normal env
            mySecret: '' + process.env.mySecret, // keyvault
            i,
            aaasd,
            error: e.toString(),
        });
    }
}
