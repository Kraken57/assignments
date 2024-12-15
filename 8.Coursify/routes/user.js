const { Router } = require("express");
const { userModel, courseModel, adminModel } = require("../dbSchema");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");
const bcrypt = require("bcrypt")
const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  try {
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPass = await bcrypt.hash(password, 5)

    await userModel.create({
      email: email,
      password: hashedPass,
      firstname: firstname,
      lastname: lastname,
    });

    res.status(201).json({
      message: "You signed up successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
    password: password,
  });

  const comparedPass = await bcrypt.compare(password, user.password)

  if (comparedPass) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

userRouter.get("/purchases", userMiddleware, async (req, res) => {
  const userId = req.userId;

  const purchases = courseModel.find({
    userId,
  });

  const purchasedCourseId = [];

  
});

module.exports = {
  userRouter: userRouter,
};
