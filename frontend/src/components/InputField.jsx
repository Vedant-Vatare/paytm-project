import { useState } from "react";
import { memo } from "react";

const InputField = memo(
  ({ name, label, placeholder, type, isRequired, handler }) => {
    return (
      <>
        <div className="dark:text-primary-white-text w-full flex flex-col gap-1 my-3">
          <div className="text-left font-medium text-lg flex gap-0.5">
            {label}
            {isRequired && <div className="font-semibold text-red-500">*</div>}
          </div>
          <div className="relative flex w-full">
            <input
              className="dark:bg-primary-black-100 outline outline-primary-black-100 group rounded-md  w-full p-4 relative focus:outline-none  focus:ring-2 focus:ring-blue-600"
              type={type}
              name={name}
              maxLength={
                name == "firstName" || name == "lastName" ? 50 : undefined
              }
              onInput={handler}
              placeholder={placeholder}
              required={isRequired}
            />
          </div>
        </div>
      </>
    );
  }
);
export default InputField;
