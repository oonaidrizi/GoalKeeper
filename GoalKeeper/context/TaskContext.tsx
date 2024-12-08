import React, { createContext, useState, ReactNode, useContext } from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  important: boolean;
}

interface TaskContextProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'You can add tasks here!', completed: false, important: false },
    { id: '2', title: 'Mark the tasks done', completed: true, important: false },
    { id: '3', title: 'And add the tasks important!', completed: false, important: true },
  ]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
