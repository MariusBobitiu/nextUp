import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    twoFactorAuth: {
      type: Boolean,
      default: false,
    },
    twoFactorCode: {
      type: String,
      default: "",
    },
    watchList: [{
      movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
      watched: {
        type: Boolean,
        default: false,
      },
  }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env.SALT_ROUNDS) || 10
    );
  }
});

const User = mongoose.model("User", userSchema);
export default User;
