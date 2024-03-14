import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import { ROUTE } from '@patent-app/utils/constants/route.constant';
import { ErrorComponent, MainContainer } from '@patent-app/components';
import { PageNotFound, DraftPatents, PromptLibrary } from '@patent-app/pages';

const errorElement = {
    errorElement: <ErrorComponent />,
};

const ROUTES: RouteObject[] = [
    {
        path: ROUTE.ROOT,
        element: <MainContainer />,
        ...errorElement,
        children: [
            {
                index: true,
                element: <Navigate to={ROUTE.DRAFT_PATENTS} />,
                ...errorElement,
            },
            {
                path: ROUTE.DRAFT_PATENTS,
                element: <DraftPatents />,
                ...errorElement,
            },
            {
                path: ROUTE.PROMPT_LIBRARY,
                element: <PromptLibrary />,
                ...errorElement,
            },
        ],
    },
    {
        path: ROUTE.WILDCARD,
        element: <PageNotFound />,
    },
];

export const routes = createBrowserRouter(ROUTES);
