import axios from "axios";
import {
  TASKS_CREATE_FAIL,
  TASKS_CREATE_REQUEST,
  TASKS_CREATE_SUCCESS,
  TASKS_DELETE_REQUEST,
  TASKS_DELETE_SUCCESS,
  TASKS_DELETE_FAIL,
  TASKS_LIST_FAIL,
  TASKS_LIST_REQUEST,
  TASKS_LIST_SUCCESS,
  TASKS_UPDATE_FAIL,
  TASKS_UPDATE_REQUEST,
  TASKS_UPDATE_SUCCESS,
} from "../constants/tasksConstants";

export const listTasks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASKS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tasks`, config);

    dispatch({
      type: TASKS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: TASKS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createTaskAction =
  (title, description, tdDate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TASKS_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/tasks/create`,
        { title, description, tdDate },
        config
      );

      dispatch({
        type: TASKS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: TASKS_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateTaskAction =
  (id, title, description, tdDate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TASKS_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/tasks/${id}`,
        { title, description, tdDate },
        config
      );

      dispatch({
        type: TASKS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: TASKS_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteTaskAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASKS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/tasks/${id}`, config);

    dispatch({
      type: TASKS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: TASKS_DELETE_FAIL,
      payload: message,
    });
  }
};
