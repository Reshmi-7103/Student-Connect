// src/components/Dashboard.jsx
import React, { useState } from "react";
import UploadNotes from "./UploadNotes";
import TaskManager from "./TaskManager";
import { supabase } from "../supabaseClient";

const years = ["FY", "SY", "TY", "BE"];
const departments = ["IT", "CS", "EXTC", "MECH", "CIVIL", "CHEMICAL", "AI-DS"];

const Dashboard = ({ user }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);
  const [showTaskManager, setShowTaskManager] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">🎓 Student Dashboard</h2>
          <button
            onClick={logout}
            className="font-bold text-red-500 hover:underline border-none"
          >
            Logout
          </button>
        </div>

        <p className="mb-4 text-gray-600">
          Logged in as: <span className="font-semibold text-blue-600">{user.email}</span>
        </p>

        {/* Task Manager Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowTaskManager((prev) => !prev)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            {showTaskManager ? "Hide Tasks" : "📋 Open Task Manager"}
          </button>
        </div>

        {/* Show Task Manager */}
        {showTaskManager && <TaskManager userId={user.id} />}

        {/* Year Selection */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Select Year:</h3>
          <div className="flex flex-wrap gap-3">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => {
                  setSelectedYear(year);
                  setSelectedDept(null);
                }}
                className={`px-4 py-2 rounded shadow ${
                  selectedYear === year
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                } hover:bg-blue-500`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Department Selection */}
        {selectedYear && (
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Select Department for {selectedYear}:</h3>
            <div className="flex flex-wrap gap-3">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded shadow ${
                    selectedDept === dept
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-green-500`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Upload Notes */}
        {selectedYear && selectedDept && (
          <div className="mt-6">
            <UploadNotes path={`${selectedYear}/${selectedDept}`} userId={user.id} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center mt-10 text-sm text-gray-500">
        Made by Reshmi | &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Dashboard;
