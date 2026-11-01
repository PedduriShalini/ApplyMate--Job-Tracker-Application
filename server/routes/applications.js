const express = require("express");
const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { company, role, status } = req.body;

    const newApplication = new Application({
      company,
      role,
      status,
      userId: req.user.id,
    });

    await newApplication.save();

    res.status(201).json({
      message: "Application added successfully",
      application: newApplication,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// READ
router.get("/", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.user.id,
    });

    res.status(200).json(applications);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const application =
      await Application.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
      });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// UPDATE
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { company, role, status } = req.body;

    const application =
      await Application.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.user.id,
        },
        {
          company,
          role,
          status,
        },
        {
          new: true,
        }
      );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      message: "Application updated successfully",
      application,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;