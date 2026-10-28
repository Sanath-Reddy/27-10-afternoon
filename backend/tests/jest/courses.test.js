const request = require("supertest");

// Mock the Course model BEFORE requiring app
jest.mock("../../models/Course", () => ({
  find: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

const Course = require("../../models/Course");
const app    = require("../../app");

const ds = {
  title:      "Data Structures",
  code:       "CS301",
  instructor: "Dr. Rao",
  credits:    4,
  department: "CSE",
};

afterEach(() => jest.clearAllMocks());

// ── GET /api/courses ──────────────────────────────────────────────────────────
describe("GET /api/courses", () => {
  test("returns all courses with status 200", async () => {
    Course.find.mockResolvedValue([{ _id: "1", ...ds }]);
    const res = await request(app).get("/api/courses");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].code).toBe("CS301");
  });
});

// ── POST /api/courses ─────────────────────────────────────────────────────────
describe("POST /api/courses", () => {
  test("saves a course and returns 201", async () => {
    Course.create.mockResolvedValue({ _id: "xyz", ...ds });
    const res = await request(app).post("/api/courses").send(ds);
    expect(res.status).toBe(201);
    expect(res.body._id).toBe("xyz");
  });

  test("returns 400 when required fields are missing", async () => {
    Course.create.mockRejectedValue(new Error("code: Path `code` is required."));
    const res = await request(app).post("/api/courses").send({ title: "Math" });
    expect(res.status).toBe(400);
  });
});

// ── DELETE /api/courses/:id ──────────────────────────────────────────────────
describe("DELETE /api/courses/:id", () => {
  test("returns 404 when course does not exist", async () => {
    Course.findByIdAndDelete.mockResolvedValue(null);
    const res = await request(app).delete("/api/courses/abc");
    expect(res.status).toBe(404);
  });

  test("returns 200 and message when course is deleted", async () => {
    Course.findByIdAndDelete.mockResolvedValue({ _id: "xyz", ...ds });
    const res = await request(app).delete("/api/courses/xyz");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Course deleted");
  });
});

// ── PUT /api/courses/:id ─────────────────────────────────────────────────────
describe("PUT /api/courses/:id", () => {
  test("returns 404 when course does not exist", async () => {
    Course.findByIdAndUpdate.mockResolvedValue(null);
    const res = await request(app).put("/api/courses/abc").send({ title: "X" });
    expect(res.status).toBe(404);
  });
});
