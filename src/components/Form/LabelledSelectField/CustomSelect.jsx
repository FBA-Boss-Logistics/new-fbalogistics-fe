// import {
//   Autocomplete,
//   TextField,
//   InputLabel,
//   FormHelperText,
//   Tooltip,
// } from "@mui/material";
// import { ChevronDown } from "lucide-react";
// import React, { useState } from "react";

// const CustomSelect = ({
//   label,
//   options,
//   value,
//   onChange,
//   error,
//   helperText,
//   required,
//   disabled,
//   placeholder,
//   tooltip,
//   sx,
//   size = "small",
// }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="flex flex-col w-full items-center justify-center">
//       {label && (
//         <InputLabel
//           required={required}
//           disabled={disabled}
//           className="!transform-none mb-[10px] font-semibold text-sm text-[#2E2E2E]"
//         >
//           {label}
//         </InputLabel>
//       )}

//       {/* Wrap with relative container to position icon */}
//       <div style={{ position: "relative", width: "100%" }}>
//         {/* Custom left icon */}
//         <div
//           className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer z-10"
//           onClick={() => setOpen((prev) => !prev)}
//         >
//           <ChevronDown
//             className={`text-[#213E7B] transition-transform duration-200 ease-in-out ${
//               open ? "rotate-180" : ""
//             }`}
//           />
//         </div>

//         <Autocomplete
//           disableClearable
//           fullWidth
//           popupIcon={null} // Remove default right icon
//           options={options}
//           value={value || ""}
//           onChange={(e, val) => onChange(val)}
//           open={open}
//           onOpen={() => setOpen(true)}
//           onClose={() => setOpen(false)}
//           size={size}
//           disabled={disabled}
//           renderInput={(params) => (
//             <Tooltip title={tooltip || ""}>
//               <TextField
//                 {...params}
//                 required={required}
//                 disabled={disabled}
//                 placeholder={placeholder}
//                 error={Boolean(error)}
//                 sx={{
//                   width: "100%",
//                   "& .MuiAutocomplete-inputRoot": {
//                     paddingRight: "0px !important", // override excessive right padding
//                     flexWrap: "nowrap",
//                   },
//                   "& .MuiOutlinedInput-root": {
//                     paddingRight: "0px !important", // override default 39px
//                     borderRadius: "8px",
//                     "& fieldset": {
//                       borderColor: "#213E7B",
//                     },
//                     "&:hover fieldset": {
//                       borderColor: "#1D2F55",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#2E6AD3",
//                       borderWidth: "2px",
//                     },
//                   },
//                   "& .MuiAutocomplete-endAdornment": {
//                     display: "none", // hide adornment (default right icon)
//                     // backgroundColor: "red",
//                     width: "0px !important",
//                     height: "0px !important",
//                     minWidth: "0px !important",
//                     minHeight: "0px !important",
//                     flex: "0 0 auto !important",
//                     padding: "0px !important",
//                     margin: "0px !important",
//                   },
//                   "& .MuiAutocomplete-input": {
//                     padding: "2.5px 4px 2.5px 30px !important",
//                     fontSize: "0.875rem",
//                     fontWeight: 600,
//                     color: "#213E7B",
//                     overflow: "visible",
//                     textOverflow: "unset",
//                     minWidth: "0",
//                     width: "100% !important",
//                     whiteSpace: "normal",
//                   },
//                   ...sx,
//                 }}                                
//               />
//             </Tooltip>
//           )}
//         />
//       </div>

//       {helperText && (
//         <FormHelperText
//           error={Boolean(error)}
//           sx={{ marginLeft: 0, fontSize: "0.75rem" }}
//         >
//           {helperText}
//         </FormHelperText>
//       )}
//     </div>
//   );
// };

// export default CustomSelect;

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx"; // Optional for cleaner class logic
import { Tooltip } from "@mui/material"; // Optional, or use native title attribute

const CustomSelect = ({
  label,
  options = [],
  value,
  onChange,
  error,
  helperText,
  required,
  disabled,
  placeholder = "Select an option",
  tooltip = "",
}) => {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt === value || opt.value === value)?.label || value || placeholder;

  return (
    <div className="w-full flex">
      {label && (
        <label className="mb-2 text-sm font-semibold text-[#2E2E2E]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative w-full flex flex-col items-center justify-center">
        <Tooltip title={tooltip}>
        <button
          disabled={disabled}
          onClick={() => setOpen(!open)}
          className={clsx(
            "w-full text-left px-3 py-2 border rounded-md text-sm font-medium flex flex-row items-center justify-center gap-1",
            error ? "border-red-500" : "border-[#213E7B]",
            disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white",
            open && "border-blue-500"
          )}
        >
          <ChevronDown
            className={clsx(
              "h-5 w-5 text-[#213E7B] transition-transform duration-200",
              open && "rotate-180"
            )}
          />
          <span className="text-[#213E7B] whitespace-nowrap">{selectedLabel}</span>
        </button>

        </Tooltip>

        {open && !disabled && (
          <ul className="absolute z-10 mt-1 top-10 left-0 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg text-sm">
            {options.length === 0 && (
              <li className="px-4 py-2 text-gray-500">No options</li>
            )}
            {options.map((opt, idx) => {
              const label = typeof opt === "string" ? opt : opt.label;
              const val = typeof opt === "string" ? opt : opt.value;
              return (
                <li
                  key={idx}
                  onClick={() => {
                    onChange(val);
                    setOpen(false);
                  }}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-[#213E7B]"
                >
                  {label}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {helperText && (
        <p className={clsx("text-xs mt-1", error ? "text-red-500" : "text-gray-500")}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default CustomSelect;
