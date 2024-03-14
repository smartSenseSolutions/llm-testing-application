import { Validation } from '@patent-app/types/Validation.type';
import { isEmptyValue } from './common.helper';

export const validation = (validations: Validation, value: unknown): string => {
    const { required, between, min, max, custom, regex } = validations;
    if (required && isEmptyValue(value)) {
        return required?.message;
    }
    if (
        between &&
        value &&
        (typeof value === 'string' || Array.isArray(value)) &&
        (value.length < between?.minLength || value?.length > between?.maxLength)
    ) {
        return between?.message;
    }
    if (min && value && (typeof value === 'string' || Array.isArray(value)) && value.length < min?.length) {
        return min?.message;
    }
    if (max && value && (typeof value === 'string' || Array.isArray(value)) && value.length > max?.length) {
        return max?.message;
    }
    if (regex && value && typeof value === 'string' && !regex.regexPattern.test(value)) {
        return regex?.message;
    }
    if (custom && value && custom?.condition) {
        return custom.message;
    }
    return '';
};

export const removeValidField = (fields: Record<string, string>) => {
    Object.keys(fields).map((key) => {
        if (!fields[key]) {
            delete fields[key];
        }
    });

    return fields;
};
