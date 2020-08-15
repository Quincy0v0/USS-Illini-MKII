/*
 * Connecting all endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/api', require('./userRoute.js')(router));
    app.use('/api', require('./postRoute.js')(router));
    app.use('/api', require('./shipRoute.js')(router));
    app.use('/api', require('./consumableRoute.js')(router));
    app.use('/api', require('./moduleRoute.js')(router));
};
