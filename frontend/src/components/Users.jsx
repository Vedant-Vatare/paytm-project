import { useEffect, useState } from "react";
import InputField from "./InputField";
import UserDetails from "./UserDetails";
import LoadingUsers from "./LoadingUsers";
import axios from "axios";

const Users = () => {
  const [filter, setFilter] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function debounce(callback, delay = 1000) {
    let timeout;
    return (...args) => {
      clearInterval(timeout);
      timeout = setTimeout(() => callback(...args), delay);
    };
  }

  const debounceFilter = debounce((value) => setFilter(value), 1000);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?filter=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsersList(response.data.users);
      setIsLoading(false);
    } catch (e) {
      console.log("Error:", e);
      setUsersList([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);
  return (
    <>
      <h1 className="font-semibold font-opensans text-2xl my-6">Users</h1>
      <InputField
        name="user"
        placeholder="Search Users"
        type="text"
        handler={(e) => debounceFilter(e.target.value)}
      />
      <div className="mt-8">
        {isLoading ? (
          <LoadingUsers />
        ) : usersList.length > 0 ? (
          usersList.map((user, index) => {
            return (
              <UserDetails
                firstName={user.firstName}
                lastName={user.lastName}
                userId={user._id}
                key={index}
              />
            );
          })
        ) : (
          <h1>Users could not be fetched</h1>
        )}
      </div>
    </>
  );
};
export default Users;
