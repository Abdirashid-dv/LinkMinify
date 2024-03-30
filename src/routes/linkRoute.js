const express = require("express");
const linkController = require("../controllers/linkController");

const router = express.Router();

router.route("/shorten").post(linkController.shorten);

module.exports = router;
