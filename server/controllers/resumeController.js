import Resume from "../models/Resume.js";
import imageKit from "../configs/imageKit.js";
import fs from "fs";
// POST: /api/resumes/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const newResume = await Resume.create({ userId, title });

    return res
      .status(201)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Delete: /api/resumes/delete
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findByIdAndDelete({ userId, _id: resumeId });

    return res.status(201).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// GET: /api/resumes/get
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    (resume._v = undefined),
      (resume.createdAt = undefined),
      (resume.updatedAt = undefined);

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// GET: /api/resumes/public

export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ public: true, _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(404).json({ message: "Resume not found" });
  }
};

// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;

    const image = req.file;

    let resumeDataCopy = JSON.parse(JSON.stringify(resumeData));

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);
        const response = await client.files.upload({
          file: imageBufferData,
          fileName: "resume.png",
          folder: "user-resumes",
          transformation: {
            pre: 'w-300, h-300, fo-face, z-0.75' + (removeBackground ? ', bg-remove' : ''),
          }
        });
        resumeDataCopy.personal_info.image = response.url;
        
    }

    const resume = await Resume.findByIdAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ message: "Resume updated successfully", resume });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
