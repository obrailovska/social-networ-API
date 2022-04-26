const { Thought, Users } = require("../models");

const thoughtController = {
  // get all thoughts

  getThought(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughts) => res.json(dbThoughts))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one thought by Id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughts) => {
        if (!dbThoughts) {
          res.status(404).json({ message: "No thoughts found with this id!" });
          return;
        }
        res.json(dbThoughts);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // add thought
  addThought({ params, body }, res) {
    console.log("body", body);
    Thought.create(body)
      .then((thoughtInfo) => {
        console.log("info!", thoughtInfo);
        Users.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: thoughtInfo._id } },
          { new: true }
        ).then((dbThoughts) => {
          console.log("asdf");
          if (!dbThoughts) {
            res.status(404).json({ message: "No users found with this id!" });
            return;
          }
          res.json(dbThoughts);
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        return res.json(err);
      });
  },

  //   add a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughts) => {
        console.log("yoooooo", params.userId);
        if (!dbThoughts) {
          res.status(404).json({ message: "No thoughts found with this id!" });
          return;
        }
        res.json(dbThoughts);
      })
      .catch((err) => res.json(err));
  },
  //   remove reaction from a specific thought
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )

      .then((dbThoughts) => {
        if (!dbThoughts) {
          res.status(404).json({ message: "No users found with this id!" });
          return;
        }
        res.json(dbThoughts);
      })
      .catch((err) => res.json(err));
  },
  //   remove thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "No thoughts with this id!" });
        }
        return Users.findOneAndUpdate(
          { _id: params.UserId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((dbThoughts) => {
        if (!dbThoughts) {
          res.status(404).json({ message: "No users found with this id!" });
          return;
        }
        res.json(dbThoughts);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
