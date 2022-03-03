import { useState, useCallback, ChangeEvent } from "react";

interface Values {
  [x: string]: string | number | boolean;
}

export default function useFormAndValidation(): {
  setIsValid: (value: ((prevState: boolean) => boolean) | boolean) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValues: (value: ((prevState: {}) => {}) | {}) => void;
  values: {};
  isValid: boolean;
  resetForm: (newValues?: {}, newErrors?: {}, newIsValid?: boolean) => void;
  errors: {};
} {
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string | boolean =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name: string = e.target.name;
    const parentContainer: HTMLFormElement | null = (
      e.target as HTMLElement
    ).closest("form");

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    // @ts-ignore
    setIsValid(parentContainer.checkValidity());
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
}
