const {Router} = require('express');

const { pageLanding, pageStudy, pageGiveClasses, saveClasses} = require ('./pages')

const appRouter = new Router();

appRouter.get("/", pageLanding);

appRouter.get("/study", pageStudy);

appRouter.get("/give-classes", pageGiveClasses);

appRouter.post("/save-classes", saveClasses);

module.exports = appRouter;