import { memo } from "react";

function formatText(text="User") {
  return text.split(" ").map(text => text.charAt(0).toUpperCase());

}
const getRandomProfileColor = ()=> {
  const colors = ["#5865F2","#ED4245","#EB459F","#3BA55C","#FAA61A","#6F1AF1", "#003049", "#fb8500", "#00b4d8", "#2b2d42"]
  return colors[parseInt(Math.random() * colors.length)]
}
const ProfilePicture = memo(( {text} ) => {
  return (
    <div 
      style={{backgroundColor: getRandomProfileColor()}}
      className=" h-12 w-12 max-h-full rounded-full grid place-items-center font-semibold">
      {formatText(text)}
    </div>
  )
})

export default ProfilePicture;