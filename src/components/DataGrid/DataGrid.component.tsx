import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { debounce } from 'lodash';
import {
    Button,
    Dialog,
    Pagination,
    SearchInput,
    Tooltip,
    NoDataFound,
    ConfirmationPopup,
    SortBy,
    Select,
    OverflowToolTip,
} from '@patent-app/stories';
import { AddUpdatePrompt } from '../AddUpdatePrompt';
import { PromptRating } from '../PromptRating';
import { ActionButton } from '../ActionButton';
import { Prompt } from '@patent-app/types/Prompt.type';
import { Item } from '@patent-app/types/Common.type';
import { copyHandler, highlightSearchedWord } from '@patent-app/utils/helpers/common.helper';
import {
    PAGINATION_OPTIONS,
    PROMPT_SORT_BY_OPTIONS,
    PROMPT_SORT_BY_PARAMS,
    TIMEOUT,
} from '@patent-app/utils/constants/common.constant';
import Icons from '@patent-app/icons';
import { PromptApi } from '@patent-app/apis';

const maxTags = 2;

const DataGridComp = () => {
    // Hooks & Variables
    const [searchData, setSearchData] = useState('');
    const [data, setData] = useState<Prompt[]>([]);
    const [pager, setPager] = useState({ totalRecords: 0, filteredRecords: 0 });
    const [pagination, setPagination] = useState({ page: 1, size: 10 });
    const [selectedData, setSelectedData] = useState<Prompt>();
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const promptIdRef = useRef('');
    const [sortBy, setSoryBy] = useState<Item>(PROMPT_SORT_BY_OPTIONS[0]);

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: 'title',
                headerName: 'PROMPT TITLE',
                sortable: false,
                width: 250,
                filterable: false,
                renderCell: (params) => generateHighlightSearchedClickableElement(params.row),
            },
            {
                field: 'description',
                headerName: 'DESCRIPTION',
                width: 300,
                sortable: false,
                filterable: false,
                renderCell: (params) => {
                    return generateHighlightSearchedText(params.row.description);
                },
            },
            {
                field: 'section',
                headerName: 'SECTION',
                width: 200,
                sortable: false,
                filterable: false,
            },
            {
                field: 'topic',
                headerName: 'TOPIC',
                width: 200,
                sortable: false,
                filterable: false,
            },
            {
                field: 'tags',
                headerName: 'TAGS',
                width: 300,
                sortable: false,
                filterable: false,
                renderCell: (params) => {
                    const tags = params.row.tags || [];
                    return (
                        <div className="tags">
                            {tags.slice(0, maxTags).map((tag: string, index: number) => {
                                return (
                                    <span className="tag" key={index}>
                                        {generateHighlightSearchedText(tag)}
                                    </span>
                                );
                            })}
                            {tags.length > maxTags ? (
                                <Tooltip
                                    title={tags.slice(maxTags).map((item: string, index: number) => (
                                        <div key={index}>{item}</div>
                                    ))}
                                >
                                    <span className="cursor-pointer tag">+{tags.length - 2}</span>
                                </Tooltip>
                            ) : null}
                        </div>
                    );
                },
            },
            {
                field: 'rating',
                headerName: 'Ratings',
                sortable: false,
                filterable: false,
                width: 230,
                renderCell: (params) => {
                    return (
                        <PromptRating
                            averageRating={params.row?.rating && params.row?.rating > 0 ? params.row?.rating : 0}
                            promptId={params.row.id}
                            isGrid={true}
                            numberOfRating={params?.row?.ratings_count}
                            key={params?.row?.ratings_count}
                            onRatingChange={handleRatingChange}
                        />
                    );
                },
            },
            {
                field: 'actions',
                headerName: 'Actions',
                sortable: false,
                filterable: false,
                width: 150,
                renderCell: (params) => {
                    return (
                        <div className="flex gap-[1.5rem] action-btns">
                            <ActionButton
                                icon={<Icons.Copy />}
                                onClick={() => copyDataHandler(params.row.description)}
                                title="Copy"
                            />

                            <ActionButton
                                icon={<Icons.Edit />}
                                onClick={() => updateDataHandler(params.row)}
                                title="Edit"
                            />

                            <ActionButton
                                icon={<Icons.Delete />}
                                onClick={() => handleDeleteClick(params.row?.id)}
                                title="Delete"
                            />
                        </div>
                    );
                },
            },
        ],
        [searchData],
    );

    useEffect(() => {
        onApiCall();
    }, [pagination, sortBy]);

    // Api Calls

    const onApiCall = (data = '') => {
        const sortByParams = PROMPT_SORT_BY_PARAMS[sortBy.value] || {};
        const params = {
            search: data,
            pageNumber: pagination.page,
            recordsPerPage: pagination.size,
            showAll: false,
            ...sortByParams,
        };
        PromptApi.getList(params)
            .then((res) => {
                setData(res.payload);
                if (res.pager)
                    setPager({
                        totalRecords: res.pager.totalRecords,
                        filteredRecords: res.pager.filteredRecords,
                    });
            })
            .catch((err) => {
                console.log('Error =>', err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Event Handlers

    const debounceSearch = useCallback(debounce(onApiCall, TIMEOUT.STANDARD), []);

    const deletePromptApiCall = (promptId: string) => {
        if (promptId) {
            PromptApi.delete(promptId).then(() => {
                if (pagination.page !== 1) {
                    setPagination((prev) => ({ ...prev, page: 1 }));
                } else {
                    onApiCall();
                }
                handleCloseDeleteConfirmation();
            });
        }
    };

    const onCloseDialog = (event: boolean) => {
        if (event) {
            onApiCall();
        }
        setIsOpenDialog(false);
    };

    const onSearchData = (data: string) => {
        if (pagination.page !== 1) {
            setPagination((prev) => ({ ...prev, page: 1 }));
        } else {
            debounceSearch(data);
        }
        setSearchData(data);
    };

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPagination({ ...pagination, page: value });
    };

    const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
        setPagination({ page: 1, size: event.target.value as number });
    };

    const copyDataHandler = async (description: string) => {
        copyHandler(description);
    };

    const updateDataHandler = (data: Prompt) => {
        setSelectedData(data);
        setIsOpenDialog(true);
    };

    const handleDeleteClick = (id: string) => {
        promptIdRef.current = id;
        setIsDeleteConfirmationVisible(true);
    };

    const handleCloseDeleteConfirmation = () => {
        promptIdRef.current = '';
        setIsDeleteConfirmationVisible(false);
    };

    const handleConfirmDeleteConfirmation = () => {
        deletePromptApiCall(promptIdRef.current);
    };

    const handleSortByClick = (item: Item) => {
        setSoryBy(item);
    };

    const handleRatingChange = (id: string, averageRating: number, noOfRating: number) => {
        setData((prevData) => {
            return prevData.map((prompt) => {
                if (prompt.id === id) {
                    prompt.rating = averageRating;
                    prompt.ratings_count = noOfRating;
                }
                return prompt;
            });
        });
    };

    // Helpers

    // JSX Elements

    const generateHighlightSearchedText = (htmlText: string) => {
        return (
            <OverflowToolTip title={htmlText}>
                <div
                    className="overflow-hidden text-ellipsis"
                    dangerouslySetInnerHTML={{
                        __html: highlightSearchedWord(htmlText, searchData),
                    }}
                ></div>
            </OverflowToolTip>
        );
    };

    const renderNoRows = () => {
        return <NoDataFound message="No prompts were found based on your search" />;
    };

    const generateHighlightSearchedClickableElement = (prompt: Prompt) => {
        return (
            <OverflowToolTip title={prompt?.title}>
                <a
                    className="overflow-hidden text-ellipsis underline cursor-pointer text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    dangerouslySetInnerHTML={{
                        __html: highlightSearchedWord(prompt?.title, searchData),
                    }}
                    onClick={() => updateDataHandler(prompt)}
                ></a>
            </OverflowToolTip>
        );
    };

    return (
        <>
            <header className="flex justify-between items-center mb-[1.4rem]">
                <h2 className="font-[600] text-[3rem] m-0">Prompt Library</h2>
                <div className="flex items-center gap-[1rem]">
                    <SearchInput
                        value={searchData}
                        onClearClick={() => {
                            onSearchData('');
                            setSearchData('');
                        }}
                        onChange={(e) => onSearchData(e.target.value)}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setIsOpenDialog(true);
                                setSelectedData(undefined);
                            }}
                        >
                            <span className="mr-[0.5rem]">
                                <Icons.Plus />
                            </span>{' '}
                            Prompt
                        </Button>
                    </div>

                    <span className="w-[14rem] text-center font-medium text-[1.5rem]"> Sort By :</span>

                    <SortBy items={PROMPT_SORT_BY_OPTIONS} onItemClick={handleSortByClick} value={sortBy} />
                </div>
            </header>
            <div className="w-[100%] h-[calc(100vh-24rem)]">
                <DataGrid
                    rows={data}
                    columns={columns}
                    hideFooter={true}
                    slots={{
                        noRowsOverlay: renderNoRows,
                    }}
                    loading={isLoading}
                />
            </div>
            {pager?.totalRecords >= 10 ? (
                <div className="flex justify-between w-[100%] mt-[1rem]">
                    <div>
                        <Select
                            options={PAGINATION_OPTIONS}
                            id="size-select"
                            value={pagination.size}
                            size="small"
                            onChange={handleSelectChange}
                        />
                    </div>
                    <div>
                        <Pagination
                            count={Math.ceil(pager.totalRecords / pagination.size)}
                            page={pagination.page}
                            color="primary"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            ) : null}

            <Dialog
                open={isOpenDialog}
                onClose={() => setIsOpenDialog(false)}
                title={selectedData?.id ? 'Update Prompt' : 'Create Prompt'}
            >
                <AddUpdatePrompt onClose={(e: boolean) => onCloseDialog(e)} selectedData={selectedData} />
            </Dialog>

            <ConfirmationPopup
                open={isDeleteConfirmationVisible}
                okayButtonLabel="Yes"
                cancelButtonLabel="No"
                title="Confirmation"
                question="This action can not be reverted. Are you sure you want to delete this prompt? "
                onCancelButtonClick={handleCloseDeleteConfirmation}
                onClose={handleCloseDeleteConfirmation}
                onConfirmButtonClick={handleConfirmDeleteConfirmation}
            />
        </>
    );
};

export { DataGridComp };
