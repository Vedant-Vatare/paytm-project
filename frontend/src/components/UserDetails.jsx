import { memo } from "react";
import ProfilePicture from "./ProfilePicture";

const UserDetails = memo(({firstName, lastName}) => {
  return (
    <>
      <div className="w-full flex justify-between items-center my-4 p-1 hover:outline outline-1  outline-offset-8 rounded-sm">
        <div className="flex gap-4 items-center">
          <ProfilePicture text={`${firstName} ${lastName}`}/>
          <div>{`${firstName} ${lastName}`}</div>
        </div>
        <div>
          <button className="font-Inter font-bold px-3 text-base py-2 
      bg-black hover:bg-gray-800 transition-colors text-white rounded-md tracking-wide">
            Send Money
          </button>
        </div>
      </div>
    </>
  );
});

export default UserDetails;
