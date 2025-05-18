import React from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { Fragment } from "react";

type Option = {
  value: string;
  label: string;
};

type SelectInputSectionProps = {
  label: string;
  options: Option[];
  selectedOptions: Option[];
  onChange: (value: Option[]) => void;
  isMulti?: boolean;
};

const SelectInputSection: React.FC<SelectInputSectionProps> = ({
  label,
  options,
  selectedOptions,
  onChange,
  isMulti = true,
}) => {
  return (
    <div className="mt-5">
      <Listbox value={selectedOptions} onChange={onChange} multiple={isMulti}>
        <div className="relative">
          <Listbox.Label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </Listbox.Label>
          <ListboxButton className="relative w-full cursor-pointer bg-white py-2 pr-3 pl-10 text-right border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 sm:text-sm">
            <span className="block truncate">
              {selectedOptions.length > 0
                ? selectedOptions.map(option => option.label).join(", ")
                : "اختر..."}
            </span>
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              {/* <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              /> */}
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-purple-100 text-purple-900" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {option.label}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>

      {selectedOptions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedOptions.map((option) => (
            <span
              key={option.value}
              className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm"
            >
              {option.label}
              <button
                type="button"
                onClick={() => {
                  onChange(selectedOptions.filter((item) => item.value !== option.value));
                }}
                className="mr-1 text-purple-600 hover:text-purple-900 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectInputSection;