import fileRoutes from './services/files/index.js';
import authRoutes from './services/auth/index.js';

export const routes = [fileRoutes, authRoutes].flat();
