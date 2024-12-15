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

  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const comparedAdminPass = await bcrypt.compare(password, admin.password);
    if (!comparedAdminPass) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
    );

    res.json({
      message: "Signin successful",
      token,
    });
  } catch (error) {
    logger.error("Signin error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const { title, description, imageUrl, price } = req.body;

  try {
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
  } catch (error) {
    logger.error("Course creation error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;
  const { title, description, imageUrl, price, courseId } = req.body;

  try {
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
  } catch (error) {
    logger.error("Course creation error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;
  try {
    const courses = await courseModel.find({ creatorId: adminId });

    res.json({
      message: "Courses retrieved successfully",
      courses,
    });
  } catch (error) {
    logger.error("Course retrieval error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = {
  adminRouter: adminRouter,
};
