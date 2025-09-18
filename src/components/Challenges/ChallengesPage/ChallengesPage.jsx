"use client";
import { useEffect, useState } from "react";
import { getChallenges } from "../../../api/challenges";
import ChallengeCard from "../ChallengeCard/ChallengeCard";
import Tabs from "../../Tabs/Tabs";
import Loader from "../../Loader/Loader";

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]); // ✅ raw API data
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("active");

  useEffect(() => {
    async function fetchData() {
      try {
        const raw = await getChallenges();
        setChallenges(raw?.data || []); // ✅ no transform
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

  // ✅ Group challenges by enrolled vs others directly
  const getGroupedChallenges = (type) => {
    const filtered = challenges.filter((c) => c.challenge_status === type);

    // 🔹 Sort latest first using challenge_created_at
    const sorted = [...filtered].sort(
      (a, b) => new Date(b.challenge_created_at) - new Date(a.challenge_created_at)
    );

    return {
      enrolled: sorted.filter((c) => c.progress_status), // has progress = enrolled
      others: sorted.filter((c) => !c.progress_status), // no progress = others
    };
  };

  const grouped = getGroupedChallenges(tab);

  const renderChallengeSection = ( list, type) =>
    list.length > 0 && (
      <>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((c) => (
            <ChallengeCard key={c.challenge_id} type={type} {...c} />
          ))}
        </div>
      </>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">🚀 Challenges</h1>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={tab} onChange={setTab} />

      {/* Content */}
      {loading ? (
        <div><Loader /></div>
      ) : grouped.enrolled.length === 0 && grouped.others.length === 0 ? (
        <p className="text-gray-500">No {tab} challenges.</p>
      ) : (
        <>
          {renderChallengeSection( grouped.enrolled, tab)}
          {renderChallengeSection( grouped.others, tab)}
          
        </>
      )}
    </div>
  );
}
