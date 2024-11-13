import { useEffect, useState } from "react";
import InputField from "./InputField";
import UserDetails from "./UserDetails";
import LoadingUsers from "./LoadingUsers";
import axios from "axios";

const Users = () => {
  const [filter, setFilter] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function debounce(callback, delay=1000) {
    let timeout;
    return (...args)=> {
      clearInterval(timeout)
      timeout = setTimeout(()=> callback(...args), delay);
    }
  }

  const debounceFilter = debounce(value => setFilter(value), 1000)
  
  function fetchUsers() {
    setIsLoading(true);
    console.log("sent req...")
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
        {console.log("calculating users state", isLoading)}
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
