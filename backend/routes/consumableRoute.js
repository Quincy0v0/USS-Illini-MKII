var Consumable = require('../models/consumable.js');

module.exports = function (router) {
  var status_dict = {
    200: "OK",
    201: "Created",
    404: "Not Found",
    500: "Internal Server Error"
  };
  var consumableRoute = router.route('/consumables');

  consumableRoute.get(function (req, res) {
    var condition = req.param('where') ? JSON.parse(req.param('where')) : {};
    var selection = req.param('select') ? JSON.parse(req.param('select')) : {};
    var options = {};
    var count = false;
    if (req.param('sort')) {
      options.sort = JSON.parse(req.param('sort'));
    }
    if (req.param('skip')) {
      options.skip = JSON.parse(req.param('skip'));
    }
    if (req.param('limit')) {
      options.limit = JSON.parse(req.param('limit'));
    }
    if (req.param('count')) {
      count = JSON.parse(req.param('count'));
    }

    Consumable.find(condition, selection, options, function (err, consumable_list) {
      if (err) {
        res.status(404);
        res.json({
          message: status_dict[res.statusCode],
          data: []
        });
      } else {
        res.status(200);
        if (!count) {
          res.json({
            message: status_dict[res.statusCode],
            data: consumable_list
          });
        } else {
          res.json({
            message: status_dict[res.statusCode],
            data: consumable_list.length
          });
        }
      }
    });
  });
  return router;
}