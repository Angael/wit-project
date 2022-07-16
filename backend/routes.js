import fileRoutes from './services/files';
import authRoutes from './services/auth';

export const routes = [fileRoutes, authRoutes].flat();
