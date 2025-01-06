import TaskList from './components/TaskList.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const API_BASE_URL = import.meta.env.API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/tasks`)
      .then((response) => {
        const formattedTasks = response.data.map((task) => ({
          id: task.id,
          title: task.title,
          isComplete: task.is_complete,
        }));
        setTasks(formattedTasks);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const toggleCompleteTask = (taskId, isComplete) => {
    const endpoint = isComplete
      ? `${API_BASE_URL}/tasks/${taskId}/mark_incomplete`
      : `${API_BASE_URL}/tasks/${taskId}/mark_complete`;

    axios
      .patch(endpoint)
      .then(() => {
        setTasks((prevTasks) => 
          prevTasks.map((task) => 
            task.id === taskId ? { ...task, isComplete: !isComplete } : task
          )
        );
      })
      .catch((error) => {
        console.error('Error toggling task completion:', error);
      });
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`${API_BASE_URL}/tasks/${taskId}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  const convertFromApi = (apiTask) => {
    const newTask = {
      ...apiTask,
      isComplete: apiTask.is_complete,
    };
    delete newTask.is_complete;
    return newTask;
  };

  const handleSubmit = (taskData) => {
    axios.post(`${API_BASE_URL}/tasks`, taskData)
      .then((result) => {
        setTasks((prevTasks) => [convertFromApi(result.data.task), ...prevTasks]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <NewTaskForm
            handleSubmit={handleSubmit}
          />
        </div>
        <div>
          <TaskList
            tasks={tasks}
            onToggleComplete={toggleCompleteTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
