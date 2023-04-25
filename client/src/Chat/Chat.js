import Person from "./components/Person";
import "./Chat.css";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});

function Chat(props) {
  const [data, setData] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState({
    id: "",
    username: "",
  });
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [myInfo, setMyInfo] = useState({ id: "", username: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + document.cookie.split("=")[1],
      },
    };
    fetch("http://localhost:3001/friends/all", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setData(data.friends);
      });

    const userInfoRequestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + document.cookie.split("=")[1],
      },
    };
    fetch("http://localhost:3001/user-info", userInfoRequestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMyInfo(data);
      });
  });

  useEffect(() => {
    socket.on("chat", (data) => {
      if (data.recipient == myInfo.id) {
        let output = document.getElementById("chat-window");
        output.innerHTML +=
          `<li class="flex justify-start">
          <div class="relative max-w-xl px-4 py-2 text-gray-100 bg-green-700 rounded shadow">
            <span class="block">` +
          data.message +
          `</span>
          </div>
        </li>`;
      }
    });

    // cleanup function
    return () => {
      socket.off("chat");
    };
  }, [myInfo]);
  const handlePersonClick = (id, username) => {
    let temp = { id: id, username: username };
    setSelectedPerson(temp);
  };

  const searchUsers = (event) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + document.cookie.split("=")[1],
      },
    };

    fetch("http://localhost:3001/users/all", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.users.filter((element) =>
          element.username
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        );
        setAllUsers(filteredData);
      });
  };

  const handleLogout = () => {
    document.cookie = `token=${
      document.cookie.split("=")[1]
    }; expires=${new Date(
      new Date().setFullYear(new Date().getFullYear() - 100)
    )}; path=/`;
    props.onLogout();
  };

  const sendMsg = (user) => {
    let message = document.getElementById("message").value;
    setMsg(message);
    const recipientId = user.id;
    socket.emit("chat", {
      message: message,
      recipient: recipientId,
      sender: myInfo.id,
    });
    document.getElementById("message").value = "";
    let output = document.getElementById("chat-window");
    output.innerHTML +=
      `<li class="flex justify-start">
        <li class="flex justify-end">
        <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
          <span class="block">` +
      message +
      `</span>
        </div>
      </li>`;
  };

  return (
    <div className="container mx-auto">
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>

      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">
          <div className="mx-3 my-3">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-300"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="search"
                className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                name="search"
                placeholder="Search"
                onChange={searchUsers}
                required
              />
            </div>
          </div>

          <ul className="overflow-auto h-[32rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg">Friends</h2>
            {data.map((element) => (
              <Person
                id={element.id}
                username={element.username}
                onClick={() => handlePersonClick(element.id, element.username)}
              />
            ))}
            <h2 className="my-2 mb-2 ml-2 text-lg">Other Users</h2>
            {allUsers.map((element) => (
              <Person
                id={element.id}
                username={element.username}
                onClick={() => handlePersonClick(element.id, element.username)}
              />
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2 lg:block">
          <div className="w-full">
            <div className="relative flex items-center p-3 border-b border-gray-300">
              <span
                className="block ml-2 font-bold text-gray-600"
                id="recipient"
              >
                {selectedPerson.username}
              </span>
            </div>
            <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
              <ul className="space-y-2" id="chat-window"></ul>
            </div>

            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
              <input
                type="text"
                placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message"
                id="message"
                required
              />
              <button onClick={() => sendMsg(selectedPerson)}>
                <svg
                  className="w-5 h-5 text-green-500 hover:text-green-400 origin-center transform rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
