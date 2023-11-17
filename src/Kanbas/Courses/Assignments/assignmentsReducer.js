import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
  assignment: {
    title: "New Assignment Title",
    course: "Assignment's Course",
    description: "New Description",
    points: "100",
    dueDate: "2023-09-18",
    availableFromDate: "2023-09-11",
    availableUntilDate: "2023-09-18",
  },
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action) => {
      state.assignments = [
        { ...action.payload, _id: new Date().getTime().toString() },
        ...state.assignments,
      ];

      console.log(state.assignments[0]);
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment) => {
        if (assignment._id === action.payload._id) {
          return action.payload;
        } else {
          return assignment;
        }
      });
    },
    selectAssignment: (state, action) => {
      state.assignment = action.payload;
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, selectAssignment, setAssignments } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
