// Order of middleware is important!
export const applyRoutes = (routes, router) => {
    for (const route of routes) {
        const { method, path, middleware, handler } = route;

        if (middleware) {
            router[method](path, ...middleware, handler);
        } else {
            router[method](path, handler);
        }
    }
};
