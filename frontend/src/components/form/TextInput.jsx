import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

const TextInput = forwardRef(function TextInput(
  {
    type = 'text',
    className = '',
    isFocused = false,
    ...props
  },
  ref
) {
  const localRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <input
      {...props}
      type={type}
      ref={localRef}
      className={`w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg outline-none transition-colors
      focus:border-blue-500 focus:ring-1 focus:ring-blue-500
      ${className}`}
    />
  );
});

export default TextInput;