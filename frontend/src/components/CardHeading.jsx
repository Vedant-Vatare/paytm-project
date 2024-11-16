import { memo } from "react"

const CardHeading = memo(({ heading }) => {
  return (
    <h2 className="w-full py-4  text-center text-3xl font-bold font-poppins">
      {heading}
    </h2>
  )
})

export default CardHeading;