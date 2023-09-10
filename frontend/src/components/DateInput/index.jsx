/* eslint-disable react/prop-types */
const DateInput = ({ name, value, handleChange, error, label }) => (
  <>
    <label htmlFor={name} className="text-[18px] mb-1">
      {label}
    </label>
    <input
      type="date"
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
    />
    {error && <span className="text-red-500">{error}</span>}
  </>
);

export default DateInput;
