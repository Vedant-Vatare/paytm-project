import { useState } from "react";
import { memo } from "react";

const InputField = memo(
  ({ name, label, placeholder, type, isRequired, handler }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
    };
    return (
      <>
        <div className="w-full flex flex-col gap-1 my-3">
          <div className="text-left font-medium text-lg">{label}</div>
          <div className="relative w-full flex ">
            {type === "password" ? (
              <>
                <input
                  className="rounded-sm outline outline-1 w-full p-2 px-4 relative focus:outline-none focus:ring-2 focus:ring-blue-600"
                  type={isPasswordVisible ? "text" : "password"}
                  name={name}
                  minLength={8}
                  onInput={handler}
                  placeholder={placeholder}
                  required={true}
                />
                <button
                  onClick={(e)=> {
                    e.preventDefault();
                    togglePasswordVisibility();
                  }}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 text-blue-600 font-bold border-none">
                  {isPasswordVisible ? "Hide" : "Show"}
                </button>
              </>
            ) : (
              <input
                className="invalid:border-red-500 rounded-sm outline outline-1 w-full p-2 px-4 relative focus:outline-none focus:ring-2 focus:ring-blue-600"
                type={type}
                name={name}
                maxLength={name == "firstName" || name=="lastName" ? 50 : null}
                onInput={handler}
                placeholder={placeholder}
                required={isRequired}
              />
            )}
          </div>
        </div>
      </>
    );
  }
);
export default InputField;
