import { assocPath, path } from 'ramda';
import { MyObject, FormConfiguration } from './types';
import objectJson from './object.json';
import { FieldConfig } from './types';

// Function to safely set a deep value in an object
export const setDeep = (obj: MyObject, path: string, value: any): MyObject => {
  return assocPath(path.split('.'), value, obj) as MyObject;
};

// Function to safely retrieve a deep value from an object
export const getDeep = (obj: MyObject, pathStr: string) => {
  return path(pathStr.split('.'), obj);
};

export const getData = () => {
  return objectJson as MyObject;
};

export const initializeEmptyObject = (configuration: FormConfiguration) => {
  const emptyObject: MyObject = {};

  configuration.forEach((fieldConfig) => {
    if (fieldConfig.type === 'currencyInput') {
      setDeep(emptyObject, fieldConfig.path, { currency: 'EUR', value: 0 });
    } else {
      setDeep(emptyObject, fieldConfig.path, '');
    }
  });

  return emptyObject;
};
