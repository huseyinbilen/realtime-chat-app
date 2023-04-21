import Person from "./components/Person";
import "./Chat.css";
import { Component } from "react";

class Chat extends Component {
  state = {
    data: [],
    selectedPerson: {
      id: "",
      username: "",
    },
    allUsers: [],
    filteredUsers: [],
  };

  componentDidMount() {
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
        this.setState({ data: data.friends });
      });
  }

  handlePersonClick = (id, username) => {
    this.setState({ selectedPerson: { id: id, username: username } }); // seçilen kişiyi state'e kaydet
  };

  searchUsers = (event) => {
    console.log(event.target.value);
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
        this.setState({ allUsers: filteredData });
      });
  };

  handleLogout = () => {
    document.cookie = `token=${document.cookie.split("=")[1]}; expires=${new Date(
      new Date().setFullYear(new Date().getFullYear() - 100)
    )}; path=/`;
  };

  render() {
    const { data } = this.state;
    const { selectedPerson } = this.state;
    const { allUsers } = this.state;
    return (
      <div className="container mx-auto">
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={this.handleLogout}>
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
                  onChange={this.searchUsers}
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
                  onClick={() =>
                    this.handlePersonClick(element.id, element.username)
                  }
                />
              ))}
              <h2 className="my-2 mb-2 ml-2 text-lg">Other Users</h2>
              {allUsers.map((element) => (
                <Person
                  id={element.id}
                  username={element.username}
                  onClick={() =>
                    this.handlePersonClick(element.id, element.username)
                  }
                />
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2 lg:block">
            <div className="w-full">
              <div className="relative flex items-center p-3 border-b border-gray-300">
                <span className="block ml-2 font-bold text-gray-600">
                  {selectedPerson.username}
                </span>
              </div>
              <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                <ul className="space-y-2">
                  <li className="flex justify-start">
                    <div className="relative max-w-xl px-4 py-2 text-gray-100 bg-green-700 rounded shadow">
                      <span className="block">Hi</span>
                    </div>
                  </li>
                  <li className="flex justify-end">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span className="block">Hiiii</span>
                    </div>
                  </li>
                  <li className="flex justify-end">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span className="block">how are you?</span>
                    </div>
                  </li>
                  <li className="flex justify-start">
                    <div className="relative max-w-xl px-4 py-2 text-gray-100 bg-green-700 rounded shadow">
                      <span className="block">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <input
                  type="text"
                  placeholder="Message"
                  className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message"
                  required
                />
                <button type="submit">
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
}

export default Chat;
