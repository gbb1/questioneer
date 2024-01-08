'use client'
import { QueryClient } from "@tanstack/react-query";
import axios from 'axios'

export const queryClient = new QueryClient();

const PORT = 8089;
const SERVER_URL = `http://localhost:${PORT}/api`;

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


export async function createUser({ signal, userData }) {
  let ext = 'new-user'
  if (userData.guest) ext = 'new-guest'

  const URL = SERVER_URL + '/' + ext

  const response = await fetch(URL, { userData })

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { data } = await response.json();

  return data;
}

export async function setUsername(userData:any) {

  const response = await axios.post(
    `http://localhost:8089/api/users/set-username`,
    userData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!(response.statusText === 'OK')) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = response.data;
    throw error;
  }

  const { data } = response;

  return data;
}

