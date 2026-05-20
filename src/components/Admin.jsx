import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import "../styles/admin.css";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let settled = false;
    const fallbackTimer = window.setTimeout(() => {
      if (!settled) {
        setLoading(false);
      }
    }, 2500);

    let unsubscribe = () => {};

    try {
      unsubscribe = onAuthStateChanged(
        auth,
        (currentUser) => {
          settled = true;
          window.clearTimeout(fallbackTimer);
          setUser(currentUser);
          setLoading(false);
        },
        (error) => {
          console.error("Admin auth check failed:", error);
          settled = true;
          window.clearTimeout(fallbackTimer);
          setUser(null);
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Admin auth setup failed:", error);
      settled = true;
      window.clearTimeout(fallbackTimer);
      setUser(null);
      setLoading(false);
    }

    return () => {
      settled = true;
      window.clearTimeout(fallbackTimer);
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="admin-loading">Checking access...</div>;
  }

  if (!user) {
    return <AdminLogin onLogin={() => setUser(auth.currentUser)} />;
  }

  return <AdminDashboard />;
}
