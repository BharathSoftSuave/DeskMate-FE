/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getStatusTimeline } from "../../service/statusService";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import CurrentTimeBar from "./CurrentTimeBar";
const StatusTimeline: React.FC = () => {
  // State: seconds since last status change
  const [timeLinedata, setTimeLineData] = useState<
    { status: string; time: string }[]
  >([]);
  const status = useSelector((state: RootState) => state.status);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatusTimeline();
        if (response && response.chrono_stamps) {
          const today = new Date().toISOString().slice(0, 10);
          const currentDateData = response.chrono_stamps[today];
          setTimeLineData(currentDateData || []);
        }
      } catch (error) {
        console.error("Error fetching status timeline data:", error);
      }
    };
    fetchData();
  }, [status]);

  const statusColorMap: Record<string, string> = {
    offline: "#C0C0C0",
    available: "#22c55e",
    busy: "#f11116",
    meeting: "#2f7dde",
    on_call: "#d0df19",
    break: "#FE9900",
  };

  const sortedData = React.useMemo(() => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const unixMidnight = Math.floor(midnight.getTime() / 1000);
    const data = [
      { time: unixMidnight, status: "offline" },
      ...(timeLinedata
        .map((item) => {
          const numTime = Number(item.time);
          return numTime > 0 ? { ...item, time: numTime } : null;
        })
        .filter(Boolean) as { time: number; status: string }[]),
    ];
    return data.sort((a, b) => a.time - b.time);
  }, [timeLinedata]);

  const totalSecondsDay = 86400; // 24 * 60 * 60


  // Build timeline segments based on seconds
  const timelineSegments = [];
  for (let i = 0; i < sortedData.length - 1; i++) {
    const lowerBound = getSecondsOfDay(sortedData[i].time);
    const upperBound = getSecondsOfDay(sortedData[i + 1].time);
    const duration = upperBound - lowerBound;

    const widthPercent = (duration / totalSecondsDay) * 100;

    timelineSegments.push({
      widthPercent,
      status: sortedData[i].status,
      key: `${sortedData[i].time}-${sortedData[i + 1].time}`,
    });
  }

  // Final segment from last status to end of day
  const lastStatusTime = sortedData[sortedData.length - 1]?.time;
  if (lastStatusTime) {
    const endOfDay = new Date(lastStatusTime * 1000);
    endOfDay.setHours(24, 0, 0, 0);
    const endOfDayUnix = Math.floor(endOfDay.getTime() / 1000);
    const lastSegmentSeconds =
      getSecondsOfDay(endOfDayUnix) - getSecondsOfDay(lastStatusTime);

    if (lastSegmentSeconds > 0) {
      timelineSegments.push({
        widthPercent: (lastSegmentSeconds / totalSecondsDay) * 100,
        status: sortedData[sortedData.length - 1].status,
        key: `${lastStatusTime}-end`,
      });
    }
  }

  console.log("dsfdszxd", sortedData);

  return (
    <div className="w-full flex flex-col relative">
      <div className="relative w-full border rounded overflow-hidden h-4 bg-gray-200 flex">
        {timelineSegments.map((segment) => (
          <motion.div
            key={segment.key}
            initial={{ width: 0 }}
            animate={{ width: `${segment.widthPercent}%` }}
            transition={{ duration: 0.5 }}
            className="h-full"
            style={{
              backgroundColor:
                statusColorMap[segment.status] || statusColorMap.offline,
            }}
          />
        ))}
        <CurrentTimeBar sortedData={sortedData} />
      </div>

      <div className="flex justify-between text-xs mt-2">
        {Array.from({ length: 13 }, (_, i) => {
          const hour = i * 2;
          return (
            <span key={hour}>
              {hour === 0
                ? "12am"
                : hour < 12
                ? `${hour}am`
                : hour === 12
                ? "12pm"
                : `${hour - 12}pm`}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// Get seconds since midnight for a unix timestamp
function getSecondsOfDay(unixTimestamp: number): number {
  const date = new Date(unixTimestamp * 1000);
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}

export default StatusTimeline;
