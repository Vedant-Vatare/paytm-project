import { memo,  } from "react";
import { useNavigate } from "react-router-dom"
import ProfilePicture from "./ProfilePicture";


const UserDetails = memo(({firstName, lastName, userId}) => {
  const navigate = useNavigate()
  const redirectTopaymentGateway = () => { 
    navigate(`/send?id=${userId}`) 
  }

  return (
    <>
      <div className="w-full flex justify-between items-center my-6 lg:p-4 p-2 hover:shadow-xl outline-1  outline-offset-8 rounded-sm">
        <div className="flex gap-4 items-center">
          <ProfilePicture text={`${firstName} ${lastName}`}/>
          <div>{`${firstName} ${lastName}`}</div>
        </div>
        <div>
          <button 
          onClick={redirectTopaymentGateway}
          className="font-Inter font-bold text-base px-6 py-3 
      bg-primary-black-100 hover:bg-gray-800 transition-colors text-primary-white-text rounded-md tracking-wide">
            Send Money
          </button>
        </div>
      </div>
    </>
  );
});

export default UserDetails;
