# React Frontend Project - LLM Testing Application

## Used By

Write description about your project and it's use case.

## Project Setup

-   Clone the Project

-   Install dependencies
    ```
    yarn
    ```
-   Install husky in your project
    ```
    yarn prepare
    ```
-   Commands to run and build project
    #### To run project
    ```
    yarn dev
    ```
    #### To run storybook
    ```
    yarn storybook
    ```
    #### To prepare build
    ```
    yarn build:development
    ```
    #### To run build app
    ```
    yarn preview
    ```

## Variable & Function Naming Convention

| Object Name        | Notation     | Char Mask  | Underscores |
| ------------------ | ------------ | ---------- | ----------- |
| Function name      | camelCase    | [A-z][0-9] | No          |
| Function arguments | camelCase    | [A-z][0-9] | No          |
| Local variables    | camelCase    | [A-z][0-9] | No          |
| Constants name     | CAPITAL_CASE | [A-z][0-9] | Yes         |

**Note** : Here, constant means globally defined constant

## Import Orders

As we know, we are going to import multiple things in every file (page,component, etc.). We recommend to follow the below import order

-   Library imports
-   Storybook component import
-   Local imports (import pages, components)
-   Hooks & Context import
-   Model/type import
-   Util imports (util -> constants, helper, .validation.ts file)
-   Icon import
-   API import
-   Asset (image, video or any other media) import
-   Keep style imports last ( import from .styled.tsx file or import from .module.scss files)

## Code Structure

Follow below sequence inside React Component:

**Note**: Define JSX Elements and Variable outside Component if their value doesn't change.

-   Hooks and variables
    -   Hooks and variables other than useMemo, useCallback, useEffect
    -   useMemo, useCallback, useEffect
-   Api Calls
-   Event Handlers
-   Helpers
-   JSX Elements

## Style Order

Follow below order in writing css/scss/styled.tsx file

-   mixin or functions
-   variables
-   text
-   number

## Creating New Storybook Components

Create Folder inside stories/components with following files

-   **[ComponentName].component.tsx**:
    This contains component related code. Use functional components. Do a default export for that component

-   **[ComponentName].styled.tsx**:
    This will contains all the style related logic used with the mui style component

-   **[ComponentName].stories.tsx**:
    This will contains storybook related template to render that particular component.

-   **index.ts**:
    This file will import the component from [ComponentName].component.tsx and do the default export for that component.

**Note:** Please make sure that all the reusable components have stories integrated. Folder name must be in **PascalCase**

## Environment Variables

For adding any new environment variable follow below mentioned steps

-   Add that variable and value in .env file
-   Add that variable type in vite-env.d.ts file located inside src.
-   Use that variable using import.meta.env.[VITE_VARIABLE_NAME]

**Note**: Please add environment variable in Upper case separated by undersocre i.e VITE_BASE_URL=baseurl

## Folder Structure

Consider below folders inside src/ of your project

-   **apis**:
    It contains all the APIs we wanted to call in the form of a simple exported function so that we can reuse them

-   **components**:
    It contains all the components used in Application

-   **contexts**:
    It contains all the context used across the application. For adding any new context, follow the process of 'Adding new context'

-   **hooks**:
    It contains all the hooks used across the application. For adding new hook, follow the process of 'Adding new hook'

-   **icons**:
    It contains all the icon used across the application. For adding new icon, follow the process of 'Adding new icon'

-   **types**:
    It contains common type used across the application and also contain API response request type

-   **pages**:
    It contains all the page used across the application. For adding new page, follow the process of 'Adding new page'

-   **routes**:
    It contains all the routes of your application

-   **stories**:
    It contains storybook related files.

    -   **components**:
        It contains all the common components used across the application

-   **styles**:
    It contains all the variables, mixins, and other style related files, which we need globally

-   **theme**:
    It contains all the theme related files which will be needed across the application. For any modification in this, please go through 'Theme' section in this file

-   **utils**:
    It contains all the common logic, constants, regex, helper functions, Api manager

    -   **constants**: Each constant name should be in capital case separated by underscore

        -   common.constant.ts
        -   endpoint.constant.ts
        -   regex.constant.ts
        -   route.constant.ts
        -   storage.constant.ts

    -   **helper**:

        -   async.helper.ts
        -   common.helper.ts
        -   common.helper.tsx
        -   date.helper.ts
        -   storage.helper.ts
        -   validation.helper.ts

    -   **api-manager.ts**

## Files inside src folder

-   **App.scss**:
    Global styles used across the application

-   **main.tsx**:
    1st Entry point of the application

-   **index.html**:
    HTML Entrypoint for the application

-   **index.scss** :
    CSS/SCSS Entry point for the application

-   **App.tsx**:
    2nd Entry point of the application

-   **i18n.ts**:
    This file contains i18 related config

-   **vite-env.d.ts**:
    This file contains the type for custom environment variables

## Adding new icon

-   Create new file **[IconName].icon.tsx**.
-   Every icon must have viewBox property.
-   Define default values for height, width prop.
-   Use material styled to create a elements in which you're passing color as a value (For reference go through Logo.icon.tsx)
-   **index.ts**: Import and export newly created icon.

## Adding new page

To add new page, Create folder inside src/pages with following files

-   **[PageName].page.tsx**:  
     This contains page related code. Use functional component. Do default export for that component. (Hint: You can use rfce/tsrafce if you have react snippet extension installed).

-   **[PageName].module.scss**:
    File for writing styles. (Hint: You can refer to Dashboard.page.tsx for import and use).

-   **[PageName].validation.ts**:
    File for writing validation (Hint: You can refer to Dashboard.validation.tsx for import and use).

-   **index.ts**:
    This file will import the component from [PageName].page.tsx and do the default export for that component.

-   Now to add that page to route, follow steps mentioned in 'Adding new route' section.

## Adding new route

-   Go to src/util/constants/route.constant.ts and add route in ROUTE.
-   Add your route and page in Route.tsx file.

## Adding new component

To add new component, Create folder inside src/components with following files

-   **[ComponentName].component.tsx**:
    This contains component related code. Use functional component. Do default export for that component

-   **[ComponentName].module.scss**:
    File for writing styles (Hint: You can refer to Header.component.tsx for import and use)

-   **[ComponentName].validation.ts**:
    File for writing validation (Hint: You can refer to Dashboard.validation.tsx for import and use)

-   **index.ts**: This file will import the component from [ComponentName].component.tsx and do the default export for that component

**Note**: Folder name must be in **PascalCase**

## Adding new context

To create new context, create folder inside src/contexts with following files

-   **[ContextName].context.tsx**:
    File which contains all the context related logic.
-   **index.ts**: File which imports and exports(named) context.

## Adding new hook

To create new hook, create folder inside src/hooks with following files

-   Create separate file named as use[YourHookName]
-   Export default that hook from the file.
-   Import same hooks in index.ts located in src/hooks/ folder.
-   Do named export from index.ts file.

## Theme

To use any color/fontfamily in tsx file

-   Add those color/fontfamily in src/theme/theme.tsx file.
-   To use theme inside styled component use theme prop (in styled.tsx file).
-   To use theme inside .tsx file use useTheme hook

## Internationalization - i18

For internationalized text follow below step

-   Add that particular text inside all translation.json file.
-   Consume it using `t` component provided by useTranslation() hook, for reference you can view the Dashboard.page.tsx

## Static Analysis Tooling

For static analysis below tools are configured

-   ESLint - Recommend plugins and rules
-   Prettier - Code Formatting basic rules

# Git Workflow

## Creating new feature

-   Checkout to latest release branch using below command
    ```
    git fetch
    git checkout <release_branch_name>
    ```
-   To create new branch
    ```
    git checkout -b <JIRA_FEATURE_KEY>-<feature_name>
    ```
-   To deploy feature in DEV Environment, create Merge Request (Pull Request) from that feature branch to development branch.

## Commit changes

To commit changes follow below steps

```
git status
```

-   Add file using git add command
    ```
    git add .
    ```
-   Commit added file with proper commit message
    ```
    git commit -m "<JIRA_FEATURE_KEY> <commit_message>"
    ```

## Resolving Merge Conflicts When Merging with Development branch

To resolve merge conflicts follow below steps

-   Create separate branch from feature branch with following name
    ```
    git checkout -b <JIRA_FEATURE_KEY>_Merge
    ```
-   Merge development branch in newly created branch
    ```
    git merge origin development
    ```
-   Resolve merge conflicts in local machine
-   Push changes to origin with following branch.
    ```
    git push origin <JIRA_FEATURE_KEY>_Merge
    ```
-   Create Merge request (Pull Request) from newly created branch to development

## Resolving Bugs

When we want to resolve any bugs, Follow below mentioned steps

-   Checkout to New branch with following command:
    ```
    git checkout -b <JIRA_BUG_KEY>-<bug_name>
    ```
-   Resolve bug
-   Do PR from Bug Branch to QA branch
-   Do PR from Bug Branch to Development branch
