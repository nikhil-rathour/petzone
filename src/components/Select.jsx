import React, { forwardRef } from 'react';

const Select = forwardRef(({ options, label, className, ...props }, ref) => {
  return (
    <div className={className}>
      {label && <label className="block text-gray-700 font-medium mb-2">{label}</label>}
      <select ref={ref} {...props}
     
       className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
