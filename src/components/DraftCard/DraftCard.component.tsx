import { RichEditor } from '@patent-app/stories';
import { CardHeader } from '../CardHeader';
import { ExpandedSection } from '@patent-app/types/Common.type';
import { DraftSections } from '@patent-app/types/Draft.type';

type DraftCardProp = {
    isExpanded: boolean;
    onToggleEvent: (type: ExpandedSection) => void;
    editorData: DraftSections;
};

const DraftCard = ({ editorData, isExpanded, onToggleEvent }: DraftCardProp) => {
    // Hooks & Variables
    const sampleData = `**Technical Field** \n \n ${editorData.technicalField} 

    \n \n **Technical Background** \n \n ${editorData.technicalBackground} 
    
    \n \n **Summary** \n \n ${editorData.summary} 
    
    \n \n **Embodiments** \n \n ${editorData.embodiments}
    
    \n \n **Brief Description of the Drawings** \n \n ${editorData.briefDescriptionDrawings} 
    
    \n \n **Detailed Description** \n \n ${editorData.detailedDescription}`;

    // Api Calls

    // Event Handlers

    const handleCollapseToggle = () => {
        onToggleEvent('draft');
    };

    // Helpers

    // JSX Elements

    return (
        <>
            <CardHeader
                title="DRAFT"
                isExpanded={isExpanded}
                onZoomHandler={handleCollapseToggle}
                isSelectVisible={false}
                className="draft-header"
                isBrowsePromptVisible={false}
            />

            <RichEditor data={{ generated_text: sampleData }} renderImg={false} />
        </>
    );
};

export { DraftCard };
