import { useState } from "react";
import { memo } from "react";

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
              className="bg-primary-black-100 group rounded-md  w-full p-4 relative focus:outline-none border-none focus:ring-2 focus:ring-blue-600"
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
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-blue-600 font-bold border-none"
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </button>
          </>
        </div>
      </div>
    </>
  );
});

export default InputFieldWithToggle;
