// src/services/course.service.js
import { prisma } from "../config/prisma/client.js";

// 1. Tạo khóa học mới
export const createCourse = async (data) => {
  return await prisma.course.create({ data });
};

// 2. Tạo sinh viên mới
export const createStudent = async (data) => {
  return await prisma.student.create({ data });
};

// 3. Đăng ký khóa học cho sinh viên (QUAN TRỌNG)
export const enrollStudentToCourse = async (studentId, courseId) => {
  return await prisma.student.update({
    where: { id: Number(studentId) },
    data: {
      courses: {
        connect: { id: Number(courseId) } // Keyword 'connect' của Prisma
      }
    },
    include: { courses: true } // Trả về luôn danh sách khóa học sau khi add
  });
};

// 4. Lấy chi tiết sinh viên kèm các khóa đang học
export const getStudentWithCourses = async (studentId) => {
  return await prisma.student.findUnique({
    where: { id: Number(studentId) },
    include: { // Join bảng để lấy dữ liệu Course
      courses: true 
    }
  });
};

//5. Xóa khóa học
export const deleteCourse = async (courseId) => {
  return await prisma.course.delete({
    where: { id: Number(courseId) },
    include: { students: true }, // Trả về luôn danh sách sinh viên sau khi remove
  });
};