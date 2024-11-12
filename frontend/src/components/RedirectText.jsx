import { Link } from "react-router-dom";
import {memo} from "react";
const  RedirectText = memo(({label, buttonText, to}) => {
  return (
    <>
      <div className="flex gap-1">
        <span>{label}</span>
        <Link className="underline underline-offset-3" to={to}>{buttonText}</Link>
      </div>
    </>
  )
})

export default RedirectText;