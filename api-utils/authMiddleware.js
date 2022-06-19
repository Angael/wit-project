import admin from '../api-utils/firebaseConfig';

export const authMiddleware = async (req, res) => {
    const authorization = req.headers?.authorization;
    if (!authorization) {
        throw new Error('No header');
    }

    let token = authorization.replace('Bearer ', '');
    // Returns user object
    return admin.auth().verifyIdToken(token);
};

// {
//     aud: 'praca-dyplomowa-wit',
//     user_id: 'mBL7ilHS7sdt7RcNKSSTjxTRKgO2',
//     email: 'user@user.com',
//     uid: 'mBL7ilHS7sdt7RcNKSSTjxTRKgO2'
// }
