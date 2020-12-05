import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "./logo.jpg";
import "./signup.css";

const Signup = () => {
  const history = useHistory();
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [name, setname] = useState();

  const onSignUp = () => {
    Axios.post("http://localhost:3001/user/signup", {
      username: username,
      password: password,
      name: name,
    })
      .then((res) => {
        const data = res.data;
        if (data === true) {
          localStorage.setItem(
            "session",
            JSON.stringify({ loggedIn: true, username: username })
          );
          history.replace("/dashboard");
        } else {
          alert("Wrong Credentials");
        }
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };
  const updateUsername = (e) => {
    setusername(e.target.value);
  };
  const updateName = (e) => {
    setname(e.target.value);
  };
  const updatePassword = (e) => {
    setpassword(e.target.value);
  };
  return (
    <div className="m-10">
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <img style={{ alignSelf: "center" }} src={logo} alt="logo" />
        <div class="mb-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="name"
          >
            Name
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="name"
            type="text"
            placeholder="Name"
            onChange={(e) => {
              updateName(e);
            }}
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              updateUsername(e);
            }}
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => {
              updatePassword(e);
            }}
          />
        </div>

        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-100 text-white font-bold py-2 px-4 rounded"
            type="button"
            placeholder="Sign in"
            onClick={onSignUp}
          >
            Sign Up
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-100 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => {
              history.replace("/login");
            }}
          >
            Sign In instead?
          </button>
        </div>
      </div>
      <footer className="footer">
        © Project Created by Rahul, Rajeshwari and Ramya
      </footer>
    </div>
  );
};

export default Signup;
