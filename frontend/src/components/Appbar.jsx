import ProfilePicture from "./ProfilePicture"
const Appbar = ({userFullname})=> {
  return (
    <>
    <div className="flex  items-center justify-between border-b-2 w-full p-2 px-12">
      <h1 className="font-Inter  font-semibold text-2xl">PayTM App</h1>
      <div className="flex items-center gap-4">
        Hello
        <ProfilePicture text={userFullname}/>
      </div>
    </div>
    </>
  )
}

export default Appbar
