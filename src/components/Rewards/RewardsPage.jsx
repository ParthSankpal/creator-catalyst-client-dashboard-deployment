"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Notification from "@/src/components/Notification/Notification";
import { getRewardPageDetails, redeemReward } from "@/src/api/rewardsApi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatIndianDate } from "@/src/utils/validation";

export default function RewardsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [redeeming, setRedeeming] = useState(null);
  const [confirmReward, setConfirmReward] = useState(null); // 🔑 state for modal

  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await getRewardPageDetails();
      setData(res);
    } catch (err) {
      console.error("Error fetching rewards:", err);
      setNotification({ message: "Failed to load rewards", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRedeem = async () => {
    if (!confirmReward) return;
    try {
      setRedeeming(confirmReward.reward_id);
      await redeemReward(confirmReward.reward_id);
      setNotification({ message: "Reward redeemed successfully!", type: "success" });

      setConfirmReward(null); // close modal
      await fetchData(); // ✅ refetch
    } catch (err) {
      console.error("Redeem Error:", err);
      setNotification({ message: "Failed to redeem reward", type: "error" });
    } finally {
      setRedeeming(null);
    }
  };

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

  console.log(data);
  
  const {
    earned_badges,
    available_badges,
    points,
    rewards,
    redeemed_rewards,
    recent_activities,
  } = data;

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
      {/* Weekly Activities Summary */}
      <Card>
        <CardHeader>
          <CardTitle>This Week's Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Points Earned</p>
            <p className="font-semibold">{points.points_earned_this_week}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Coins Earned</p>
            <p className="font-semibold">{points.coins_earned_this_week}</p>
          </div>
        </CardContent>
      </Card>


      {/* Redeemable Rewards */}
      <Card>
        <CardHeader>
          <CardTitle>Redeem Rewards</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((r) => (
            <div
              key={r.reward_id}
              className="md:flex items-center gap-4 p-4 border rounded-lg"
            >
              <div className="text-3xl">{r.logo}</div>
              <div className="flex-1">
                <p className="font-semibold">{r.title}</p>
                <p className="text-sm text-gray-500">{r.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge>{r.coin_cost} Coins</Badge>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button
                          size="sm"
                          className="cursor-pointer"
                          variant="outline"
                          onClick={() => setConfirmReward(r)}
                          disabled={points.available_coins < r.coin_cost}
                        >
                          Redeem
                        </Button>
                      </span>
                    </TooltipTrigger>
                    {points.available_coins < r.coin_cost && (
                      <TooltipContent>
                        <p>
                          You don’t have enough coins. You need{" "}
                          {r.coin_cost - points.available_coins} more.
                        </p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>


              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Redeemed Rewards */}
      {redeemed_rewards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Redeemed Rewards</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {redeemed_rewards.map((rr) => (
              <div
                key={rr.redemption_id}
                className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50"
              >
                <div className="text-3xl">{rr.reward_logo || "🏅"}</div>
                <div className="flex-1">
                  <p className="font-semibold">{rr.reward_name || "Reward"}</p>
                  <p className="text-sm text-gray-500">
                    Status: {rr.status || "pending"}
                  </p>
                </div>
                <Badge>{rr.coins_used} Coins Used</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}


      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recent_activities.length > 0 ? (
            recent_activities.map((a, idx) => {
              let targetUrl = null;
              if (a.module_id) targetUrl = `/modules/${a.module_id}`;
              if (a.challenge_id) targetUrl = `/challenges/${a.challenge_id}`;

              // ✅ Check if activity is within last 7 days
              const activityDate = new Date(a.date);
              const sevenDaysAgo = new Date();
              sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
              const isThisWeek = activityDate >= sevenDaysAgo;

              return (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b last:border-b-0 pb-2"
                >
                  <div>
                    <p className="font-medium">{a.description}</p>
                    <p className="text-xs text-gray-500">
                      {formatIndianDate(a.date)}
                    </p>
                    {isThisWeek && (
                      <Badge className="mt-1 bg-green-100 text-green-700">
                        This Week
                      </Badge>
                    )}
                  </div>
                  <div className="text-right space-y-1">
                    {a.points_earned > 0 && (
                      <p className="text-green-600 text-sm">
                        +{a.points_earned} pts
                      </p>
                    )}
                    {a.coins_earned > 0 && (
                      <p className="text-blue-600 text-sm">
                        {a.coins_earned > 0
                          ? `+${a.coins_earned} coins`
                          : `${a.coins_earned} coins`}
                      </p>
                    )}
                    {targetUrl && (
                      <Button
                        size="sm"
                        className="cursor-pointer"
                        variant="outline"
                        onClick={() => router.push(targetUrl)}
                      >
                        View
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-500">No recent activities yet.</p>
          )}
        </CardContent>
      </Card>


      {/* Confirm Redeem Modal */}
      <Dialog open={!!confirmReward} onOpenChange={() => setConfirmReward(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Redemption</DialogTitle>
            <DialogDescription>
              Are you sure you want to redeem{" "}
              <span className="font-semibold">{confirmReward?.reward_name}</span>{" "}
              for {confirmReward?.cost} coins?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmReward(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleRedeem}
              className=" cursor-pointer"
              disabled={redeeming === confirmReward?.reward_id}
            >
              {redeeming === confirmReward?.reward_id ? "Redeeming..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


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
