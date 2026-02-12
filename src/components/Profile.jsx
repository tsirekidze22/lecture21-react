import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { token, user } = useContext(AuthContext);
  return (
    <>
      {user && `User is ${user.firstName}`}

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
            // onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      ) : (
        <button className="bg-blue-500 rounded-sm px-3 py-2 text-white cursor-pointer">
          Log In
        </button>
      )}
    </>
  );
};

export default Profile;
