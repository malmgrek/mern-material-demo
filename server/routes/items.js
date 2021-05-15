const express = require("express");
const controllers = require("../controllers/items");
// const users = require("../controllers/users")


const router = express.Router();


//
// Verification can be required like so:
//
// router.post("/", users.verifyToken, controllers.create)
//

// @route POST api/items
// @desc Create a new item
// @access Public
router.post("/", controllers.create);

// @route GET api/items
// @desc List existing items
// @access Public
router.get("/", controllers.read);

// @route PUT api/items/{id}
// @desc Update item
// @access Public
router.put("/:id", controllers.update);

// @route DELETE api/items/{id}
// @desc Delete an item
// @access Public
router.delete("/:id", controllers.del);


module.exports = router;
