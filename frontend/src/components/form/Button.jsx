export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  ...props
}) {
  const baseStyles =
    'text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60';

  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white',

    secondary:
      'border border-gray-300 hover:bg-gray-50 text-gray-700',

    danger:
      'text-red-600 border-2 border-red-300 hover:bg-red-100 text-xs px-3 py-1.5 rounded-md transition-colors',

    edit:
      'text-blue-600 border-2 border-blue-300 hover:bg-blue-100 text-xs px-3 py-1.5 rounded-md transition-colors',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}