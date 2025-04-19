import uid from "uniqid";
import "./App.scss";
import TaskHero from "./components/TaskHero/TaskHero";
import Header from "./components/Header/Header";
import Quote from "./components/Quote/Quote";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
      axios
    .get(`${API_URL}/quote/random`)
    .then((response) => {
      setQuote(response.data);
    })
    .catch((error) => {
      console.log("error is here", error);
    });
  }, []);

  const [taskList, setTaskList] = useState(() => {
    const storedTasks = localStorage.getItem("taskList");
    return storedTasks
      ? JSON.parse(storedTasks)
      : [
          {
            id: uid(),
            goal: "Choosing a hackathon project",
            isCompleted: true,
          },
          {
            id: uid(),
            goal: "Setting up a client-server architecture",
            isCompleted: true,
          },
          {
            id: uid(),
            goal: "Installing necessary packages like NPM",
            isCompleted: true,
          },
          { id: uid(), goal: "Deploy!", isCompleted: true },
        ];
  });

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const handleTaskAdd = (taskGoal) => {
    setTaskList([
      ...taskList,
      { id: uid(), goal: taskGoal, isCompleted: false },
    ]);
  };

  const handleTaskToggle = (task) => {
    const updatedTaskList = taskList.map((taskVal) =>
      taskVal.id === task.id
        ? { ...taskVal, isCompleted: !taskVal.isCompleted }
        : taskVal
    );

    setTaskList(updatedTaskList);
  };

  return (
    <main className="task-app">
      <Header />
      <TaskHero />
      <Quote quote={quote.content} author={quote.author} />
      <TaskForm handleTaskAdd={handleTaskAdd} />
      <TaskList tasks={taskList} handleTaskToggle={handleTaskToggle} />
    </main>
  );
}

export default App;
