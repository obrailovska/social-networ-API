const { Users } = require("../models");

const usersController = {
  // get all users
  getAllUsers(req, res) {
    Users.find({})
      // .populate({
      //   path: "thoughts",
      //   select: "-__v",
      // })
      // .select("-__v")
      // .sort({ _id: -1 })
      .then((dbSocialNetwork) => res.json(dbSocialNetwork))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //   get one user by id
  getUserById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbSocialNetwork) => {
        if (!dbSocialNetwork) {
          res.status(404).json({ message: "No users found with this id!" });
          return;
        }
        res.json(dbSocialNetwork);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // create a user
  createUser({ body }, res) {
    Users.create(body)
      .then((dbSocialNetwork) => res.json(dbSocialNetwork))
      .catch((err) => res.status(400).json(err));
  },
  //   update user
  updateUser({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbSocialNetwork) => {
        if (!dbSocialNetwork) {
          res.status(404).json({ message: "No users found with this id!" });
          return;
        }
        res.json(dbSocialNetwork);
      })
      .catch((err) => res.status(400).json(err));
  },
  //   delete user
  deleteUser({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then((dbSocialNetwork) => {
        if (!dbSocialNetwork) {
          res.status(404).json({ message: "No usersfound with this id!" });
          return;
        }
        res.json(dbSocialNetwork);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = usersController;
