import { memo } from "react"

const CardHeading = memo(({ heading }) => {
  return (
    <h2 className="dark:text-primary-white-text  w-full py-4 text-center text-2xl font-semibold font-poppins ">
      {heading}
    </h2>
  )
})

export default CardHeading;