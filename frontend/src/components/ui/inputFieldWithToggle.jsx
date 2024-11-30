import { useState } from "react";
import { memo } from "react";
import EyesOpened from "../../icons/EyesOpen.jsx"
import EyesClosed from "../../icons/EyesClosed.jsx"
const InputFieldWithToggle = memo(({ label, placeholder, handler }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
  };
  return (
    <>
      <div className="dark:text-primary-white-text  w-full flex flex-col gap-1 my-3">
        <div className="text-left font-medium text-lg flex gap-0.5">
          {label}
          <div className="font-semibold text-red-500">*</div>
        </div>
        <div className="relative w-full flex ">
          <>
            <input
              className="dark:bg-primary-black-100 outline outline-primary-black-100 rounded-md  w-full p-2 px-3 md:p-3 relative focus:outline-none  focus:ring-2 focus:ring-blue-600"
              type={isPasswordVisible ? "text" : "password"}
              name={"password"}
              minLength={8}
              onInput={handler}
              placeholder={placeholder}
              required={true}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                togglePasswordVisibility();
              }}
              className="absolute right-4 top-1/2 p-2 transform -translate-y-1/2 text-primary-brand-color font-bold border-none bg-primary-"
            >
              {isPasswordVisible ? <EyesClosed/> : <EyesOpened/>}
            </button>
          </>
        </div>
      </div>
    </>
  );
});

export default InputFieldWithToggle;
