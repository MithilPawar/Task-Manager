import React, { useState, useEffect } from "react";
import {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
} from "../api/taskApi.js";

import { FaEdit, FaTrash, FaPlus, FaSave, FaSpinner } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const allTasks = await getAllTask();
      setTasks(allTasks);
    } catch (error) {
      showMessage("error", "Error fetching tasks: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, status } = formData;
    console.log(title, description, status);
    if (!title.trim() || !description.trim() || !status.trim()) {
      showMessage("error", "Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      if (editId) {
        await updateTask(editId, { ...formData });
        showMessage("success", "Task updated successfully");
      } else {
        await createTask({ ...formData });
        showMessage("success", "Task created successfully");
      }
      setFormData({ title: "", description: "", status: "Pending" });
      setEditId(null);
      fetchTasks();
    } catch (error) {
      showMessage("error", "Operation failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setEditId(task._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      setLoading(true);
      await deleteTask(id);
      showMessage("success", "Task deleted successfully");
      fetchTasks();
    } catch (error) {
      showMessage("error", "Delete failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {message.text && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border-l-4 border-green-400"
              : "bg-red-100 text-red-800 border-l-4 border-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Task Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
      >
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
          {editId ? (
            <>
              <FaEdit /> Edit Task
            </>
          ) : (
            <>
              <FaPlus /> Create Task
            </>
          )}
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Task Title"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <textarea
            placeholder="Task Description"
            rows={3}
            className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700">Status</label>
          <select
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all duration-200 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Processing...
              </>
            ) : editId ? (
              <>
                <FaSave /> Update Task
              </>
            ) : (
              <>
                <FaPlus /> Create Task
              </>
            )}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setFormData({ title: "", description: "", status: "Pending" });
              }}
              className="text-red-600 text-sm flex items-center gap-2 hover:underline"
            >
              <MdCancel size={18} /> Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Task Table */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden transition-all duration-300">
        {loading ? (
          <div className="py-6 flex justify-center items-center gap-2 text-gray-500">
            <FaSpinner className="animate-spin" /> Loading tasks...
          </div>
        ) : tasks.length === 0 ? (
          <div className="py-6 text-center text-gray-500">No tasks found.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
              <tr>
                <th className="text-left p-4 border-b">Title</th>
                <th className="text-left p-4 border-b">Description</th>
                <th className="text-left p-4 border-b">Status</th>
                <th className="text-left p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="p-4 border-b">{task.title}</td>
                  <td className="p-4 border-b">{task.description}</td>
                  <td className="p-4 border-b">{task.status}</td>
                  <td className="p-4 border-b flex gap-3">
                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
