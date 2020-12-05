import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";

const Dashboard = () => {
  const [involved, setinvolved] = useState([]);
  const [searchEle, setSearchEle] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const history = useHistory();
  const [modalIsOpen, setIsOpen] = useState(false);
  const session = JSON.parse(localStorage.getItem("session"));
  const username = session.username;
  const isLoggedin = session.loggedIn;
  const onpress = ({ username, chatID }) => {
    history.push("/chat", { person: username, chatID: chatID });
  };
  const toggleModal = () => {
    setIsOpen(!modalIsOpen);
  };
  useEffect(() => {
    Axios.post("http://localhost:3001/user/involved", {
      username: username,
    }).then((res) => {
      const data = res.data;
      setinvolved(data);
    });
  }, [username]);
  const involvedView = involved.map((item) => {
    //console.log(item);
    return (
      <div
        onClick={() => {
          onpress({ username: item.person, chatID: item.chatID });
        }}
        className="rounded-full mt-2 mb-2 bg-gray-100 py-3 px-6"
      >
        {item.person}
      </div>
    );
  });
  const resultView = searchRes.map((item) => {
    const chatID =
      username + "-" + item.username + Math.random().toString(36).substring(2);
    return (
      <div
        onClick={() => onpress({ username: item.username, chatID: chatID })}
        className="p-5 border-2 border-black mt-5 rounded-lg"
      >
        {item.username}
      </div>
    );
  });

  if (isLoggedin === true) {
    return (
      <>
        <div className="m-10 ">
          <Modal isOpen={modalIsOpen} onRequestClose={toggleModal}>
            <button onClick={toggleModal}>close</button>
            <div className="m-10">
              <input
                className=" border-2 rounded- w-full p-4"
                placeholder="Search"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    //Axios
                    Axios.post("http://localhost:3001/user/search", {
                      username: searchEle,
                    }).then((res) => {
                      const data = res.data;

                      setSearchRes(data);
                    });
                  }
                }}
                onChange={(e) => {
                  setSearchEle(e.target.value);
                }}
              />
              <div className="mt-10">Search Results</div>
              {resultView}
            </div>
          </Modal>

          <div className="flex p-8 bg-blue-50 justify-center rounded-lg ">
            <div className="flex">
              <img
                src="data:image/png;base64,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"
                alt="W3Schools.com"
                className="rounded-full h-24 w-24 "
              />
              <div className="mt-1">
                <div className="ml-8">{username}</div>
                <div className=" ml-8 mt-2 text-sm">🟢 Online</div>
                <div
                  onClick={() => {
                    localStorage.removeItem("session");
                    history.replace("/login");
                  }}
                  className=" bg-red-200 text-center rounded-lg p-2 ml-8 mt-2 text-sm"
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={toggleModal}
            className="p-8 mt-4 bg-green-300 hover:bg-green-400 rounded-lg"
          >
            <div className=" text-center font-bold">Add Conversation</div>
          </div>
          <div className="p-8 mt-4 bg-blue-100 rounded-lg">
            <div className="font-bold">Conversations</div>
            <div className="mt-5">{involvedView}</div>
          </div>
        </div>
      </>
    );
  } else {
    history.replace("/login");
    return null;
  }
};

export default Dashboard;
