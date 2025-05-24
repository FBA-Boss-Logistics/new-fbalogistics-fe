import { InputAdornment, TextField } from '@mui/material';
import React from 'react';
import IconSearch from "assets/svg/IconSearch.svg";
import BasicDatePicker from './Calender';
const FilterTable = () => {
  return (
   <div className="border-1 overflow-hidden border-solid  px-4  border-natural-200  justify-items-end rounded-xl mb-4 py-4 flex flex-row justify-between  gap-3 ">
   <div>
   
       <TextField
           placeholder="Search Product"
           className="w-[300px] "
           // value={debouncedSearchKeyword}
           onChange={(e) =>
               // handleSearchUpdate(e.target.value)
               console.log(e.target.value)
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
   <div className="flex gap-2 justify-center items-center">

   </div>
</div>
  );
};

export default FilterTable;