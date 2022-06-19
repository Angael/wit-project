const fileRoutes = require('./services/files');
const authRoutes = require('./services/auth');

const routes = [fileRoutes, authRoutes].flat();

module.exports = { routes };
