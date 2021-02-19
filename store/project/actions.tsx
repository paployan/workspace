const API_URL = "https://workspace-peach.vercel.app/api";

export const GET_PROJECTS = "GET_PROJECTS";
export const SET_PROJECTS = "SET_PROJECTS";
export const UPDATE_PROJECTS = "UPDATE_PROJECTS";
export const ADD_PROJECTS = "ADD_PROJECTS";

export const setProjectsToStore = (payload) => ({
  type: SET_PROJECTS,
  payload,
});

export const getProjects = () => async (dispatch) => {
  try {
    const req = await fetch(`${API_URL}/projects`);
    const res = await req.json();
    if (process.browser) {
      const data = localStorage.getItem("projects");
      if (data) dispatch(setProjectsToStore(JSON.parse(data)));
    }
  } catch (e) {
    console.log("Error", e);
  }
};

export const updateProject = (data: object) => (dispatch: any) =>
  dispatch({ type: UPDATE_PROJECTS, data });

export const addProject = (item: object) => (dispatch: any) =>
  dispatch({ type: ADD_PROJECTS, item });
