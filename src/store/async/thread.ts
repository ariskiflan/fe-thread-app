import { createAsyncThunk } from "@reduxjs/toolkit";
import { getThreadByUserId, getThreads } from "../../libs/api/call/thread";

export const getThreadAsync = createAsyncThunk("thread/getThread", async () => {
  try {
    const threadRes = await getThreads();

    return threadRes.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const getThreadAsyncByUserId = createAsyncThunk(
  "thread/getThreadbyUserId",
  async (id: number) => {
    try {
      const threadByIdRes = await getThreadByUserId(id);

      return threadByIdRes.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
