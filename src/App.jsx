import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const { user, setUser, setToken } = useContext(AuthContext);

  const refreshNewToken = useCallback(async () => {
    console.log("refreshNewToken =>>");
    try {
      const res = await axios.post(
        "https://dummyjson.com/auth/refresh",
        {},
        // { withCredentials: true },
      );

      const newAccessToken = res.data.accessToken;

      setToken(newAccessToken);

      return newAccessToken;
    } catch (error) {
      console.log(error);
    }
  }, [setToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Login & Get JWT
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username,
          password,
          expiresInMins: 30,
        },
        // { withCredentials: true },
      );
      const accessToken = response.data.accessToken;
      setToken(accessToken);

      // 2. Get User Based on JWT
      const userResponse = await axios.get("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Pass JWT via Authorization header
        },
      });
      setUser(userResponse.data);
    } catch (error) {
      if (error.message.status === 401) {
        const newtoken = await refreshNewToken();
        try {
          const response = await axios.post(
            "https://dummyjson.com/post",
            {
              title,
              body,
            },
            {
              headers: {
                Authorization: `Bearer ${newtoken}`, // Pass JWT via Authorization header
              },
            },
          );
        } catch (error) {
          console.log(error);
        }
      }
      console.log(error);
    }
  };
  useEffect(() => {
    const restoreSession = async () => {
      const newToken = await refreshNewToken();

      try {
        const userResponse = await axios.get("https://dummyjson.com/auth/me", {
          headers: {
            Authorization: `Bearer ${newToken}`, // Pass JWT via Authorization header
          },
        });
        setUser(userResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    restoreSession();
  }, [setUser, refreshNewToken]);

  const handleLogout = async () => {
    await axios.post(
      "https://dummyjson.com/auth/logout",
      {},
      // { withCredentials: true },
    );
    setToken(null);
    setUser(null);
  };

  const isShown = true;

  return (
    <>
      {/* {token && !user && (
        <div className="fixed bg-white/70 inset-0 flex items-center justify-center">
          <img src="/assets/gif/loading.gif" alt="loading" width={50} />
        </div>
      )} */}
      {isShown && <Header />}
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Eneter username..."
          className="border rounded-sm px-3 py-2"
        />
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Eneter Password..."
          className="border rounded-sm px-3 py-2"
        />
        <br />
        <input
          type="submit"
          value={"Submit"}
          className="bg-blue-500 rounded-sm px-3 py-2 cursor-pointer"
        />
      </form>

      {user && (
        <h1 className="text-center text-7xl">Hello {user.firstName}!</h1>
      )}
    </>
  );
}

export default App;
