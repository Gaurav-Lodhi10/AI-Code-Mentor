"use client";

import { useState } from "react";

interface Analysis {
  strengths: string;
  improvements: string;
  recommendations: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  score?: number;
}

interface CodeSubmissionFormProps {
  onAnalysisComplete: (analysis: Analysis) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function CodeSubmissionForm({
  onAnalysisComplete,
  loading,
  setLoading,
}: CodeSubmissionFormProps) {
  const [problemName, setProblemName] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemName.trim() || !code.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemName: problemName.trim(),
          code: code.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze code");
      }

      const data = await response.json();
      console.log("API Response:", data);
      console.log("Analysis data:", data.analysis);
      onAnalysisComplete(data.analysis);
    } catch (error) {
      console.error("Error analyzing code:", error);
      alert("Failed to analyze code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <label htmlFor="problemName" className="block text-sm font-medium text-gray-700 mb-2">
          Problem Name
        </label>
        <input
          type="text"
          id="problemName"
          value={problemName}
          onChange={(e) => setProblemName(e.target.value)}
          placeholder="e.g., Two Sum, Valid Parentheses"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
          Your Solution Code
        </label>
        <textarea
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code solution here..."
          rows={15}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Analyzing..." : "Analyze Code"}
      </button>
    </form>
  );
} 