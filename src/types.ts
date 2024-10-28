type ObjectAttributte = Record<string, unknown>;

// Define a type for MyObject, which is an object containing multiple attributes
export type MyObject = Record<string, ObjectAttributte>;

// Define the possible types of form fields
export type FieldType =
  | 'textInput'
  | 'integerInput'
  | 'enumInput'
  | 'currencyInput';

// Define the base interface for all form field configurations
// All field configurations will extend this base configuration
export interface BaseFieldConfig {
  type: FieldType;
  label: string;
  path: string;
  required?: boolean;
  currency?: string;
  value?: number;
}

// Interface for text input field configuration, extending the base configuration
export interface TextInputConfig extends BaseFieldConfig {
  type: 'textInput';
  defaultValue?: string;
  placeholder?: string;
}

// Interface for integer input field configuration, extending the base configuration
export interface IntegerInputConfig extends BaseFieldConfig {
  type: 'integerInput';
  min?: number;
  max?: number;
  defaultValue?: number;
  placeholder?: string;
}

// Interface for enum input (dropdown) field configuration, extending the base configuration
export interface EnumInputConfig extends BaseFieldConfig {
  type: 'enumInput';
  values: string[];
  defaultValue?: string;
  placeholder?: string;
}

// Interface for currency input field configuration, extending the base configuration
export interface CurrencyInputConfig extends BaseFieldConfig {
  type: 'currencyInput';
  min?: number;
  max?: number;
  currencies: string[];
  defaultValue?: {
    currency: string;
    value: number;
  };
  placeholder?: string;
}

// A union type that can be any one of the specific field configuration interfaces
export type FieldConfig =
  | TextInputConfig
  | IntegerInputConfig
  | EnumInputConfig
  | CurrencyInputConfig;

// Define the configuration type for the form, which is an array of FieldConfig objects
export type FormConfiguration = FieldConfig[];
