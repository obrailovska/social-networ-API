const { Thought, Users } = require("../models");

const thoughtController = {
  // add thought
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbSocialNetwork) => {
        if (!dbSocialNetwork) {
          res.status(404).json({ message: "No users found with this id!" });
          return;
        }
        res.json(dbSocialNetwork);
      })
      .catch((err) => res.json(err));
  },

  //   add a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.reactionId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbSocialNetwork) => {
        if (!dbSocialNetwork) {
          res.status(404).json({ message: "No thoughts found with this id!" });
          return;
        }
        res.json(dbSocialNetwork);
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

      .then((dbSocialNetwork) => {
        if (!dbSocialNetwork) {
          res.status(404).json({ message: "No users found with this id!" });
          return;
        }
        res.json(dbSocialNetwork);
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
      .then((dbSocialNetwork) => {
        if (!dbSocialNetwork) {
          res.status(404).json({ message: "No users found with this id!" });
          return;
        }
        res.json(dbSocialNetwork);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
