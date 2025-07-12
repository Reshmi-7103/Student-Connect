// import React, { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import Auth from "./components/Auth";
// import Dashboard from "./components/Dashboard";

// function App() {
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) =>
//       setSession(session)
//     );
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {session ? <Dashboard user={session.user} /> : <Auth />}
//     </div>
//   );
// }

// export default App;

// src/App.js
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import TaskManager from "./components/TaskManager";

function App() {
  const [session, setSession] = useState(null);
  const [showTaskManager, setShowTaskManager] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!session) return <Auth />;

  return showTaskManager ? (
    <TaskManager user={session.user} goBack={() => setShowTaskManager(false)} />
  ) : (
    <Dashboard user={session.user} openTasks={() => setShowTaskManager(true)} />
  );
}

export default App;

