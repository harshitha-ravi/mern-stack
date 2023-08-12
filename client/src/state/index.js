import { createSlice } from "@reduxjs/toolkit";

// State that will be stored in global state - accessible through entire application,
// grab anywhere we want it
const initialState = {
  mode: "light",
  student: null,
  token: null,
  posts: [],
};

// Redux logic for entire application
// Functions that modify the global state
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // For login -> fethc the student and token from the payload
    setLogin: (state, action) => {
      state.student = action.payload.student;
      state.token = action.payload.token;
    },
    // For logout function re-setting the student and token
    setLogout: (state) => {
      state.student = null;
      state.token = null;
    },
    setConnections: (state, action) => {
      if (state.student) {
        state.student.connections = action.payload.connections;
      } else {
        console.error("student connections non-existent");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      // updating a post
      const modifiedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = modifiedPosts;
    },
  },
});

// todo: need to understand the logic
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
