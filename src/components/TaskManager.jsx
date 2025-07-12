// src/components/TaskManager.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FaTrash } from "react-icons/fa";

const TaskManager = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setTasks(data);
  };

  const handleAddTask = async () => {
    if (!title || !date || !time) {
      alert("Please fill all required fields");
      return;
    }

    const { error } = await supabase.from("tasks").insert({
      user_id: userId,
      title,
      description,
      date,
      time,
    });

    if (error) console.error(error);
    else {
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      fetchTasks();
    }
  };

  const handleDeleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) console.error(error);
    else fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="bg-white p-6 mt-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-purple-700">🗓️ Task Manager</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          className="p-2 border rounded"
          type="text"
          placeholder="Task Title*"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="p-2 border rounded"
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="p-2 border rounded"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          className="p-2 border rounded"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <button
        onClick={handleAddTask}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ➕ Add Task
      </button>

      {/* Tasks List */}
      <div className="mt-6">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded shadow-sm"
              >
                <div>
                  <h4 className="font-semibold text-blue-700">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <p className="text-sm text-gray-500">
                    📅 {task.date} 🕒 {task.time}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
