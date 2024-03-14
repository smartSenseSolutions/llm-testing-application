import { useRef } from 'react';
import { isEqual } from 'lodash';

export const useRefEquality = <T,>(value: T) => {
    const ref = useRef<T | undefined>(undefined);

    if (!isEqual(ref.current, value)) {
        ref.current = value;
    }

    return ref.current;
};
