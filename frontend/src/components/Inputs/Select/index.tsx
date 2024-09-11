import Select from "react-select";
import { useField, useFormikContext } from "formik";
import { StylesConfig } from "react-select";

interface Option {
  value: string | number;
  label: string;
}

interface FormikReactSelectProps {
  isMulti?: boolean;
  name: string;
  label?: string;
  options: Option[];
  valueField?: string;
  labelField?: string;
  [key: string]: any;
}

export const FormikReactSelect = ({
  isMulti = false,
  name,
  label = "select",
  options,
  valueField,
  labelField,
  ...rest
}: FormikReactSelectProps) => {
  const { setFieldValue } = useFormikContext<any>();
  const [field] = useField(name);

  const handleChange = (selectedOption: any) => {
    setFieldValue(name, selectedOption);
  };

  const mappedOptions = options.map((option) => ({
    value: option[valueField as keyof Option],
    label: option[labelField as keyof Option],
  }));

  const customStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      zIndex: 9,
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9,
    }),
  };

  return (
    <Select
      styles={customStyles}
      classNamePrefix={label}
      isClearable
      isMulti={isMulti}
      {...field}
      {...rest}
      options={mappedOptions}
      onChange={handleChange}
      value={field.value}
    />
  );
};
