import { AppError } from "../../core/errors/app-error.js";

export type TodoPriority = "low" | "medium" | "high";

export interface Todo {
  createdAt: string;
  id: number;
  priority: TodoPriority;
  title: string;
}

export interface CreateTodoInput {
  priority: TodoPriority;
  title: string;
}

const todos: Todo[] = [];
let nextTodoId = 1;

export function echoName(input: {
  name: string;
  repeat: number | undefined;
  uppercase: boolean | undefined;
}): {
  message: string;
  repeat: number;
} {
  const repeat = input.repeat ?? 1;
  const normalizedName = input.uppercase ? input.name.toUpperCase() : input.name;

  return {
    message: Array.from({ length: repeat }, () => normalizedName).join(" "),
    repeat,
  };
}

export function createTodo(input: CreateTodoInput): Todo {
  const todo: Todo = {
    id: nextTodoId++,
    title: input.title,
    priority: input.priority,
    createdAt: new Date().toISOString(),
  };

  todos.push(todo);

  return todo;
}

export function getTodoById(id: number): Todo {
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    throw new AppError({
      code: "TODO_NOT_FOUND",
      message: "Todo not found",
      statusCode: 404,
    });
  }

  return todo;
}
