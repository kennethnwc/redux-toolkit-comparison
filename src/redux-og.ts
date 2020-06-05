import uuid from "uuid";
import { Todo } from "./type";
import { combineReducers, createStore } from "redux";

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
  return { type: TOOGLE_TODO, payload: { id, isComplete: !isComplete } };
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

interface SelectedTodoActionType {
  type: typeof SELECT_TODO;
  payload: { id: string };
}
export const selectTodoActionCreator = ({
  id,
}: {
  id: string;
}): SelectedTodoActionType => {
  return {
    type: SELECT_TODO,
    payload: { id },
  };
};

//initial val
const todosInitialState: Todo[] = [
  {
    id: uuid(),
    desc: "Learn React",
    isComplete: true,
  },
  {
    id: uuid(),
    desc: "Learn Redux",
    isComplete: true,
  },
  {
    id: uuid(),
    desc: "Learn Redux-ToolKit",
    isComplete: false,
  },
];

//Reducer
type TodoActionTypes =
  | CreateTodoActionType
  | EditTodoActionType
  | ToogleTodoActionType
  | DeleteTodoActionType;
const todosReducer = (
  state: Todo[] = todosInitialState,
  action: TodoActionTypes
) => {
  switch (action.type) {
    case CREATE_TODO: {
      const { payload } = action;
      return [...state, payload];
    }
    case EDIT_TODO: {
      const { payload } = action;
      return state.map((todo) =>
        todo.id === payload.id ? { ...todo, desc: payload } : todo
      );
    }
    case TOOGLE_TODO: {
      const { payload } = action;
      return state.map((todo) =>
        todo.id === payload.id
          ? { ...todo, isComplete: payload.isComplete }
          : todo
      );
    }
    case DELETE_TODO: {
      const { payload } = action;
      return state.filter((todo) => todo.id !== payload.id);
    }
    default: {
      return state;
    }
  }
};

type SelectTodoActionTypes = SelectedTodoActionType;
const selectedTodoReducer = (
  state: string | null = null,
  action: SelectTodoActionTypes
) => {
  switch (action.type) {
    case SELECT_TODO: {
      const { payload } = action;
      return payload.id;
    }
    default: {
      return state;
    }
  }
};

const counterReducer = (state: number = 0, action: TodoActionTypes) => {
  switch (action.type) {
    case CREATE_TODO: {
      return state + 1;
    }
    case TOOGLE_TODO: {
      return state + 1;
    }
    case DELETE_TODO: {
      return state + 1;
    }
    case EDIT_TODO: {
      return state + 1;
    }
    default: {
      return state;
    }
  }
};

const reducers = combineReducers({
  todos: todosReducer,
  selectedTodo: selectedTodoReducer,
  counter: counterReducer,
});

//Store
export default createStore(reducers);
