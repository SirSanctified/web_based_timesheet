/* eslint-disable react/prop-types */
const TextInput = ({
  name,
  label,
  value,
  handleChange,
  error,
  placeholder,
}) => (
  <>
    <label htmlFor={name} className="text-[18px] mb-1">
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
    />
    {error && <span className="text-red-500">{error}</span>}
  </>
);

export default TextInput;
