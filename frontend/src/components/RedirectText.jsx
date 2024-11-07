import { Link } from "react-router-dom";
function RedirectText({text, buttonText, to}) {
  return (
    <>
      <div className="flex ">
        <span>{text}</span>
        <Link to={to}>{buttonText}</Link>
      </div>
    </>
  )
}

export default RedirectText;