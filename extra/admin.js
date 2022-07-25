const router = require("express").Router();
const adminController = require("../../controller/adminController");
router.get("/", adminController.getAllReview);

router
  .route("/:id")
  .get(adminController.getReview)
  .patch(adminController.updateReview)
  .delete(adminController.deleteReview); // should be added
module.exports = router;
