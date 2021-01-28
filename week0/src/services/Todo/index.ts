import Todo from "../../models/Todo";

const TODO_STORE = "todos";

export const get = (): Todo[] => {
  const data = localStorage.getItem(TODO_STORE) || "";
  try {
    const result = JSON.parse(data) as Todo[];
    return result;
  } catch (error) {
    return [];
  }
};

export const save = (data: Todo[]): void => {
  if (data.length > 0) localStorage.setItem(TODO_STORE, JSON.stringify(data));
};
