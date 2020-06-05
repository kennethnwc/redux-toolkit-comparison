import uuid from "uuid";
import { Todo } from "./type";

//constants
const CREATE_TODO = "CREATE_TODO";
const EDIT_TODO = "EDIT_TODO";
const TOOGLE_TODO = "TOOGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const SELECT_TODO = "SELECT_TODO";

interface CreateTodoActionType {
  type: typeof CREATE_TODO;
  payload: Todo;
}
export const createTodoActionCreator = ({
  desc,
}: {
  desc: string;
}): CreateTodoActionType => {
  return {
    type: CREATE_TODO,
    payload: { id: uuid(), isComplete: false, desc },
  };
};

interface EditTodoActionType {
  type: typeof EDIT_TODO;
  payload: { id: string; desc: string };
}
export const editTodoActionCreator = ({
  id,
  desc,
}: {
  id: string;
  desc: string;
}): EditTodoActionType => {
  return { type: EDIT_TODO, payload: { id, desc } };
};

interface ToogleTodoActionType {
  type: typeof TOOGLE_TODO;
  payload: { id: string; isComplete: boolean };
}
export const toogleTodoActionCreator = ({
  id,
  isComplete,
}: {
  id: string;
  isComplete: boolean;
}): ToogleTodoActionType => {
  return { type: TOOGLE_TODO, payload: { id, isComplete: isComplete } };
};

interface DeleteTodoActionType {
  type: typeof DELETE_TODO;
  payload: { id: string };
}
export const deleteTodoActionCreator = ({
  id,
}: {
  id: string;
}): DeleteTodoActionType => {
  return {
    type: DELETE_TODO,
    payload: { id },
  };
};

interface SelectTodoActionType {
  type: typeof SELECT_TODO;
  payload: { id: string };
}
export const selectTodoActionCreator = ({
  id,
}: {
  id: string;
}): SelectTodoActionType => {
  return {
    type: SELECT_TODO,
    payload: { id },
  };
};
