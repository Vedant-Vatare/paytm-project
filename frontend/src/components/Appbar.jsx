import { useState } from "react"
import ProfilePicture from "./ProfilePicture"
import UserDropDownSettings from "./UserDropDownSettings"
const Appbar = ({userFullname})=> {
  const [showDropDown, setShowDropDown] = useState(false)
  const toggleDropDown = ()=> {
    setShowDropDown(currentValue => !currentValue)
  }
  return (
    <>
    <div className="flex  items-center justify-between border-b-2 w-full p-2 px-12">
      <h1 className="font-Inter  font-semibold text-2xl">PayTM App</h1>
      <div className="flex items-center gap-4">
        <div onClick={toggleDropDown} className="relative cursor-pointer select-none">
          <ProfilePicture text={userFullname}/>
          {showDropDown && <UserDropDownSettings/>}
        </div>
      </div>
    </div>
    </>
  )
}

export default Appbar
