'use client'
import { QueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from 'axios'

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

const urls = {
  userData: '/users/get-data',
  createUser: '/users/new-user',
  createGuest: '/users/new-guest',
  setUsername: '/users/set-username',
  createLobby: '/lobby/new-lobby',
}

const handleResponse = (response:AxiosResponse) => {
  if (!(response.statusText === 'OK')) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = response.data;
    throw error;
  }

  const { data } = response;

  return data;
}

export async function apiQuery({ signal, data, endpoint }) {
  const url = SERVER_URL + urls[endpoint]

  const response = await axios.post(
    url,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return handleResponse(response);
}

export async function apiMutate(data, endpoint:string) {
  const url = SERVER_URL + urls[endpoint]
  console.log(url)
  const response = await axios.post(
    SERVER_URL + urls[endpoint],
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return handleResponse(response)
}

export async function getUserData({signal, userData}) {
  const url = SERVER_URL + '/users/get-data'

  const response = await axios.post(
    url,
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

export async function createUser({ signal, userData }) {
  console.log(userData)
  let ext = 'new-user'
  if (userData.guest) ext = 'new-guest'

  const URL = SERVER_URL + '/users/' + ext

  // const response = await fetch(URL, { userData })
  const response = await axios.post(
    URL,
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
    error.info = response?.data;
    throw error;
  }

  const { data } = response;

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

export async function createLobby(userData:any) {

  const response = await axios.post(
    `http://localhost:8089/api/lobby/new-lobby`,
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


export async function joinLobby(id:string, lobby_id:string, socket:any) {

  socket?.emit('join-lobby', { id, lobby_id })
  // const response = await axios.post(
  //   `http://localhost:8089/api/lobby/join-lobby`,
  //   {
  //     id,
  //     lobby_id,
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );

  // if (!(response.statusText === 'OK')) {
  //   const error = new Error("An error occurred while fetching the events");
  //   error.code = response.status;
  //   error.info = response.data;
  //   throw error;
  // }

  // const { data } = response;

  // return data;
}
