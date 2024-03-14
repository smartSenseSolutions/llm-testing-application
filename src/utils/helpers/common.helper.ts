import { getAlert } from '@patent-app/hooks';
import { EXPANDED_CLASS_NAME } from '../constants/common.constant';

export const arrayToString = (arrayValue: string[], separator: string = ' '): string => {
    return arrayValue.filter(Boolean).join(separator);
};

export const prepareEmptyValue = (value: unknown) => {
    if (value === null || value === undefined) {
        return '';
    } else if (Array.isArray(value) && value.length === 0) {
        return [];
    } else if (value.constructor === Object && Object.entries(value).length === 0) {
        return {};
    }
    return value;
};

export const isEmptyValue = (value: unknown) => {
    if (value === null || value === undefined) {
        return true;
    } else if (typeof value === 'string' && value === '') {
        return true;
    } else if (Array.isArray(value) && value.length === 0) {
        return true;
    } else if (value.constructor === Object && Object.entries(value).length === 0) {
        return true;
    }
    return false;
};

export const parseEndpoint = (url: string, params: Record<string, string | number | boolean>) => {
    Object.keys(params).forEach((key) => {
        url = url.replace(key, `${params[key]}`);
    });
    return url;
};

export const copyHandler = async (item: string) => {
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(item);
            getAlert('success', `Copied`);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    } else {
        // Use the 'out of viewport hidden text area' trick
        const textArea = document.createElement('textarea');
        textArea.value = item;

        // Move textarea out of the viewport so it's not visible
        textArea.style.position = 'absolute';
        textArea.style.left = '-999999px';

        document.body.prepend(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            getAlert('success', `Copied`);
        } catch (error) {
            console.error(error);
        } finally {
            textArea.remove();
        }
    }
};

export const copyHandlerForDialog = async (item: string) => {
    // Log the item to verify it contains the intended text
    // Use the 'out of viewport hidden text area' trick
    const textArea = document.createElement('textarea');
    textArea.style.position = 'absolute';
    textArea.style.left = '-999999px';
    textArea.style.opacity = '0'; // Make it transparent
    textArea.value = item;

    document.body.prepend(textArea);
    textArea.select();
    textArea.focus(); // Ensure the text area is focused

    try {
        document.execCommand('copy');
        getAlert('success', `Copied`);
        // Introduce a small delay before removing the text area
        setTimeout(() => {
            textArea.remove();
        }, 100);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        getAlert('error', `Failed to copy: ${error.message}`);
    }
};

export const generateAndDownloadFromHTMLFile = (
    htmlContent: string,
    mimeType: string,
    fileNameWithExtension: string,
) => {
    // Create Blob
    const blob = new Blob([htmlContent], { type: mimeType });

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileNameWithExtension;

    // Trigger download
    a.click();

    // Cleanup
    URL.revokeObjectURL(a.href);
};

export const highlightSearchedWord = (text: string, searchWord: string, highlightClass = 'bg-yellow-400') => {
    if (searchWord) {
        const escapedSearchWord = searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedSearchWord})`, 'gi');
        const highlightedText = text.replace(regex, `<span class="${highlightClass}">$1</span>`);
        return highlightedText;
    }
    return text;
};

export const scrollExpandedBlock = () => {
    const elements = document.getElementsByClassName(EXPANDED_CLASS_NAME);
    if (elements && elements[0]) {
        elements[0].scrollIntoView();
    }
};
