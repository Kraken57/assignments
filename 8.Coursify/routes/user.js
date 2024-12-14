const { Router } = require("express");
const { userModel, courseModel, adminModel } = require("../dbSchema");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");
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

    await userModel.create({
      email: email,
      password: password,
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

  if (user) {
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

  purchasedCourseId.push();
});

module.exports = {
  userRouter: userRouter,
};
