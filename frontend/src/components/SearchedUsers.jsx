import { memo, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import ProfilePicture from "../components/ui/ProfilePicture";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
import axios from "axios";
import useRedirectToProfile from "../hooks/useRedirectToProfile"


const SearchedUsers = memo(({ filter }) => {
  const [usersList, setUsersList] = useState([]);
  const debouncedFilter = useDebounce(filter, 250);
  const redirectUser = useRedirectToProfile()

  async function getSearchedUsers() {
    if (debouncedFilter === "") return;
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/user/bulk?filter=${debouncedFilter}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsersList(response.data.users);
    } catch (e) {
      console.log("Error:", e);
      setUsersList(null);
    }
  }

  useEffect(() => {
    getSearchedUsers();
  }, [debouncedFilter]);

  return (
    <>
      {!usersList && (
        <div>
          User Does not exists
        </div>
      )}
      <ul className="my-3">
        {usersList &&
          usersList.map(({ _id, firstName, lastName }) => {
            return (
              <li
                onClick={()=>{
                  redirectUser({userId: _id})
                }}
                className="flex gap-6 items-center p-2 px-5 hover:bg-primary-dark-800"
                key={_id}
              >
                <div>
                  <ProfilePicture text={`${firstName} ${lastName}`} />
                </div>
                <div className="font-semibold">
                  {firstName} {lastName}
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
});

export default SearchedUsers;
