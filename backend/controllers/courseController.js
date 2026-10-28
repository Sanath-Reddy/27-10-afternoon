const Course = require("../models/Course");

// GET /api/courses  (optional filter: ?department=CSE, ?sort=credits)
exports.getCourses = async (req, res) => {
  try {
    const filter = req.query.department
      ? { department: req.query.department }
      : {};
    const courses = await Course.find(filter);
    // Bonus: sort in JS if sort query param is provided
    if (req.query.sort && Array.isArray(courses)) {
      const key = req.query.sort;
      courses.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    }
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/courses/:id
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: "Invalid id" });
  }
};

// POST /api/courses
exports.addCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/courses/:id
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/courses/:id
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(400).json({ error: "Invalid id" });
  }
};
