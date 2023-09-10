/* eslint-disable react/prop-types */
const CheckboxInput = ({ name, label, value, handleClick, error }) => (
  <>
    <label htmlFor={name} className="text-[18px] mb-1">
      {label}
    </label>
    <input
      type="checkbox"
      id={name}
      name={name}
      value={value}
      checked={value}
      onClick={handleClick}
      className="w-8 h-8 border border-gray-500 rounded-sm"
    />
    {error && <span className="text-red-500">{error}</span>}
  </>
);

export default CheckboxInput;
