const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { adminModel, courseModel } = require("../dbSchema");
const bcrypt = require("bcrypt");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { requiredBody } = require("../validation");
const { adminMiddleware } = require("../middleware/admin");
const logger = require("../logger");
const adminRouter = Router();


adminRouter.post("/signup", async (req, res) => {
  const parsedDataWithSuccess = requiredBody.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    return res.json({
      message: "Incorrect format",
      error: parsedDataWithSuccess.error.errors,
    });
  }

  const { email, password, firstname, lastname } = parsedDataWithSuccess.data;

  try {
    const adminexist = await adminModel.findOne({ email });
    if (adminexist) {
      return res.status(400).json({
        message: "Admin already signed up",
      });
    }

    const adminHashedPass = await bcrypt.hash(password, 8);
    await adminModel.create({
      email: email,
      password: adminHashedPass,
      firstname: firstname,
      lastname: lastname,
    });

    res.status(201).json({
      message: "Signup Successful",
    });
  } catch (error) {
    logger.error("Signup error", error); // Using winston for secure logging
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({
    email: email,
  });

  const comparedAdminPass = await bcrypt.compare(password, admin.password);

  if (comparedAdminPass) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
    );
    res.json({
      message: "Signin successful",
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId,
  });

  res.json({
    message: "Course created",
    courseId: course._id,
  });
});

adminRouter.put("/course", async (req, res) => {
  const adminId = req.adminId;
  const { title, description, imageUrl, price, courseId } = req.body;

  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
    }
  );

  res.json({
    message: "Course updated",
    courseId: course._id,
  });
});

adminRouter.get("/course/bulk", async (req, res) => {
  const adminId = req.userId;
  const courses = await courseModel.find({
    creatorId: adminId,
  });

  res.json({
    message: "Course updated",
    courses,
  });
});

module.exports = {
  adminRouter: adminRouter,
};
