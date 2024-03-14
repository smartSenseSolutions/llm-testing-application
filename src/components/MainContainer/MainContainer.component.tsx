import { NavLink, Outlet } from 'react-router-dom';
import { AppDrawer } from '@patent-app/stories';
import { ROUTE } from '@patent-app/utils/constants/route.constant';
import Icons from '@patent-app/icons';

const sideNavigationItems = [
    {
        to: ROUTE.DRAFT_PATENTS,
        label: 'Draft Patents',
        icon: Icons.DraftPatent,
        external: true,
    },
    {
        to: ROUTE.PROMPT_LIBRARY,
        label: 'Prompt Library',
        icon: Icons.PromptLibrary,
        external: false,
    },
];

const MainContainer = () => {
    const sideNavItem = sideNavigationItems.map((navigationItem, index) => {
        return (
            <li className="navItem" key={index}>
                <NavLink
                    to={navigationItem.to || ''}
                    className={({ isActive }) =>
                        isActive
                            ? 'navLink active flex gap-[1rem] items-center'
                            : 'navLink flex gap-[1rem] items-center'
                    }
                >
                    <navigationItem.icon />
                    {navigationItem.label}
                </NavLink>
            </li>
        );
    });

    return (
        <div className="flex">
            <AppDrawer drawerItem={sideNavItem} />
            <div className="w-[calc(100vw-28rem)]">
                <div className="h-[6.4rem] bg-desertStorm w-[100%] border-b-[1px] border-platinum flex justify-between items-center pr-[3rem] pl-[3rem]">
                    <h2 className="text-secondary font-[600] text-[1.8rem]">LLM Testing Application</h2>
                    <div className="text-right">
                        <div>designed by smartSense Consulting Solutions</div>
                        <div>
                            <small>For Demo Purpose </small>
                        </div>
                    </div>
                </div>
                <div className="h-[calc(100vh-6.5rem)] overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export { MainContainer };
