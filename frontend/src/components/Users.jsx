import { useEffect, useState } from "react";
import InputField from "./InputField";
import UserDetails from "./UserDetails";
import LoadingUsers from "./LoadingUsers";
import axios from "axios";

const Users = () => {
  const [filter, setFilter] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function fetchUsers() {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(
        (response) =>
          new Promise((resolve) => setTimeout(() => resolve(response), 2000))
      )
      .then((response) => {
        setUsersList(response.data.users);
      })
      .catch((err) => {
        
        setUsersList([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    fetchUsers();
  }, [filter]);
  return (
    <>
      <h1 className="font-semibold font-opensans text-2xl my-6">Users</h1>
      <InputField
        name="user"
        placeholder="Search Users"
        type="text"
        handler={(e) => setFilter(e.target.value)}
      />
      <div className="mt-8">
        {usersList.length > 0 ? (
          usersList.map((user, index) => {
            return (
              <UserDetails
                firstName={user.firstName}
                lastName={user.lastName}
                key={index}
              />
            );
          })
        ) : isLoading ? (
          <LoadingUsers />
        ) : (
          <h1>Users could not be fetched</h1>
        )}
      </div>
    </>
  );
};
export default Users;
