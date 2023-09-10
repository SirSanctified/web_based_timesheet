/* eslint-disable react/prop-types */
const Select = ({
  name,
  value,
  handleChange,
  optionsArray,
  error,
  defaultOption,
  label,
}) => (
  <>
    <label htmlFor={name} className="text-[18px] mb-1">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={handleChange}
      id={name}
      className="mb-1 px-2 py-2 border border-gray-500 rounded-sm"
    >
      <option value="" className="px-2 py-2 border border-gray-500">
        {defaultOption}
      </option>
      {optionsArray &&
        !error &&
        Array.from(optionsArray)?.map((option) => (
          <option
            key={option.id}
            value={option.id}
            className="px-2 py-2 border border-gray-500"
          >
            {option.date
              ? `On ${option.date} for ${option.hours} hours`
              : option.taskName
              ? option.taskName
              : option.projectName
              ? option.projectName
              : `${option.firstName} ${option.lastName}`}
          </option>
        ))}
    </select>
  </>
);

export default Select;
