"use client";
import { useEffect, useState } from "react";
import { getChallenges } from "../../../api/challenges";
import { transformChallenges } from "../../../utils/challenges";
import ChallengeCard from "../ChallengeCard/ChallengeCard";
import Tabs from "../../Tabs/Tabs";




export default function ChallengesPage() {
  const [challenges, setChallenges] = useState({
    active: { enrolled: [], others: [] },
    upcoming: { enrolled: [], others: [] },
    completed: { enrolled: [], others: [] },
  });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("active");

  useEffect(() => {
    async function fetchData() {
      try {
        const raw = await getChallenges();
        const transformed = transformChallenges(raw?.data || []);
        setChallenges(transformed);
      } catch (err) {
        console.error("Error fetching challenges:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const tabs = [
    { value: "active", label: "Ongoing" },
    { value: "upcoming", label: "Upcoming" },
    { value: "completed", label: "Completed" },
  ];

  const renderChallengeSection = (title, list) => (
    list.length > 0 && (
      <>
        <h2 className="text-xl font-semibold mt-6 mb-3">{title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((c, index) => (
            <ChallengeCard key={c.challenge_id || index} id={c.challenge_id} {...c} />
          ))}
        </div>
      </>
    )
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">🚀 Challenges</h1>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={tab} onChange={setTab} />

      {/* Content */}
      {loading ? (
        <p>Loading challenges...</p>
      ) : challenges[tab].enrolled.length === 0 &&
        challenges[tab].others.length === 0 ? (
        <p className="text-gray-500">No {tab} challenges.</p>
      ) : (
        <>
          {renderChallengeSection("✅ Enrolled Challenges", challenges[tab].enrolled)}
          {renderChallengeSection("📌 Other Challenges", challenges[tab].others)}
        </>
      )}
    </div>
  );
}

