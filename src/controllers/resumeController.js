import { createResumeService } from "../services/resumeService.js";

/*
========================
CREATE RESUME
========================
*/

export const createResume = async (req, res) => {
  try {
    const result = await createResumeService(req.user.id, req.body);

    res.status(201).json({
      message: "Resume created successfully",
      resume: result,
    });
  } catch (error) {
    console.error("Create Resume Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};