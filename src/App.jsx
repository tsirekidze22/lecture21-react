import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Login & Get JWT
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
        expiresInMins: 30,
      });

      const accessToken = response.data.accessToken;
      setToken(accessToken);

      // 2. Save Token in LocalStorage
      localStorage.setItem("token", accessToken);

      // 3. Get User Based on JWT
      const userResponse = await axios.get("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Pass JWT via Authorization header
        },
      });
      setUser(userResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const restoreSession = async () => {
      const savedToken = localStorage.getItem("token");
      if (!savedToken) return;

      setToken(savedToken);

      try {
        const userResponse = await axios.get("https://dummyjson.com/auth/me", {
          headers: {
            Authorization: `Bearer ${savedToken}`, // Pass JWT via Authorization header
          },
        });
        setUser(userResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    restoreSession();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <>
      {/* {token && !user && (
        <div className="fixed bg-white/70 inset-0 flex items-center justify-center">
          <img src="/assets/gif/loading.gif" alt="loading" width={50} />
        </div>
      )} */}
      <header className="border mb-10 min-h-[60px] px-24 flex items-center justify-between">
        <a className="/">Logo</a>
        {token && !user ? (
          <img src="/assets/gif/loading.gif" alt="loading" width={25} />
        ) : user ? (
          <div className="flex items-center gap-x-2">
            <img
              src="/assets/icons/profile-icon.svg"
              alt={"profile"}
              width={25}
            />
            <h3>{user.firstName}</h3>
            <button
              className="bg-blue-500 rounded-sm px-3 py-2 text-white cursor-pointer"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        ) : (
          <button className="bg-blue-500 rounded-sm px-3 py-2 text-white cursor-pointer">
            Log In
          </button>
        )}
      </header>
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
