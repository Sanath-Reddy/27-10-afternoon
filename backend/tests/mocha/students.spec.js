const request = require("supertest");
const { expect } = require("chai");
const Student = require("../../models/Student");
const app     = require("../../app");

const asha = {
  name:       "Asha",
  usn:        "1RV23CS001",
  email:      "asha@mail.com",
  department: "CSE",
};

describe("Student API (Mocha + Chai)", () => {
  const original = {};

  beforeEach(() => {
    original.find              = Student.find;
    original.create            = Student.create;
    original.findByIdAndUpdate = Student.findByIdAndUpdate;
    original.findByIdAndDelete = Student.findByIdAndDelete;
  });

  afterEach(() => {
    Object.assign(Student, original);
  });

  it("GET returns all students", async () => {
    Student.find = async () => [{ _id: "1", ...asha }];
    const res = await request(app).get("/api/students");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.lengthOf(1);
  });

  it("POST saves a student (201)", async () => {
    Student.create = async (data) => ({ _id: "abc", ...data });
    const res = await request(app).post("/api/students").send(asha);
    expect(res.status).to.equal(201);
    expect(res.body).to.include({ _id: "abc", usn: "1RV23CS001" });
  });

  it("DELETE unknown id gives 404", async () => {
    Student.findByIdAndDelete = async () => null;
    const res = await request(app).delete("/api/students/abc");
    expect(res.status).to.equal(404);
  });

  it("POST with invalid data returns 400", async () => {
    Student.create = async () => {
      throw new Error("usn: Path `usn` is required.");
    };
    const res = await request(app).post("/api/students").send({ name: "X" });
    expect(res.status).to.equal(400);
  });

  it("PUT unknown id gives 404", async () => {
    Student.findByIdAndUpdate = async () => null;
    const res = await request(app).put("/api/students/abc").send({ name: "X" });
    expect(res.status).to.equal(404);
  });
});
