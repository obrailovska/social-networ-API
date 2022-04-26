const router = require("express").Router();

const {
  getThought,
  getThoughtById,
  addThought,
  removeThought,
  // addReaction,
  removeReaction,
} = require("../../controllers/thoughts-controller");

router.route("/").get(getThought);
router.route("/:userId").post(addThought);
router
  .route("/:thoughtId")
  .get(getThoughtById)
  // .put(addReaction)
  .delete(removeThought);
router.route("/:userId/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;
