import React from "react";


export default function StatusTimeline() {
  const [seconds, setSeconds] = React.useState<number>(0);
  const [minutes, setMinutes] = React.useState<number>(0);
  const [hour, setHour] = React.useState<number>(0);
  console.log(seconds, minutes, hour); 
  
  if(false){
    setSeconds(0);
    setMinutes(0);
    setHour(0);
  }

  React.useEffect(()=>{

  },[])
  return <></>;
}
