"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client/core";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Loader2, ClipboardList } from "lucide-react";

type Todo = {
  id: number;
  title: string;
  is_completed: boolean;
  __typename?: string;
};

type GetTodosData = {
  getTodos: Todo[];
};

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      title
      is_completed
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      is_completed
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: Int!, $is_completed: Boolean!) {
    updateTodo(id: $id, is_completed: $is_completed) {
      id
      is_completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`;

export default function Home() {
  const [text, setText] = useState<string>("");
  const { data, loading, error } = useQuery<GetTodosData>(GET_TODOS);

  const [addTodo, { loading: addLoading }] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const [updateTodo] = useMutation(UPDATE_TODO);

  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleAdd = async () => {
    if (!text.trim()) return;
    try {
      await addTodo({ variables: { title: text } });
      setText("");
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const handleToggle = async (id: number, currentStatus: boolean) => {
    try {
      await updateTodo({
        variables: { id, is_completed: !currentStatus },
        optimisticResponse: {
          updateTodo: {
            id,
            is_completed: !currentStatus,
            __typename: "Todo",
          },
        },
      });
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTodo({ variables: { id } });
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen pt-12 bg-zinc-50 dark:bg-zinc-950">
      <Card className="w-full max-w-md mx-4 shadow-2xl border-zinc-200 dark:border-zinc-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center font-black text-xl text-indigo-600 dark:text-indigo-400 tracking-tight">
            ToDo List
          </CardTitle>
        </CardHeader>

        <div className="px-6 pb-8">
          <div className="flex gap-2 mb-8">
            <Input
              className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-indigo-500"
              placeholder="Add new todo..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              disabled={addLoading}
            />
            <Button
              onClick={handleAdd}
              disabled={addLoading || !text.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 transition-colors"
            >
              {addLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "ADD"
              )}
            </Button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center py-12 gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-500 opacity-70" />
              <p className="text-zinc-400 text-sm font-medium">
                Loading tasks...
              </p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-2xl text-red-600 dark:text-red-400 text-sm text-center">
              Failed to load: {error.message}
            </div>
          ) : (
            <ul className="space-y-3">
              {data?.getTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="group flex items-center justify-between p-4 border border-zinc-100 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 hover:shadow-lg hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Checkbox
                      checked={todo.is_completed}
                      onCheckedChange={() =>
                        handleToggle(todo.id, todo.is_completed)
                      }
                      className="w-5 h-5 border-zinc-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors"
                    />
                    <span
                      className={`font-semibold transition-all truncate ${
                        todo.is_completed
                          ? "line-through text-zinc-400 opacity-60"
                          : "text-zinc-700 dark:text-zinc-200"
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>

                  <Button
                    onClick={() => handleDelete(todo.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all duration-200"
                  >
                    <Trash2 size={18} />
                  </Button>
                </li>
              ))}

              {data?.getTodos.length === 0 && (
                <div className="text-center py-16 border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-[2rem] flex flex-col items-center gap-2">
                  <ClipboardList className="w-10 h-10 text-zinc-200 dark:text-zinc-800" />
                  <p className="text-zinc-400 font-medium italic">
                    No tasks found.
                  </p>
                </div>
              )}
            </ul>
          )}
        </div>
      </Card>
    </div>
  );
}
