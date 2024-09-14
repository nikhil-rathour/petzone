import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", icon, accept, disabled, required, placeholder, ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-1 pl-1 text-gray-700"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`${className} ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
          type={type}
          ref={ref}
          id={id}
          accept={accept}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
  );
});

export default Input;
