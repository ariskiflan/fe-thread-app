import { useState } from "react";
import { IThread } from "../types/app";
import { getThreads } from "../libs/api/call/thread";

const useThread = () => {
  const [threads, setThreads] = useState<IThread[] | []>([]);

  // const [preview, setPreview] = useState("");

  const getThread = async () => {
    try {
      const res = await getThreads();

      setThreads(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getThread,
    threads,
    // preview,
  };
};

export default useThread;
