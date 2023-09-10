/* eslint-disable react/prop-types */
const SelectStatus = ({
  name,
  value,
  handlechange,
  optionValues,
  label,
  error,
}) => (
  <>
    <label htmlFor="projectStatus" className="text-[18px] mb-1">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={handlechange}
      className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
    >
      {optionValues &&
        optionValues.map((val) => (
          <option key={val} value={val.toLowerCase()}>
            {val}
          </option>
        ))}
    </select>
    {error && <span className="text-red-500">{error}</span>}
  </>
);
export default SelectStatus;
