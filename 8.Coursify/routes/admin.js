const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { adminModel } = require("../dbSchema");
const bcrypt = require("bcrypt");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { requiredBody } = require("../validation");
const { adminMiddleware } = require("../middleware/admin");
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

    const adminHashedPass = await bcrypt.hash(password, 5);
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
    console.error(e);
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

adminRouter.post("/course", adminMiddleware, (req, res) => {
  const adminId = req.adminId;
});

adminRouter.put("/course", (req, res) => {});

adminRouter.get("/course/bulk", (req, res) => {});

module.exports = {
  adminRouter: adminRouter,
};
