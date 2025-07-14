import { motion } from "framer-motion";
import React from "react";
import { statusColorMapping } from "../../utils/statusColorMapping";
const totalSecondsDay = 86400; // 24 * 60 * 60
interface CurrentTimeBarProps {
  sortedData: {
    status: string;
    time: number;
  }[];
}
export default function CurrentTimeBar({ sortedData }: CurrentTimeBarProps) {
  const [seconds, setSeconds] = React.useState<number>(0);

  React.useEffect(() => {
    const latestStatusTime = sortedData[sortedData.length - 1]?.time || 0;

    const updateSeconds = () => {
      const now = Math.floor(Date.now() / 1000);
      const lastStatusSeconds = getSecondsOfDay(latestStatusTime);
      const currentSeconds = getSecondsOfDay(now);
      setSeconds(currentSeconds - lastStatusSeconds);
    };

    updateSeconds();
    const intervalId = setInterval(updateSeconds, 1000);

    return () => clearInterval(intervalId);
  }, [sortedData]);
  return (
    <>
      <motion.div
        key="current-time"
        initial={{ width: 0 }}
        animate={{ width: `${(seconds / totalSecondsDay) * 100}%` }}
        transition={{ duration: 0.5 }}
        className="h-full"
        style={{
          backgroundColor:
            statusColorMapping.get(sortedData[sortedData.length - 1]?.status) ||
            statusColorMapping.get("offline"),
        }}
      />
    </>
  );
}

function getSecondsOfDay(unixTimestamp: number): number {
  const date = new Date(unixTimestamp * 1000);
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}
