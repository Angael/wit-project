import { DB } from '../../api-utils/db';

export default async function handler(req, res) {
    // const authToken = req.get('Authorization');
    // console.log('body', req.body);
    // console.log('query', req.query);
    // console.log('params', req.params);
    // console.log({ req });
    const account_uid = 'mBL7ilHS7sdt7RcNKSSTjxTRKgO2';
    try {
        console.log('1');

        const result = await DB.select('id', 'filename')
            .from('file')
            .where({ account_uid });
        console.log('2');
        // console.log({ result });

        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).send('error');
    }
}
