/* eslint-disable react/prop-types */
const Description = ({
  name,
  label,
  value,
  handleChange,
  placeholder,
  error,
}) => (
  <>
    <label htmlFor={name} className="text-[18px] mb-1">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
    />
    {error && <span className="text-red-500">{error}</span>}
  </>
);

export default Description;
