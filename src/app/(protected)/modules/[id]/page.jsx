"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getModuleById, startModule } from "../../../../api/modules";

export default function ModuleDetailPage() {
  const { id } = useParams(); // dynamic module ID
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getModuleById(id);
        setModule(data);
        console.log(data);
        
      } catch (err) {
        console.error("Error fetching module:", err);
        setError("Failed to load module details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleStartModule = async () => {
    setStarting(true);
    setError("");
    try {
      await startModule(id);
      alert("Module started successfully 🚀"); // 🔹 replace with custom modal/toast
    } catch (err) {
      console.error("Error starting module:", err);
      setError("Failed to start module.");
    } finally {
      setStarting(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-600 dark:text-gray-300">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!module) {
    return <div className="p-6 text-red-500">Module not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {module.title}
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {module.description}
      </p>

      <div className="mt-6 space-y-2">
        <p>
          <span className="font-medium">Videos:</span> {module.videos}
        </p>
        <p>
          <span className="font-medium">Assignments:</span> {module.assignments}
        </p>
        {module.score !== undefined && (
          <p>
            <span className="font-medium">Score:</span> {module.score}
          </p>
        )}
      </div>

      <button
        onClick={handleStartModule}
        disabled={starting}
        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {starting ? "Starting..." : "Start Module"}
      </button>
    </div>
  );
}
