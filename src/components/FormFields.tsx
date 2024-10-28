import React from 'react';
import { TextField, Grid, MenuItem } from '@mui/material';
import { FieldConfig } from '../types';

// Text Field Component
export const TextInput = React.memo(
  ({ fieldConfig, fieldValue, onChange, error }: any) => {
    return (
      <TextField
        fullWidth
        label={fieldConfig.label}
        value={fieldValue}
        onChange={onChange}
        error={!!error}
        helperText={error || ''}
        required={fieldConfig.required || false}
        placeholder={fieldConfig.placeholder || 'Enter value'}
      />
    );
  }
);

// Integer Field Component
export const IntegerInput = React.memo(
  ({ fieldConfig, fieldValue, onChange, error }: any) => {
    return (
      <TextField
        fullWidth
        type="number"
        label={fieldConfig.label}
        inputProps={{ min: fieldConfig.min, max: fieldConfig.max }}
        value={fieldValue}
        onChange={onChange}
        error={!!error}
        helperText={error || ''}
        required={fieldConfig.required || false}
        placeholder={fieldConfig.placeholder || 'Enter value'}
      />
    );
  }
);

// Enum Field Component
export const EnumInput = React.memo(
  ({ fieldConfig, fieldValue, onChange, error }: any) => {
    return (
      <TextField
        select
        fullWidth
        label={fieldConfig.label}
        value={fieldValue}
        onChange={onChange}
        error={!!error}
        helperText={error || ''}
        required={fieldConfig.required || false}
      >
        {fieldConfig.values?.map((option: string) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    );
  }
);

// Currency Field Component
export const CurrencyInput = React.memo(
  ({ fieldConfig, currency, amount, onChange, error }: any) => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            label="Currency"
            value={currency}
            onChange={onChange(`${fieldConfig.path}.currency`)}
            error={!!error}
            helperText={error || ''}
            required={fieldConfig.required || false}
            placeholder="Select currency"
          >
            {fieldConfig.currencies?.map((cur: string) => (
              <MenuItem key={cur} value={cur}>
                {cur}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            inputProps={{ min: fieldConfig.min, max: fieldConfig.max }}
            value={amount}
            onChange={onChange(`${fieldConfig.path}.value`)}
            error={!!error}
            helperText={error || ''}
            required={fieldConfig.required || false}
            placeholder="Enter amount"
          />
        </Grid>
      </Grid>
    );
  }
);
