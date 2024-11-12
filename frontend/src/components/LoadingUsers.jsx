import { memo } from "react";

const LoadingUsers = memo(()=> {
  console.log("loading users.")
  return (
    <>
      <p>Lorem, ipsum.</p>
    </>
  )
})

export default LoadingUsers;