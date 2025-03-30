import { usePagination, useSortBy, useTable } from "react-table";
import IconSearch from "assets/svg/IconSearch.svg";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Loader from "components/Loader";
import NoData from "assets/svg/NoData.svg";
import { useSticky } from "react-table-sticky";
import BasicDatePicker from "./Calender";

const pageNumbers =[50,100,150,200];

export default function DataTableCustom({
    data,
    columns,
    setSelectedDate,
    selectedDate,
    searchBar,
    paginationFooter,
    updateFilters = () => {},
    pageNumber,
    paginationData,
    shipperBid,
    date,
    isLoading,
}) {
    const [searchKeyword, setSearchKeyword] = useState(null);
    const [pageFilters, setPageFilters] = useState({
        page: 1,
        per_page: 50,
        search: "",
        ordering: columns[0].accessor || columns[0].Header || "created_at",
        handlePagination: true,
    });
    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: {
                sortBy: [
                    {
                        id: pageFilters.sortColumn,
                        desc: pageFilters.ordering === "desc",
                    },
                ],
            },
            manualSortBy: true,
            autoResetPage: false,
            autoResetSortBy: false,
            disableSortRemove: true,
        },
        useSortBy,
        usePagination,
        useSticky
    );

    const {
        state: { sortBy },
    } = tableInstance;

    useEffect(() => {
        const sortByDetails = {
            ordering: sortBy[0]?.desc ? sortBy[0]?.id : `-${sortBy[0]?.id}`,
        };
        if (pageFilters) {
            setPageFilters((currentPageFilters) => ({
                ...currentPageFilters,
                ...sortByDetails,
            }));
        }
        updateFilters({
            ...pageFilters,
            ...sortByDetails,
        });
    }, [sortBy]);

    const handlePageFilters = (field, value) => {
        if (setPageFilters)
            setPageFilters((currentPageFilters) => ({
                ...currentPageFilters,
                [field]: value,
            }));
        updateFilters((currentPageFilters) => ({
            ...currentPageFilters,
            [field]: value,
        }));
    };

    useEffect(() => {
        handlePageFilters("search", "");
    }, []);

    useEffect(() => {
        handlePageFilters("search", searchKeyword);
    }, [searchKeyword]);

    const handleSearchUpdate = (text) => {
        setSearchKeyword(text?.trim());
        if (pageFilters.page !== 1) handlePageFilters("page", 1);
    };


    const handleItemsPerPageChange = (event) => {
        const value = event.target.value;
        handlePageFilters('per_page', value);
    };

    return (
        <>
            <style>
                {`.custom-table th {
                  
                    padding-left: 0px;  // Added this line for left "margin" effect
                }
            
                `}
            </style>
            <div className="w-full h-[100%] no-scrollbar">
                {data
                    ? searchBar && (
                          <div className="border-1 overflow-hidden border-solid border-natural-200 rounded-xl mb-4 p-4 flex justify-between gap-3 ">
                              <div>
                                  <TextField
                                      placeholder="Search"
                                      className="w-[434px] "
                                      // value={debouncedSearchKeyword}
                                      onChange={(e) =>
                                          handleSearchUpdate(e.target.value)
                                      }
                                      InputProps={{
                                          startAdornment: (
                                              <InputAdornment position="start">
                                                  {
                                                      <img
                                                          src={IconSearch}
                                                          alt="searchicon"
                                                      />
                                                  }
                                                  {/* <IconSearch/> */}
                                              </InputAdornment>
                                          ),
                                      }}
                                  />
                              </div>

                              <div className="flex gap-4">
                                  {date && (
                                      <div>
                                          <BasicDatePicker
                                              setSelectedDate={setSelectedDate}
                                              selectedDate={selectedDate}
                                              pageFilters={pageFilters}
                                              handlePageFilters={
                                                  handlePageFilters
                                              }
                                          />
                                      </div>
                                  )}
                              </div>
                          </div>
                      )
                    : null}

                <div className="border-1 overflow-hidden border-b-0 border-solid border-natural-200 rounded-t-xl ">
                    <table
                        className="border-spacing-0 rad bg-white relative text-left w-full custom-table"
                        {...tableInstance.getTableProps()}
                    >
                        <thead className="top-[-10px]">
                            {tableInstance?.headerGroups?.map(
                                (headerGroup, headerGroupIndex) => (
                                    <tr
                                        key={`table-header-group-${headerGroupIndex}`}
                                        {...headerGroup.getHeaderGroupProps()}
                                    >
                                        {headerGroup.headers.map(
                                            (header, headerIndex) => (
                                                <th
                                                    key={`table-header-${headerIndex}`}
                                                    // onClick={header.column.getToggleSortingHandler()}
                                                    className="bg-natural-100 text-left font-medium px-4 py-4 sticky top-[-25px] "
                                                >
                                                    <div
                                                        {...header.getHeaderProps(
                                                            header.getSortByToggleProps(
                                                                {
                                                                    style: {
                                                                        paddingLeft:
                                                                            "1px",
                                                                        textAlign:
                                                                            "center",
                                                                    },
                                                                }
                                                            )
                                                        )}
                                                        className="flex  space-x-2"
                                                    >
                                                        <span
                                                            // className={`text-sm font-medium text-hb_blue-800 ${
                                                            //   header.isSorted ? "sorted" : null
                                                            // } align-middle`}
                                                            className={`font-medium   align-middle px-3   ${
                                                                headerIndex ===
                                                                0
                                                                    ? ""
                                                                    : ""
                                                            }`}
                                                        >
                                                            {
                                                                // Render the header
                                                                header.render(
                                                                    "Header"
                                                                )
                                                            }
                                                        </span>
                                                        <span
                                                            className={`align-middle`}
                                                        >
                                                            <span
                                                                className={`align-middle`}
                                                            >
                                                                {header.isSorted ? (
                                                                    header.isSortedDesc ? (
                                                                        <span className="sorted-svg-icon flex">
                                                                            <FaSortAmountDown />
                                                                        </span>
                                                                    ) : (
                                                                        <span className="sorted-svg-icon">
                                                                            <FaSortAmountUp />
                                                                        </span>
                                                                    )
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </th>
                                            )
                                        )}
                                    </tr>
                                )
                            )}
                        </thead>

                        <tbody {...tableInstance.getTableBodyProps()}>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={columns.length}>
                                        <Loader />
                                    </td>
                                </tr>
                            ) : // Check if there's data to display

                            tableInstance.rows?.length > 0 ? (
                                tableInstance.rows?.map((row) => {
                                    tableInstance.prepareRow(row);
                                    return (
                                        <tr
                                            {...row.getRowProps()}
                                            className="even:bg-natural-25 odd:bg-natural-50"
                                            key={row.id}
                                        >
                                            {row.cells.map((cell) => (
                                                <td
                                                    className="px-4 py-2 gap-2.5"
                                                    {...cell.getCellProps()}
                                                    key={cell.id}
                                                >
                                                    {
                                                        // Render the cell contents
                                                        cell.render("Cell")
                                                    }
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={columns.length}>
                                        {shipperBid ? (
                                            <div className="text-center my-10">
                                                <Typography
                                                    fontFamily="Sora"
                                                    fontSize={28}
                                                    fontWeight={400}
                                                    color="natural.900"
                                                >
                                                    You have no Bids yet!
                                                </Typography>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col justify-center text-center  m-12  items-center gap-8  ">
                                                <img
                                                    src={NoData}
                                                    width={300}
                                                    alt="no data found"
                                                />
                                                <Typography
                                                    fontFamily="Sora"
                                                    fontSize={28}
                                                    fontWeight={400}
                                                    color="natural.900"
                                                >
                                                    You have no Order yet!{" "}
                                                </Typography>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div
                    className={`flex justify-start gap-2 pt-2.5 ${
                        !pageNumber ? "border-t-0" : ""
                    } px-6  overflow-hidden border-solid border-natural-200 rounded-b-xl`}
                >
                    {pageNumber === true ? (
                        <span className="flex  gap-1 pb-4 w-full flex-col justify-center align-middle ">
                            <div>
                                <Typography fontWeight={500}>
                                    Page {paginationData.page ?? "1"} of{" "}
                                    {paginationData.pages ?? "1"}
                                </Typography>
                            </div>
                        </span>
                    ) : null}

                    {paginationFooter === true ? (
                         <div className="flex pb-4 gap-2 justify-end w-full">
                         <div className="flex justify-start ml-12 mr-10">
                             <span className="flex pt-1 gap-1 w-full flex-col justify-center align-middle mr-0">
                                     <Typography fontWeight={500} className="mr-[-40px]">
                                         Per Page
                                     </Typography>
                             </span>
                             <Select
                                 value={pageFilters?.per_page}
                                 onChange={(e)=> handleItemsPerPageChange(e)}
                                 sx={{ 
                                    width: 165,
                                    height:40
                                  }}
                             >
                                {pageNumbers.map((num)=>
                                    <MenuItem key={num} value={num}> {num} </MenuItem>
                                )}
                                 
                             </Select>
                         </div>
                         <IconButton
                             className="border border-natural-200 border-solid p-1 w-10 h-10 rounded-lg text-natural-900"
                             onClick={() => handlePageFilters('page', pageFilters?.page - 1)}
                             disabled={paginationData.page === 1 || isLoading}
                         >
                             <ChevronLeft />
                         </IconButton>
                         <IconButton
                             variant="outlined"
                             className="border border-natural-200 border-solid p-2 w-10 h-10 rounded-lg text-natural-900"
                             onClick={() => handlePageFilters('page', pageFilters?.page + 1)}
                             disabled={
                                 paginationData?.page === paginationData?.pages || isLoading
                             }
                         >
                             <ChevronRight />
                         </IconButton>
                     </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}
