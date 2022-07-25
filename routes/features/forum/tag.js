const router = require("express").Router();
const Tag = require("../../../models/tags");
const factory = require("../../../controller/handlerFactory");

router.route("/").get(factory.getAll(Tag)).post(factory.createOne(Tag));

module.exports = router;
