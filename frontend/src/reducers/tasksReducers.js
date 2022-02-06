import {
  TASKS_CREATE_FAIL,
  TASKS_CREATE_REQUEST,
  TASKS_CREATE_SUCCESS,
  TASKS_DELETE_FAIL,
  TASKS_DELETE_REQUEST,
  TASKS_DELETE_SUCCESS,
  TASKS_LIST_FAIL,
  TASKS_LIST_REQUEST,
  TASKS_LIST_SUCCESS,
  TASKS_UPDATE_FAIL,
  TASKS_UPDATE_REQUEST,
  TASKS_UPDATE_SUCCESS,
} from "../constants/tasksConstants";

export const taskListReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case TASKS_LIST_REQUEST:
      return { loading: true };
    case TASKS_LIST_SUCCESS:
      return { loading: false, tasks: action.payload };
    case TASKS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const taskCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASKS_CREATE_REQUEST:
      return { loading: true };
    case TASKS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case TASKS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const taskUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASKS_UPDATE_REQUEST:
      return { loading: true };
    case TASKS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TASKS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const taskDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASKS_DELETE_REQUEST:
      return { loading: true };
    case TASKS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TASKS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
