import admin from '../config/firebase';

const authUser = (req, res, next) => {
    let token = req.get('Authorization');
    if (token) {
        token = token.replace('Bearer ', '');
        admin
            .auth()
            .verifyIdToken(token)
            .then(function (decodedToken) {
                req.user = decodedToken;
                next();
            })
            .catch(function (error) {
                res.status(401).send('Bad token');
            });
    } else {
        res.status(401).send('No Token');
    }
};

module.exports = authUser;
