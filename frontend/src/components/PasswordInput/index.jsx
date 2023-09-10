/* eslint-disable react/prop-types */
const PasswordInput = ({
  name,
  label,
  value,
  handleChange,
  placeholder,
  error,
}) => (
  <>
    <label htmlFor={name} className="mt-2">
      {label}
    </label>
    <input
      type="password"
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="px-2 py-2 border border-gray-500 rounded-sm mb-1"
    />
    {error && <span className="text-red-500">{error}</span>}
  </>
);

export default PasswordInput;
