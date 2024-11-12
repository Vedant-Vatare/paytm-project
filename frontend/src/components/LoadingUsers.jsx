import { memo } from "react";

const LoadingUsers = memo(()=> {
  console.log("loading users.")
  return (
    <>
      <p>Loading users</p>
    </>
  )
})

export default LoadingUsers;