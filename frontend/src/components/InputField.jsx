import { useState } from "react";
import { memo } from "react";

const InputField = memo(
  ({ name, label, placeholder, type, isRequired, handler }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Toggle visibility function
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
    return (
      <>
        <div className="w-full flex flex-col gap-1 my-3">
          <div className="text-left font-medium text-lg">{label}</div>
          <div className="relative w-full flex ">
            <input
              className="rounded-md outline outline-1 w-full p-2 px-4 relative"
              type={type === "password" && isPasswordVisible ? "text" : "password"}
              name={name}
              onInput={handler}
              placeholder={placeholder}
              required={isRequired}
            />
            {type === "password" && (
              <button
                onClick={togglePasswordVisibility}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-blue-600 font-bold"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
);
export default InputField;
