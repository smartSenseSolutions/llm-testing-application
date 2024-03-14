import { useState } from 'react';
import { DraftCard, FigureCard, TextCard } from '@patent-app/components';
import { DraftSections } from '@patent-app/types/Draft.type';
import { ExpandedSection } from '@patent-app/types/Common.type';
import { EXPANDED_CLASS_NAME } from '@patent-app/utils/constants/common.constant';

const expandedClassName: Record<ExpandedSection, string> = {
    figure: `col-[1_/_-1]`,
    draft: 'col-[1_/_-1]',
    text: `col-[1_/_-1] row-start-2 ${EXPANDED_CLASS_NAME}`,
    '': '',
};

export const DraftPatents = () => {
    //Hooks & variables
    const templatePlaceholder = '';
    const [moveData, setMoveData] = useState<DraftSections>({
        technicalField: templatePlaceholder,
        technicalBackground: templatePlaceholder,
        summary: templatePlaceholder,
        embodiments: templatePlaceholder,
        briefDescriptionDrawings: templatePlaceholder,
        detailedDescription: templatePlaceholder,
    });
    const [expandedSection, setExpandedSection] = useState<ExpandedSection>('');

    //Event handler
    const onToggleMenu = (type: ExpandedSection) => {
        setExpandedSection((prevValue) => {
            return prevValue === type ? '' : type;
        });
    };

    const onMoveToHandler = (keyName: DraftSections, data: string | undefined) => {
        setMoveData((prevValue) => {
            return { ...prevValue, [keyName as unknown as string]: data };
        });
    };

    //Helper
    const getExpandedClassName = (expandedSec: ExpandedSection) => {
        return expandedSec === expandedSection ? expandedClassName[expandedSec] : '';
    };

    return (
        <div className={`grid gap-[2rem] grid-flow-col p-[3rem] grid-cols-[1fr_1fr] draft-grid-rows`}>
            <div className={getExpandedClassName('figure')}>
                <FigureCard onToggleEvent={onToggleMenu} isExpanded={expandedSection === 'figure'} />
            </div>
            <div className={getExpandedClassName('text')}>
                <TextCard
                    onToggleEvent={onToggleMenu}
                    onMoveDataHandler={onMoveToHandler}
                    isExpanded={expandedSection === 'text'}
                />
            </div>
            <div className={`${getExpandedClassName('draft')} flex flex-col`}>
                <DraftCard
                    editorData={moveData}
                    onToggleEvent={onToggleMenu}
                    isExpanded={expandedSection === 'draft'}
                />
            </div>
        </div>
    );
};
