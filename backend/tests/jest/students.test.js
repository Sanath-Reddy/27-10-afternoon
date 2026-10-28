const request = require("supertest");

// Mock the Student model BEFORE requiring app or controller
jest.mock("../../models/Student", () => ({
  find: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

const Student = require("../../models/Student");
const app     = require("../../app");

const asha = {
  name:       "Asha",
  usn:        "1RV23CS001",
  email:      "asha@mail.com",
  department: "CSE",
};

afterEach(() => jest.clearAllMocks());

// ── GET /api/students ─────────────────────────────────────────────────────────
describe("GET /api/students", () => {
  test("returns all students with status 200", async () => {
    Student.find.mockResolvedValue([{ _id: "1", ...asha }]);
    const res = await request(app).get("/api/students");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe("Asha");
  });
});

// ── POST /api/students ────────────────────────────────────────────────────────
describe("POST /api/students", () => {
  test("saves a student and returns 201", async () => {
    Student.create.mockResolvedValue({ _id: "abc", ...asha });
    const res = await request(app).post("/api/students").send(asha);
    expect(res.status).toBe(201);
    expect(res.body._id).toBe("abc");
  });

  test("returns 400 when required data is missing", async () => {
    Student.create.mockRejectedValue(new Error("usn: Path `usn` is required."));
    const res = await request(app).post("/api/students").send({ name: "Asha" });
    expect(res.status).toBe(400);
  });
});

// ── DELETE /api/students/:id ─────────────────────────────────────────────────
describe("DELETE /api/students/:id", () => {
  test("returns 404 when student does not exist", async () => {
    Student.findByIdAndDelete.mockResolvedValue(null);
    const res = await request(app).delete("/api/students/abc");
    expect(res.status).toBe(404);
  });

  test("returns 200 and message when student is deleted", async () => {
    Student.findByIdAndDelete.mockResolvedValue({ _id: "abc", ...asha });
    const res = await request(app).delete("/api/students/abc");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Student deleted");
  });
});

// ── PUT /api/students/:id ────────────────────────────────────────────────────
describe("PUT /api/students/:id", () => {
  test("returns 404 when student does not exist", async () => {
    Student.findByIdAndUpdate.mockResolvedValue(null);
    const res = await request(app).put("/api/students/abc").send({ name: "X" });
    expect(res.status).toBe(404);
  });
});
