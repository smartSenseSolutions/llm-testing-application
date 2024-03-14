import Icons from '@patent-app/icons';
import { StyledSearchInput, TextFieldProps } from './SearchInput.styled';

interface CustomSearchTextFieldProp {
    onClearClick: () => void;
}

const SearchInput = ({ onClearClick, ...props }: TextFieldProps & CustomSearchTextFieldProp) => {
    return (
        <StyledSearchInput
            variant="outlined"
            margin="dense"
            placeholder="Search data"
            fullWidth
            size="small"
            InputProps={{
                startAdornment: <Icons.Search />,
                ...((props?.value as string).length > 0 && {
                    endAdornment: (
                        <button className="clear-icon" onClick={onClearClick}>
                            <Icons.Cross />
                        </button>
                    ),
                }),
            }}
            {...props}
        />
    );
};

export { SearchInput };
