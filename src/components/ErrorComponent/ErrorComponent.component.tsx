import { Button } from '@patent-app/stories';

export const ErrorComponent = () => {
    const onRefreshHandler = () => {
        location.reload();
    };
    return (
        <div className="w-[100%] h-[100vh] flex items-center flex-col justify-center gap-[3rem]">
            <p className={`text-[3rem] leading-[1.2] relative top-[-0.9rem] text-center`}>
                Oops, <br />
                Something went wrong, please try again
            </p>

            <div className="text-center">
                <Button onClick={onRefreshHandler} variant="contained" color="primary" type="submit">
                    Refresh
                </Button>
            </div>
        </div>
    );
};
