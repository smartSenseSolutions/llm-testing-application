import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Virtuoso } from 'react-virtuoso';
import { SearchInput, Tooltip, NoDataFound, SortBy, CircularLoader } from '@patent-app/stories';
import { PromptRating } from '../PromptRating';
import { Prompt } from '@patent-app/types/Prompt.type';
import { Item } from '@patent-app/types/Common.type';
import { PROMPT_SORT_BY_OPTIONS, PROMPT_SORT_BY_PARAMS, TIMEOUT } from '@patent-app/utils/constants/common.constant';
import { copyHandlerForDialog, highlightSearchedWord, isEmptyValue } from '@patent-app/utils/helpers/common.helper';
import Icons from '@patent-app/icons';
import { PromptApi } from '@patent-app/apis';
import './BrowsePrompt.scss';

type BrowsePromptProps = {
    onUseContent: (desc: string) => void;
};

const BrowsePrompt = ({ onUseContent }: BrowsePromptProps) => {
    // Hooks & Variables
    const [searchData, setSearchData] = useState('');
    const [data, setData] = useState<Prompt[]>([]);
    const [sortBy, setSoryBy] = useState<Item>(PROMPT_SORT_BY_OPTIONS[0]);
    const [isLoading, setIsLoading] = useState(true);
    const virtuosoStyle = { height: '100%' };
    const [paginationData, setPaginationData] = useState({
        recordsPerPage: 20,
        pageNumber: 1,
    });
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        getBrowsePromptData();
    }, [sortBy]);

    // Api Calls
    const getBrowsePromptData = (searchString: string = searchData) => {
        const sortByParams = PROMPT_SORT_BY_PARAMS[sortBy.value] || {};
        const params = {
            search: searchString,
            showAll: false,
            ...paginationData,
            ...sortByParams,
        };
        PromptApi.getList(params)
            .then((res) => {
                setData((prevValue) => {
                    const tempPayload =
                        paginationData.pageNumber == 1 ? res?.payload : [...prevValue, ...(res?.payload || [])];
                    return tempPayload;
                });
                setTotalRecords(res?.pager?.totalRecords || 0);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log('Error =>', err);
            })
            .finally(() => {
                setPaginationData({ ...paginationData, pageNumber: paginationData.pageNumber + 1 });
            });
    };

    // Event Handlers

    const handleUseContent = (description: string) => {
        onUseContent(description);
    };

    const copyDataHandler = (description: string) => {
        copyHandlerForDialog(description);
    };

    const debounceSearch = useCallback(debounce(getBrowsePromptData, TIMEOUT.STANDARD), []);

    const handleSearch = (search: string) => {
        setSearchData(search);
        debounceSearch(search);
    };

    const handleSortByClick = (item: Item) => {
        setPaginationData({ ...paginationData, pageNumber: 1 });
        setSoryBy(item);
    };

    const handleEndReached = () => {
        if (data?.length < totalRecords) {
            getBrowsePromptData();
        }
    };

    // Helpers

    // JSX Methods

    const renderPrompt = (index: number, item: Prompt) => {
        return (
            <div className="prompt-section" key={index}>
                <div className="flex justify-between items-center mb-[1.5rem]">
                    <h2
                        dangerouslySetInnerHTML={{
                            __html: highlightSearchedWord(item?.title, searchData),
                        }}
                    />
                    <div className="icons flex gap-[1rem] w-[31.7rem] justify-end">
                        {item?.section ? (
                            <span className="text-[1.3rem] text-secondary self-center pl-[0.7rem] pr-[0.7rem] pt-[0.4rem] pb-[0.4rem] rounded-[0.8rem] bg-secondary10">
                                {item?.section}
                            </span>
                        ) : null}
                        <button onClick={() => handleUseContent(item?.description)} className="use-text">
                            Use
                        </button>

                        <Tooltip title={'Copy'}>
                            <button className="copy-icon" onClick={() => copyDataHandler(item?.description)}>
                                <Icons.Copy />
                            </button>
                        </Tooltip>
                    </div>
                </div>
                <p
                    dangerouslySetInnerHTML={{
                        __html: highlightSearchedWord(item?.description, searchData),
                    }}
                />
                {!isEmptyValue(item?.tags) ? (
                    <div className="tags mt-8">
                        {item?.tags.map((tag: string) => (
                            <span
                                className="tag"
                                key={tag}
                                dangerouslySetInnerHTML={{
                                    __html: highlightSearchedWord(tag, searchData),
                                }}
                            />
                        ))}
                    </div>
                ) : null}

                <PromptRating
                    averageRating={item?.rating && item?.rating > 0 ? item?.rating : 0}
                    promptId={item.id}
                    numberOfRating={item?.ratings_count ? item?.ratings_count : 0}
                    key={item?.ratings_count}
                />
            </div>
        );
    };

    const Loader = () => {
        return <>{data?.length < totalRecords ? <CircularLoader height="150px" /> : <></>}</>;
    };

    return (
        <div className="px-[3rem]">
            <>
                <div className="flex justify-between my-[2rem] pb-0">
                    <div className="w-[50%]">
                        <SearchInput
                            value={searchData}
                            onClearClick={() => handleSearch('')}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center">
                        <span className="w-[9rem] text-center font-medium text-[1.5rem]"> Sort By :</span>

                        <SortBy items={PROMPT_SORT_BY_OPTIONS} onItemClick={handleSortByClick} value={sortBy} />
                    </div>
                </div>

                {isLoading ? (
                    <CircularLoader height="calc(100vh - 250px)" />
                ) : (
                    <div className="prompt-main">
                        {data.length === 0 ? (
                            <NoDataFound message="No prompts were found based on your search" />
                        ) : (
                            <Virtuoso
                                style={virtuosoStyle}
                                data={data}
                                itemContent={renderPrompt}
                                totalCount={data?.length || 0}
                                endReached={() => handleEndReached()}
                                components={{ Footer: Loader }}
                            />
                        )}
                    </div>
                )}
            </>
        </div>
    );
};

export { BrowsePrompt };
