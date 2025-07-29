import { Button } from "@mui/material";

export default function AddWarehouseRow({ register, errors }) {
  return (
    <tr>
      <td></td>
      <td className="px-[22px] py-[18px] max-w-[100px]">
        <input
          type="text"
          className="w-full outline-none bg-[#EDF0F4] rounded-[8px] p-3"
          placeholder="Enter Warehouse Number"
          {...register("warehouse_number")}
        />
        {errors.warehouse_number && (
          <p className="text-red-500 text-xs mt-1">{errors.warehouse_number.message}</p>
        )}
      </td>
      <td className="px-[22px] py-[18px] max-w-[100px]">
        <input
          type="number"
          className="w-full outline-none bg-[#EDF0F4] rounded-[8px] p-3"
          placeholder="Enter Slowce"
          {...register("slow_cost")}
        />
        {errors.slow_cost && (
          <p className="text-red-500 text-xs mt-1">{errors.slow_cost.message}</p>
        )}
      </td>
      <td className="px-[22px] py-[18px] max-w-[100px]">
        <input
          type="number"
          className="w-full outline-none bg-[#EDF0F4] rounded-[8px] p-3"
          placeholder="Enter Fastce"
          {...register("fast_cost")}
        />
        {errors.fast_cost && (
          <p className="text-red-500 text-xs mt-1">{errors.fast_cost.message}</p>
        )}
      </td>
      <td className="px-[22px] py-[18px] max-w-[100px]">
        <input
          type="number"
          className="w-full outline-none bg-[#EDF0F4] rounded-[8px] p-3"
          placeholder="Enter Airshipment"
          {...register("air_cost")}
        />
        {errors.air_cost && (
          <p className="text-red-500 text-xs mt-1">{errors.air_cost.message}</p>
        )}
      </td>
    </tr>
  );
}
