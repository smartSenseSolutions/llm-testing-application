import { StyledContainer, StyledList, StyledHeader } from './AppDrawer.styled';
import Logo from '../../../../public/assets/images/logo.svg';

interface AppDrawerProps {
    drawerItem: React.ReactNode;
}
const AppDrawer = ({ drawerItem }: AppDrawerProps) => {
    return (
        <StyledContainer>
            <StyledList>
                <div className="flex flex-col justify-between h-[calc(100vh-0.5rem)]">
                    <div>
                        <StyledHeader>
                            <img src={Logo} />
                        </StyledHeader>
                        <div>{drawerItem}</div>
                    </div>

                    <div className="p-[2rem] text-[1.2rem]">
                        <p className="pb-[0.5rem]">
                            <b>Disclaimer:</b>
                        </p>
                        <p className="pb-[1rem]">
                            <b className="font-[500]">1. GPT 4 Model:</b> Do not use confidential data for testing with
                            GPT-4 as the data for that remains with GPT{' '}
                        </p>
                        <p className="pb-[1rem]">
                            {' '}
                            <b className="font-[500]">2. Llama 2 Model:</b> You can deploy this model on your network
                        </p>
                        <p className="pb-[1rem]">
                            <b className="font-[500]">3. Mixtral:</b> You can deploy this model on your network
                        </p>
                        <p className="pb-[1rem]">
                            <b className="font-[500]">4.</b> Only UI and Frontend is prepared by smartSense Solutions
                            for demo purpose. smartSense Solutions does not process any kind of data in the backend.
                        </p>
                    </div>
                </div>
            </StyledList>
        </StyledContainer>
    );
};

export { AppDrawer };
export type { AppDrawerProps };
