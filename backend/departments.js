const DEPARTMENTS = ["CSE", "ISE", "ECE", "ME"];

function isValidDepartment(dep) {
  return DEPARTMENTS.includes(dep);
}

module.exports = { DEPARTMENTS, isValidDepartment };
