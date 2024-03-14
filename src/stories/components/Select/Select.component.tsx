import { FormControl, SelectProps as MuiSelectProps } from '@mui/material';
import { Item } from '@patent-app/types/Common.type';
import { isEmptyValue } from '@patent-app/utils/helpers/common.helper';
import { InputLabelStyle, MenuItemStyle, SelectStyle } from './Select.styled';

type SelectProps = MuiSelectProps & {
    options: Item[];
};

export const Select = ({ options, ...props }: SelectProps) => {
    return (
        <FormControl fullWidth>
            <InputLabelStyle id={`${props.id}-label`}>{props?.label}</InputLabelStyle>
            <SelectStyle {...props} labelId={`${props.id}-label`}>
                {!isEmptyValue(options) ? (
                    options.map((option) => {
                        return (
                            <MenuItemStyle key={option.value} value={option.value}>
                                {option.label}
                            </MenuItemStyle>
                        );
                    })
                ) : (
                    <></>
                )}
            </SelectStyle>
        </FormControl>
    );
};
