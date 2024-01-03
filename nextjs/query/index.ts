'use client'
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const PORT = 8089;
const SERVER_URL = `http://localhost:${PORT}`;

export async function fetchTest({ signal }) {
  let url = SERVER_URL;

  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { data } = await response.json();

  return data;
}
