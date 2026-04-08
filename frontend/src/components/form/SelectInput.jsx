import React from 'react';

export default function SelectInput({ name, value, onChange, className = '', children, ...rest }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`px-3 py-2.5 text-sm border rounded-lg outline-none transition-colors ${className}`}
      {...rest}
    >
      {children}
    </select>
  );
}