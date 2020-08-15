/**
 * Home for api calls
 */
const secrets = require('../config/credentials');
var mongoose = require('mongoose');

module.exports = function (router) {

    var homeRoute = router.route('/');

    homeRoute.get(function (req, res) {
        var connectionString = secrets.token;
        res.json({ message: 'My connection string is ' + connectionString });
    });

    return router;
}
