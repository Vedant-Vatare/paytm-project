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
    <div className="dark:text-primary-white-text dark:bg-primary-black-100 flex items-center justify-between w-[80vw] p-2 px-10 m-auto rounded-[5rem] relative top-4 ">
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
