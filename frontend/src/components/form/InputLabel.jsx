export default function InputLabel({
  value,
  required = false,
  className = '',
  children,
  ...props
}) {
  return (
    <label
      {...props}
      className={`block text-sm font-medium text-gray-700 mb-1.5 ${className}`}
    >
      {value || children}

      {required && (
        <span className="text-red-500 ml-1">*</span>
      )}
    </label>
  );
}