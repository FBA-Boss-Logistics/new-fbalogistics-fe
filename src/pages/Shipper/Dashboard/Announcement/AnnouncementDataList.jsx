import React from 'react';
import { formatDateDivider, formatTimestamp } from "utils";
import { Typography, Box, Container, IconButton, MenuItem, Select } from '@mui/material';
import AnnouncementCard from './AnnouncementCard';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const pageNumbers =[50,100,150,200];

function AnnouncementDataList({
    announcementDataList,
    paginationInformation,
    setAnnouncementListPagination,
    isLoading,
    announcementListPagination
}) {
   

  return (
    <>
            <div  className='space-y-6'>
            {announcementDataList?.map(({ message, sender, timestamp, id }) =>{
                return(
                    
                    <AnnouncementCard key={timestamp} text={message} id={id} fullName={`${sender.first_name} ${sender.last_name}`} time={formatDateDivider(timestamp)}/>
                   
                )
            })}
             </div>
            {paginationInformation && announcementDataList?.length > 0 && <div
                    className={`flex justify-start gap-2 pt-2.5 px-6 ml-4 overflow-hidden border-solid border-natural-200 rounded-xl`}
                >
                     
                        <span className="flex gap-1 pb-4 w-full flex-col justify-center align-middle ">
                            <div>
                                <Typography fontWeight={500}>
                                Page {paginationInformation.page ?? "1"} of{" "}
                                {paginationInformation.pages ?? "1"}
                                </Typography>
                            </div>
                        </span>

                         <div className="flex pb-4 gap-2 justify-end w-full">
                            <div className="flex justify-start ml-5 mr-20">
                             <span className="flex pt-1 gap-1 pb-1 w-full flex-col justify-center align-middle ">
                                     <Typography fontWeight={500}>
                                         Per Page
                                     </Typography>
                             </span>
                             <Select
                                 value={announcementListPagination?.per_page}
                                 onChange={(e)=> setAnnouncementListPagination(prev => ({...prev, per_page : e.target.value}))}
                                 sx={{ 
                                    width: 165,
                                    height: 40
                                  }}
                             >
                                {pageNumbers.map((num)=>
                                    <MenuItem key={num} value={num}> {num} </MenuItem>
                                )}
                                 
                             </Select>
                         </div>
                         <IconButton
                             className="border border-natural-200 border-solid p-1 w-10 h-10 rounded-lg text-natural-900"
                             onClick={() => setAnnouncementListPagination(prev => ({...prev, page : prev.page - 1}))}
                             disabled={paginationInformation.page === 1 || isLoading}
                         >
                             <ChevronLeft />
                         </IconButton>
                         <IconButton
                             variant="outlined"
                             className="border border-natural-200 border-solid p-2 w-10 h-10 rounded-lg text-natural-900"
                             onClick={() => setAnnouncementListPagination(prev => ({...prev, page : prev.page + 1}))}
                             disabled={
                                paginationInformation?.page === paginationInformation?.pages || isLoading
                             }
                         >
                             <ChevronRight />
                         </IconButton>
                     </div>
            </div>}

        </>
    
  )
}
export default AnnouncementDataList