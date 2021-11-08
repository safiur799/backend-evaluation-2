const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_photo_url: { type: String, required: false },
    role: { type: String, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const studentSchema = new mongoose.Schema(
  {
    roll_number: { type: String, required: true },
    batch: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    versionKey: false,

    timestamps: true,
  }
);

const lectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: "user" },
    batch: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("user", userSchema);
const Student = mongoose.model("student", studentSchema);
const Lecture = mongoose.model("lecture", lectureSchema);
module.exports = { User, Student, lectureSchema };
