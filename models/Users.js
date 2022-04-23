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
        ref: "toughts",
      },
    ],
    friends: [{}],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
    // We set id to false because this is a virtual that Mongoose returns, and we don’t need it.
  }
);
