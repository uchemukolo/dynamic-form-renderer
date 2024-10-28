import React, { useState, useCallback } from "react";
import { Button, Grid, Typography, Paper } from "@mui/material";
import { setDeep, getDeep } from "../utils";
import { MyObject, FormConfiguration, FieldConfig } from "../types";
import {
  TextInput,
  IntegerInput,
  EnumInput,
  CurrencyInput,
} from "./FormFields";
import "./StaticForm.css";

type StaticFormProps = {
  object: MyObject;
  configuration: FormConfiguration;
};

// StaticForm component that renders a dynamic form based on a configuration
const StaticForm = ({
  object,
  configuration,
}: StaticFormProps): JSX.Element => {
  const [myObject, setMyObject] = useState<MyObject>(object);
  const [savedObject, setSavedObject] = useState<MyObject | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Function to validate each field
  const validateField = (fieldConfig: FieldConfig, value: any): boolean => {
    let isValid = true;

    // Check if the field is required and if it's empty
    if (
      fieldConfig?.required &&
      (value === "" || value === null || value === undefined)
    ) {
      isValid = false;
      setErrors((prev) => ({
        ...prev,
        [fieldConfig.path]: "This field is required",
      }));
    } else {
      // Reset error for this field if valid
      setErrors((prev) => ({
        ...prev,
        [fieldConfig?.path]: "",
      }));
    }

    // Handle validation for numeric fields (integerInput or currencyInput)
    if (
      fieldConfig?.type === "integerInput" ||
      fieldConfig?.type === "currencyInput"
    ) {
      if (fieldConfig?.type === "currencyInput" && typeof value === "object") {
        const amount = value?.value;
        // Min value validation for currencyInput
        if (fieldConfig.min !== undefined && amount < fieldConfig.min) {
          isValid = false;
          setErrors((prev) => ({
            ...prev,
            [fieldConfig.path]: `Value cannot be less than ${fieldConfig.min}`,
          }));
        }
        // Max value validation for currencyInput
        else if (fieldConfig.max !== undefined && amount > fieldConfig.max) {
          isValid = false;
          setErrors((prev) => ({
            ...prev,
            [fieldConfig.path]: `Value cannot be more than ${fieldConfig.max}`,
          }));
        }
      }
      // Min value validation for integerInput
      else if (fieldConfig.min !== undefined && value < fieldConfig.min) {
        isValid = false;
        setErrors((prev) => ({
          ...prev,
          [fieldConfig.path]: `Value cannot be less than ${fieldConfig.min}`,
        }));
      }
      // Max value validation for integerInput
      else if (fieldConfig.max !== undefined && value > fieldConfig.max) {
        isValid = false;
        setErrors((prev) => ({
          ...prev,
          [fieldConfig.path]: `Value cannot be more than ${fieldConfig.max}`,
        }));
      }
    }

    return isValid;
  };

  // Handle field change events dynamically
  const onChange = useCallback(
    (path: string, fieldConfig: FieldConfig) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const updatedObject = setDeep(myObject, path, newValue);
        setMyObject(updatedObject);
        validateField(fieldConfig, newValue);
      },
    [myObject]
  );

  // Function to handle form submission
  const handleSubmit = () => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    // Validate all fields in the form configuration
    configuration.forEach((fieldConfig) => {
      const fieldValue = getDeep(myObject, fieldConfig.path) as
        | { currency: string; value: number }
        | undefined;
      const validField = validateField(fieldConfig, fieldValue);
      if (!validField) {
        isValid = false;
        newErrors[fieldConfig.path] = errors[fieldConfig.path];
      }
    });

    // If the form is valid, save the object
    if (isValid) {
      setSavedObject(myObject);
    }
  };

  return (
    <Grid container spacing={2} className="form-container">
      <Grid item xs={12} md={8}>
        <Paper elevation={3} className="form-paper">
          <Typography variant="h6" gutterBottom>
            Dynamic Form
          </Typography>
          <Grid container spacing={2}>
            {configuration.map((fieldConfig) => {
              const fieldValue = getDeep(myObject, fieldConfig.path) as
                | { currency: string; value: number }
                | undefined;
              const error = errors[fieldConfig.path] || "";

              switch (fieldConfig.type) {
                case "textInput":
                  return (
                    <Grid item xs={12} key={fieldConfig.path}>
                      <TextInput
                        fieldConfig={fieldConfig}
                        fieldValue={fieldValue}
                        onChange={onChange(fieldConfig.path, fieldConfig)}
                        error={error}
                      />
                    </Grid>
                  );
                case "integerInput":
                  return (
                    <Grid item xs={12} key={fieldConfig.path}>
                      <IntegerInput
                        fieldConfig={fieldConfig}
                        fieldValue={fieldValue}
                        onChange={onChange(fieldConfig.path, fieldConfig)}
                        error={error}
                      />
                    </Grid>
                  );
                case "enumInput":
                  return (
                    <Grid item xs={12} key={fieldConfig.path}>
                      <EnumInput
                        fieldConfig={fieldConfig}
                        fieldValue={fieldValue}
                        onChange={onChange(fieldConfig.path, fieldConfig)}
                        error={error}
                      />
                    </Grid>
                  );
                case "currencyInput":
                  const { currency = "", value = 0 } = fieldValue || {};
                  return (
                    <Grid item xs={12} key={fieldConfig.path}>
                      <CurrencyInput
                        fieldConfig={fieldConfig}
                        currency={currency}
                        amount={value}
                        onChange={onChange}
                        error={error}
                      />
                    </Grid>
                  );
                default:
                  return null;
              }
            })}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="submit-button"
          >
            Save Changes
          </Button>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper className="result-paper">
          <Typography variant="h5">Result</Typography>
          <pre>{JSON.stringify(savedObject, null, 2)}</pre>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StaticForm;
