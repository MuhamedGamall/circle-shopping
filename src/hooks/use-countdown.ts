import { useEffect, useState } from "react";

export default function useCountdown( number : number ) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer < number) {
        const increment = Math.ceil((number - timer) / 100);
        setTimer((prevTimer) => prevTimer + increment || number);
      } else {
        clearInterval(intervalId);
      }
    }, 5);

    return () => clearInterval(intervalId);
  }, [number, timer]);
  return {timer}
}
