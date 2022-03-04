import { useState, useCallback, ChangeEvent, FC } from "react";

interface IFormValues {
  [key: string]: string;
}

interface IFormErrors {
  [key: string]: string;
}

export default function useFormAndValidation(defaultValues: IFormValues = {}) {

  const [values, setValues] = useState<IFormValues>({});
  const [errors, setErrors] = useState<IFormErrors>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string | boolean =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name: string = e.target.name;
    setIsValid((e.target.closest("form") as HTMLFormElement).checkValidity());
    // @ts-ignore
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
};
