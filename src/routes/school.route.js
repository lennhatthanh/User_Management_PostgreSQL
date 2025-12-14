import express from "express";
import {
    createStudentHandler,
    createCourseHandler,
    enrollHandler,
    getStudentTranscriptHandler,
    deleteCourseHandler,
} from "../controllers/school.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Student
 *     description: Quản lý sinh viên
 *   - name: Course
 *     description: Quản lý khóa học
 *   - name: Enrollment
 *     description: Đăng ký môn học
 *
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Nguyen Van A
 *         email:
 *           type: string
 *           example: a@gmail.com
 *         createdAt:
 *           type: string
 *           format: date-time
 *         courses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Course'
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Web Programming
 *         code:
 *           type: string
 *           example: CS101
 *         description:
 *           type: string
 *           example: Lập trình web cơ bản
 *         students:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Student'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: Error message
 */

/**
 * @swagger
 * /api/school/students:
 *   post:
 *     summary: Tạo sinh viên mới
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nguyen Van A
 *               email:
 *                 type: string
 *                 example: a@gmail.com
 *     responses:
 *       201:
 *         description: Tạo sinh viên thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/students", createStudentHandler);

/**
 * @swagger
 * /api/school/courses:
 *   post:
 *     summary: Tạo khóa học mới
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - code
 *             properties:
 *               title:
 *                 type: string
 *                 example: Database System
 *               code:
 *                 type: string
 *                 example: CS202
 *               description:
 *                 type: string
 *                 example: Môn học về cơ sở dữ liệu
 *     responses:
 *       201:
 *         description: Tạo khóa học thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/courses", createCourseHandler);

/**
 * @swagger
 * /api/school/enroll:
 *   post:
 *     summary: Sinh viên đăng ký môn học
 *     tags: [Enrollment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - courseId
 *             properties:
 *               studentId:
 *                 type: integer
 *                 example: 1
 *               courseId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Đăng ký môn học thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Enrolled successfully
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 *       500:
 *         description: Cannot enroll student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/enroll", enrollHandler);

/**
 * @swagger
 * /api/school/students/{id}:
 *   get:
 *     summary: Xem thời khóa biểu của sinh viên
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Danh sách môn học của sinh viên
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/students/:id", getStudentTranscriptHandler);

/**
 * @swagger
 * /api/school/courses/{id}:
 *   delete:
 *     summary: Xóa khóa học
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: Xóa khóa học thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Course deleted successfully
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/courses/:id", deleteCourseHandler);

export default router;
