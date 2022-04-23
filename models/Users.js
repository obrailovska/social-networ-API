const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: "Email address is required",
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
    // set id to false because this is a virtual that Mongoose returns, and we don’t need it.
  }
);

// get total count of thoughts
UserSchema.virtual("thoughtCount").get(function () {
  return this.thoughts.reduce(
    (total, thoughts) => total + thoughts.length + 1,
    0
  );
});

// get total count of friends
UserSchema.virtual("friendCount").get(function () {
  return this.friends.reduce((total, friends) => total + friends.length + 1, 0);
});

const Users = model("Users", UserSchema);

module.exports = Users;
