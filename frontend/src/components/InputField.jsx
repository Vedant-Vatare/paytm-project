import { memo } from "react";

const InputField = memo(({name, label, placeholder, type, isRequired, handler}) => {
  return (
    <>
      <div className="w-full flex flex-col gap-1 my-3">
        <div className="text-left font-medium text-lg">
          {label}
        </div>
        <input className="rounded-md outline outline-1 w-full p-2 px-4"
        type={type}
        name={name}
        onInput={handler}
        placeholder={placeholder} required={isRequired}/>
      </div>
    </>
  )
})
export default InputField;