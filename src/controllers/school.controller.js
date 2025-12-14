// src/controllers/school.controller.js
import * as service from "../services/course.service.js";

// Tạo Student
export const createStudentHandler = async (req, res) => {
  try {
    const result = await service.createStudent(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo Course
export const createCourseHandler = async (req, res) => {
  try {
    const result = await service.createCourse(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Đăng ký học phần (Enroll)
export const enrollHandler = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const result = await service.enrollStudentToCourse(studentId, courseId);
    res.json({ message: "Enrolled successfully", student: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Cannot enroll student" });
  }
};

// Xem thời khóa biểu sinh viên
export const getStudentTranscriptHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.getStudentWithCourses(id);
    if (!result) return res.status(404).json({ error: "Student not found" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Xóa khóa học
export const deleteCourseHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.deleteCourse(id);
    if (!result) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};