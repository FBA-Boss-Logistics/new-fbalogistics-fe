import { Button, Card } from "@mui/material";
import HeaderPage from "components/HeaderPage";
import ModalComponent from "components/New/ModalComponent";
import { fetchAllAverageCostApi, useCreateAverageCostApi, useUpdateAverageCostApi, useDeleteMultipleAverageCostApi, useDeleteAverageCostApi } from "queries/Shipper";
import { useState, useRef, useEffect } from "react";
import Loader from "components/Loader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import HandleSuccessResponse from "utils/HandleSuccessResponse";
import HandleErrorResponse from "utils/HandleErrorResponse";
import AddWarehouseRow from "./AddWarehouseRow";
import { useQueryClient } from "@tanstack/react-query";

const AverageCostSchema = yup.object().shape({
  warehouse_number: yup.string().required("Warehouse Number is required"),
  slow_cost: yup.number().required("Slowce is required"),
  fast_cost: yup.number().required("Fastce is required"),
  air_cost: yup.number().required("Airshipment is required"),
});

export default function AverageCost() {
  // Store Data
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const user = localStorage.getItem("USER_DETAILS");
  const userData = JSON.parse(user);
  const userRole = userData.groups;

  // Query
  const queryClient = useQueryClient();

  const { data: averageCostDatas, isLoading, isError: averageCostError } = fetchAllAverageCostApi();
  const { mutate: createAverageCost } = useCreateAverageCostApi();
  const { mutate: updateAverageCost } = useUpdateAverageCostApi();
  const { mutate: deleteAverageCost } = useDeleteAverageCostApi();
  const { mutate: deleteMultipleAverageCost } = useDeleteMultipleAverageCostApi();

  const averageCostData = averageCostDatas?.data?.data;
  console.log("averageCostData", averageCostData);

  const [isAddWarehouse, setIsAddWarehouse] = useState(false);

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  
  const [editingCell, setEditingCell] = useState(null); // { rowIndex, field }
  const [selectedIds, setSelectedIds] = useState([]);
  const inputRef = useRef(null);

  // Timer
  const [pressTimer, setPressTimer] = useState(null);
  
  const {
    control,
    handleSubmit,
    watch,
    register,
    reset,
    setError,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AverageCostSchema),
  });

  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  useEffect(() => {
    if (averageCostData) {
      setTableData(averageCostData);
    }
  }, [averageCostData]);
    
  const handleAddWarehouse = () => {
    setIsAddWarehouse(true);
  }

  const handleCancel = () => {
    setIsAddWarehouse(false);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  }

  const handleEdit = (rowIndex, field) => {
    setEditingCell({ rowIndex, field });
  };

  const handleMouseDown = (e, row) => {
    e?.preventDefault();
    const timer = setTimeout(() => {
      setSelectedRow(row);
      setOpenDeleteModal(true);
    }, 2000);
    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer);
    setPressTimer(null);
  };

  const handleMouseLeave = () => {
    clearTimeout(pressTimer);
    setPressTimer(null);
  };

  const handleChange = (e, rowIndex, field) => {
    const newData = [...tableData];
    newData[rowIndex][field] = e.target.value;
    setTableData(newData);
  };  

  const handleSelect = (e, id) => {
    if (e.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const handleKeyDown = (e, rowIndex) => {
    if (e.key === "Enter") {
      handleUpdateAverageCost(tableData[rowIndex], tableData[rowIndex].id);
      // setEditingCell(null) ;
    }
  };

  const handleUpdateAverageCost = (formData, id) => {
    const { warehouse_number, slow_cost, fast_cost, air_cost } = formData;
    const payloadAverageCost = {
      warehouse_number: warehouse_number,
      slow_cost: slow_cost,
      fast_cost: fast_cost,
      air_cost: air_cost
    };
    updateAverageCost(
      {
        id: id,
        data: payloadAverageCost
      }, {
      onSuccess: () => {
        queryClient.invalidateQueries("FETCH_ALL_AVERAGE_COST_INFO");
        reset();
        setEditingCell(null);
        setIsAddWarehouse(false);
      },
      onError: (err) => {
        HandleErrorResponse(err);
      },
    });
  }

  const submitAverageCostForm = (formData) => {
    const { warehouse_number, slow_cost, fast_cost, air_cost } = formData;
    const payloadAverageCost = {
      warehouse_number: warehouse_number,
      slow_cost: slow_cost,
      fast_cost: fast_cost,
      air_cost: air_cost,
    }; 
    createAverageCost(payloadAverageCost, {
      onSuccess: () => {
        queryClient.invalidateQueries("FETCH_ALL_AVERAGE_COST_INFO");
        reset();
        setIsAddWarehouse(false);
        handleCloseModal();
        // HandleSuccessResponse({message: "Average Cost created successfully"});
      },
      onError: (err) => {
        HandleErrorResponse(err);
      },
    });
  }

  const handleDeleteMultipleWarehouse = () => {
    console.log("selectedIds", selectedIds);
    deleteMultipleAverageCost(selectedIds, {
      onSuccess: () => {
        queryClient.invalidateQueries("FETCH_ALL_AVERAGE_COST_INFO");
        HandleSuccessResponse({message: "Average Cost deleted successfully"});
        setSelectedIds([]);
        // setTableData(tableData.filter(row => !selectedIds.includes(row.id)));
        setTableData(prev => prev.filter(row => !selectedIds.includes(row.id)));
      },
      onError: (err) => {
        HandleErrorResponse(err);
      },
    });
  }

  const handleDeleteAverageCost = (id) => {
    deleteAverageCost(id, {
      onSuccess: () => {
        queryClient.invalidateQueries("FETCH_ALL_AVERAGE_COST_INFO");
        setOpenDeleteModal(false);
      },
      onError: (err) => {
        HandleErrorResponse(err);
      },
    });
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-[80vw] h-full">
            <Loader />  
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <HeaderPage
                title="Average Warehouse Costs"
                home="average-cost"
                pathname="Average Warehouse Costs"
            />
            {userRole === "Shipper" && (
              <div className="hidden md:block">
                {isAddWarehouse ? (
                  <form onSubmit={handleSubmit(submitAverageCostForm)} id="average-cost-form">
                    <div className="flex gap-2">
                      <Button className="bg-[#213E7B] text-white hover:bg-[#213E7B]/80 rounded-md" type="submit" form="average-cost-form">
                        Save
                      </Button>
                      <Button className="bg-primary text-white hover:bg-primary/80 rounded-md" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : selectedIds.length > 0 ? (
                  <Button className="bg-red-500 text-white hover:bg-red-500/80 rounded-md" onClick={handleDeleteMultipleWarehouse}>
                    Delete Warehouse
                  </Button>
                ) : (
                  <Button className="bg-primary text-white hover:bg-primary/80 rounded-md" onClick={handleAddWarehouse}>
                    Add Warehouse
                  </Button>
                )}
              </div>
            )}
          </div>
          {/* Desktop Version */}
          <div className="hidden md:flex flex-col gap-4 mt-6 w-full">
            <table className="table-auto bg-[#FFFFFF] border border-[#F0F1F3] w-full">
              <thead>
                <tr className="border border-[#F0F1F3] text-left">
                  {userRole === "Shipper" && (
                    <th className="px-[22px] py-[18px]">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === tableData.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds(tableData.map(row => row.id));
                          } else {
                            setSelectedIds([]);
                          }
                        }}
                      />
                    </th>
                  )}
                  <th className="px-[22px] py-[18px]">Warehouse</th>
                  <th className="px-[22px] py-[18px]">Slowce</th>
                  <th className="px-[22px] py-[18px]">Fastce</th>
                  <th className="px-[22px] py-[18px]">Airshipment</th>
                </tr>
              </thead>
              <tbody>
                {isAddWarehouse && (
                    <AddWarehouseRow register={register} errors={errors} />
                )}
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border border-[#F0F1F3]">
                    {userRole === "Shipper" && (
                      <>
                        {[
                          {field: "select", label: "Select"},
                          ].map((field) => (
                          <td key={field.field} className="px-[22px] py-[18px]">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(row.id)}
                              onChange={(e) => handleSelect(e, row.id)}
                            />
                          </td>
                        ))}
                      </>
                    )}
                    {[
                      {field: "warehouse_number", label: "Warehouse"},
                      {field: "slow_cost", label: "Slowce"},
                      {field: "fast_cost", label: "Fastce"},
                      {field: "air_cost", label: "Airshipment"}
                    ].map((field) => (
                      <td key={field.field} className={`px-[22px] py-[18px] max-w-[100px] ${editingCell?.rowIndex === rowIndex && editingCell?.field === field.field ? "border-b border-[#213E7B]" : ""}`}>
                        <div className="p-3">
                          {editingCell?.rowIndex === rowIndex &&
                          editingCell?.field === field.field ? (
                            <input
                              ref={inputRef}
                              type="text"
                              value={row[field.field]}
                              onChange={(e) => handleChange(e, rowIndex, field.field)}
                              onKeyDown={(e) => handleKeyDown(e, rowIndex)}
                              className="w-full outline-none bg-[#EDF0F4] rounded-[8px] p-3 transition-all duration-300"
                            />
                          ) : (
                            <span
                              className={`text-[#111827] ${userRole === "Shipper" ? "cursor-pointer" : "cursor-default"}`}
                              onClick={() => userRole === "Shipper" && handleEdit(rowIndex, field.field)}
                            >
                              {row[field.field]}
                            </span>
                          )}
                          </div>
                        </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile Version */}
          <div className="flex md:hidden flex-col gap-4 mt-6 w-full">
            {userRole === "Shipper" && (
              <Button className="bg-primary text-white hover:bg-primary/80 rounded-md" onClick={()=>setOpenModal(true)}>
                Add Warehouse
              </Button>
            )}
            <ModalComponent open={openDeleteModal} onClose={handleCloseDeleteModal} title="Delete Warehouse">
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-500">Are you sure you want to delete this warehouse {selectedRow.warehouse_number}?</p>
                <div className="flex flex-row gap-2">
                  <Button className="bg-primary text-white hover:bg-primary/80 rounded-md" onClick={() => handleDeleteAverageCost(selectedRow.id)}>
                    Delete
                  </Button>
                  <Button className="rounded-full border-2 border-primary" variant="outline" onClick={handleCloseDeleteModal}>Cancel</Button>
                </div>
              </div>
            </ModalComponent>
            <ModalComponent open={openModal} onClose={handleCloseModal} title="Add Warehouse">
              <form onSubmit={handleSubmit(submitAverageCostForm)} id="average-cost-form">
                <div className="grid grid-cols-1 gap-4 h-full w-full">
                  <div>
                    <input
                        placeholder="Enter Warehouse Number"
                        className="border border-solid border-[#00000050] outline-none w-full p-4 rounded-md"
                        {...register("warehouse_number")}
                    />
                    {errors.warehouse_number && (
                      <p className="text-red-500 text-xs mt-1">{errors.warehouse_number.message}</p>
                    )}
                  </div>
                  <div>
                      <input
                          placeholder="Enter Slowce"
                          className="border border-solid border-[#00000050] outline-none w-full p-4 rounded-md"
                          {...register("slow_cost")}
                      />
                      {errors.slow_cost && (
                        <p className="text-red-500 text-xs mt-1">{errors.slow_cost.message}</p>
                      )}
                  </div>
                  <div>
                      <input
                          placeholder="Enter Fastce"
                          className="border border-solid border-[#00000050] outline-none w-full p-4 rounded-md"
                          {...register("fast_cost")}
                      />
                      {errors.fast_cost && (
                        <p className="text-red-500 text-xs mt-1">{errors.fast_cost.message}</p>
                      )}
                  </div>
                  <div>
                      <input
                          placeholder="Enter Airshipment"
                          className="border border-solid border-[#00000050] outline-none w-full p-4 rounded-md"
                          {...register("air_cost")}
                      />
                      {errors.air_cost && (
                        <p className="text-red-500 text-xs mt-1">{errors.air_cost.message}</p>
                      )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-6 w-full h-['20ox']">
                    <Button className="bg-primary text-white hover:bg-primary/80 rounded-md" type="submit" form="average-cost-form">
                      Save
                    </Button>
                    <Button className="rounded-full border-2 border-primary" variant="outline" onClick={handleCloseModal}>Cancel</Button>
                </div>
              </form>
            </ModalComponent>
            {tableData.map((row, rowIndex) => (
              <>
                <Card className="px-4 border border-[#F2F2F2] rounded-[8px] shadow-none" key={rowIndex} 
                      onMouseDown={(e) => userRole === "Shipper" && handleMouseDown(e,row)}
                      onMouseUp={() => userRole === "Shipper" && handleMouseUp()}
                      onMouseLeave={() => userRole === "Shipper" && handleMouseLeave()}
                      onTouchStart={(e) => userRole === "Shipper" && handleMouseDown(e,row)}
                      onTouchEnd={() => userRole === "Shipper" && handleMouseUp()}
                      onTouchCancel={() => userRole === "Shipper" && handleMouseLeave()}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row border-b border-[#F0F1F3] px-[22px] py-[18px] justify-between items-center gap-2">
                            <p className="text-sm font-medium">Warehouse</p>
                            {editingCell?.rowIndex === rowIndex && editingCell?.field === "warehouse_number" ? (
                              <input
                                ref={inputRef}
                                type="text"
                                value={row.warehouse_number}
                                onChange={(e) => handleChange(e, rowIndex, "warehouse_number")}
                                onKeyDown={(e) => handleKeyDown(e, rowIndex)}
                                className="inline-block outline-none bg-[#EDF0F4] rounded-[8px] p-3 transition-all duration-300"
                              />
                            ) : (
                              <p className="text-sm text-gray-500" onClick={() => userRole === "Shipper" && handleEdit(rowIndex, "warehouse_number")}>{row.warehouse_number}</p>
                            )}
                        </div>
                        <div className="flex flex-row border-b border-[#F0F1F3] px-[22px] py-[18px] justify-between items-center gap-2">
                            <p className="text-sm font-medium">Slowce</p>
                            {editingCell?.rowIndex === rowIndex && editingCell?.field === "slow_cost" ? (
                              <input
                                ref={inputRef}
                                type="text"
                                value={row.slow_cost}
                                onChange={(e) => handleChange(e, rowIndex, "slow_cost")}
                                onKeyDown={(e) => handleKeyDown(e, rowIndex)}
                                className="inline-block outline-none bg-[#EDF0F4] rounded-[8px] p-3 transition-all duration-300"
                              />
                            ) : (
                              <p className="text-sm text-gray-500" onClick={() => userRole === "Shipper" && handleEdit(rowIndex, "slow_cost")}>{row.slow_cost}</p>
                            )}
                        </div>
                        <div className="flex flex-row border-b border-[#F0F1F3] px-[22px] py-[18px] justify-between items-center gap-2">
                            <p className="text-sm font-medium">Fastce</p>
                            {editingCell?.rowIndex === rowIndex && editingCell?.field === "fast_cost" ? (
                              <input
                                ref={inputRef}
                                type="text"
                                value={row.fast_cost}
                                onChange={(e) => handleChange(e, rowIndex, "fast_cost")}
                                onKeyDown={(e) => handleKeyDown(e, rowIndex)}
                                className="inline-block outline-none bg-[#EDF0F4] rounded-[8px] p-3 transition-all duration-300"
                              />
                            ) : (
                              <p className="text-sm text-gray-500" onClick={() => userRole === "Shipper" && handleEdit(rowIndex, "fast_cost")}>{row.fast_cost}</p>
                            )}
                        </div>
                        <div className="flex flex-row px-[22px] py-[18px] justify-between items-center gap-2">
                            <p className="text-sm font-medium">Airshipment</p>
                            {editingCell?.rowIndex === rowIndex && editingCell?.field === "air_cost" ? (
                              <input
                                ref={inputRef}
                                type="text"
                                value={row.air_cost}
                                onChange={(e) => handleChange(e, rowIndex, "air_cost")}
                                onKeyDown={(e) => handleKeyDown(e, rowIndex)}
                                className="inline-block outline-none bg-[#EDF0F4] rounded-[8px] p-3 transition-all duration-300"
                              />
                            ) : (
                              <p className="text-sm text-gray-500" onClick={() => userRole === "Shipper" && handleEdit(rowIndex, "air_cost")}>{row.air_cost}</p>
                            )}
                        </div>
                    </div>
                </Card>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
}
