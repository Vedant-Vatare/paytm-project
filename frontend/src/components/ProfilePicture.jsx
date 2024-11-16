import { memo } from "react";

function formatText({ text="User" }) {
  return text.split(" ").map(text => text.charAt(0).toUpperCase());

}

const ProfilePicture = memo(( text ) => {
  return (
    <div className="h-14 w-14 rounded-full bg-gray-200 grid place-items-center font-semibold ">
      {formatText(text)}
    </div>
  )
})

export default ProfilePicture;