import Select from "react-select";
import makeAnimated from "react-select/animated";
import { CategoryOption, DimensionOption } from "../types";

const animatedComponents = makeAnimated();

export type Option = CategoryOption | DimensionOption;

type FormSelectProps = {
  label: string;
  value: Option | Option[] | null;
  onChange: (value: Option | readonly Option[] | null) => void;
  options: CategoryOption[] | DimensionOption[];
  isMulti?: boolean;
  error?: string;
  required?: boolean;
  placeholder?: string;
  isSearchable?: boolean;
};

export const FormSelect = ({
  label,
  value,
  onChange,
  options,
  isMulti = false,
  error,
  required = false,
  placeholder = "اختر...",
  isSearchable = true,
}: FormSelectProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <Select
      components={animatedComponents}
      value={value}
      onChange={onChange}
      options={options}
      isMulti={isMulti}
      placeholder={placeholder}
      classNamePrefix="react-select"
      className={`react-select-container ${error ? "react-select-error" : ""}`}
      isSearchable={isSearchable}
      noOptionsMessage={() => "لا توجد خيارات متاحة"}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);
