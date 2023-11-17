import axios from "axios";

const COURSES_URL = "http://localhost:4000/api/courses";
const ASSIGNMENTS_URL = "http://localhost:4000/api/assignments";

export const deleteAssignment = async (assignmentId) => {
  const response = await axios.delete(`${ASSIGNMENTS_URL}/${assignmentId}`);
  return response.data;
};

export const findAssignmentsForCourse = async (courseId) => {
  // error with this get request
  const response = await axios.get(`${COURSES_URL}/${courseId}/assignments`);
  console.log("here");
  return response.data;
};

export const createAssignment = async (courseId, assignment) => {
  const response = await axios.post(`${COURSES_URL}/${courseId}/assignments`, assignment);
  return response.data;
};

export const updateAssignment = async (assignment) => {
  const response = await axios.put(`${ASSIGNMENTS_URL}/${assignment._id}`, assignment);
  return response.data;
};
