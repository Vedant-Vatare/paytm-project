import { memo } from "react";
const  SectionText = memo(({ text }) => {
  return (
    <>
      <div className="dark:text-primary-white-text text-balance w-full text-center">{text}</div>
    </>
  )
})

export default SectionText;