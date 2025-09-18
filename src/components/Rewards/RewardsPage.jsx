"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Notification from "@/src/components/Notification/Notification";
import { getRewardPageDetails } from "@/src/api/rewardsApi";

export default function RewardsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRewardPageDetails();
        console.log(res);
        
        setData(res);
      } catch (err) {
        console.error("Error fetching rewards:", err);
        setNotification({ message: "Failed to load rewards", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (!data) return null;

  const { earned_badges, available_badges, points, rewards, recent_activities } =
    data;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold">🎁 Rewards & Badges</h2>

      {/* Points Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Your Points</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Points</p>
            <p className="font-semibold">{points.total_points}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Available Coins</p>
            <p className="font-semibold">{points.available_coins}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Redeemed Coins</p>
            <p className="font-semibold">{points.redeemed_coins}</p>
          </div>
        </CardContent>
      </Card>

      {/* Earned Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Earned Badges</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {earned_badges.length > 0 ? (
            earned_badges.map((b) => (
              <div
                key={b.id}
                className="flex flex-col items-center justify-center p-3 border rounded-lg"
              >
                <img src={b.icon} alt={b.label} className="h-10 w-10" />
                <p className="mt-2 font-medium">{b.label}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No badges earned yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Available Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Available Badges</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {available_badges.map((b) => (
            <div
              key={b.id}
              className="flex flex-col items-center justify-center p-3 border rounded-lg"
            >
              <img src={b.icon} alt={b.label} className="h-10 w-10" />
              <p className="mt-2 font-medium">{b.label}</p>
              <p className="text-xs text-gray-500 text-center">
                {b.reward_condition_required}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rewards Catalog */}
      <Card>
        <CardHeader>
          <CardTitle>Redeem Rewards</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((r) => (
            <div
              key={r.reward_id}
              className="flex items-center gap-4 p-4 border rounded-lg"
            >
              <div className="text-3xl">{r.reward_logo}</div>
              <div className="flex-1">
                <p className="font-semibold">{r.reward_name}</p>
                <p className="text-sm text-gray-500">
                  {r.reward_description}
                </p>
              </div>
              <Badge>{r.cost} Coins</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recent_activities.length > 0 ? (
            recent_activities.map((a, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{a.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(a.date).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 text-sm">
                    +{a.points_earned} pts
                  </p>
                  <p className="text-blue-600 text-sm">
                    +{a.coins_earned} coins
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No recent activities yet.</p>
          )}
        </CardContent>
      </Card>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
