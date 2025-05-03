
import { useState, useEffect, useRef } from "react"
import sampleShipment from "assets/svg/sampleShipmentModalIcon.svg"
import { LabelledTextField } from 'components';
import { Button, Grid, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CommonFormValidations } from "components/Form/CommonFormValidations";
import { usePostSampleShipmentDetail } from "queries/Seller";
import { useQueryClient } from "@tanstack/react-query";
import { useSeller } from "pages/Seller/Context/SellerContext";

const { productName, quantity, address } = CommonFormValidations;
const SampleShipmentFormSchema = yup.object().shape({
    productName,
    quantity,
    address,
});

export default function CreateSampleShipment({isOpen, onClose}) {
  const [isMobile, setIsMobile] = useState(false)
  const dialogRef = useRef(null)
  const {setCreateSampleShipment} = useSeller();

  // Detect mobile screen
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target) && isOpen) {
        handleClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])


  const queryClient = useQueryClient();
  const {
      register,
      handleSubmit,
      formState: { errors, isValid },
  } = useForm({
      resolver: yupResolver(SampleShipmentFormSchema),
      mode: "onChange",
  });
  const { ref: refProductName, ...ProductName } = register("productName");
  const { ref: refQuantity, ...Quantity } = register("quantity");
  const { ref: refAddress, ...Address } = register("address");

  const { mutate: postSampleShipmentDetail } = usePostSampleShipmentDetail();

  const submitHandler = (formData) => {
      const { productName, quantity, address } = formData;
      const data = {
          product_name: productName,
          quantity,
          address,
      };

      postSampleShipmentDetail(data, {
          onSuccess: () => {
              queryClient.invalidateQueries("FETCH_SAMPLE_SHIPMENTS");
              handleClose();
          },
      });
  };
  const submitHandlerError = (formData) => {
      console.log("form error :", formData);
  };
  const handleClose = () => {
    setCreateSampleShipment(false);
};
  return (
    <>

      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" />}

      {isOpen && (
        <div
          className={`fixed z-50 inset-x-0   bottom-0 ${isMobile ? "animate-slide-up" : "animate-fade-in"} md:inset-0 md:flex md:items-center md:justify-center `}
        >
          <div
            ref={dialogRef}
          
            className={`bg-white rounded-lg shadow-xl w-full rounded-t-xl max-h-[90vh] overflow-auto md:max-w-xl md:w-full md:mx-3`}
          >
            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">   
                    <img src={sampleShipment} alt="logo" className="w-10 h-10" />
                    <h2 className="text-mdb md:text-xl font-semibold text-gray-900">Sample Shipment</h2>
                </div>
                <button onClick={() => handleClose()} className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
           
            </div>
            
                   {/* Content */}
            <div className="p-6">
                 <form
                            onSubmit={handleSubmit(
                                submitHandler,
                                submitHandlerError
                            )}
                        >
                            <Grid item className="flex flex-col gap-6">
                              <Grid item className="flex flex-col md:flex-row gap-6  md:gap-2 w-full">
                                <Grid item className="w-full ">
                                    <LabelledTextField
                                        label={
                                            <Typography className="text-natural-900 font-normal">
                                                Product Name
                                                <span className="text-error-500">
                                                    *
                                                </span>
                                            </Typography>
                                        }
                                        placeholder="Enter product name"
                                        className="dark-placeholder !h-[60px]"
                                        inputRef={refProductName}
                                        maxLength={50}
                                        {...ProductName}
                                        error={Boolean(errors.productName)}
                                        helperText={
                                            errors.productName &&
                                            errors.productName.message
                                        }
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item className="w-full ">
                                    <LabelledTextField
                                        label={
                                            <Typography className="text-natural-900 font-normal">
                                                Amount of samples
                                                <span className="text-error-500">
                                                    *
                                                </span>
                                            </Typography>
                                        }
                                        placeholder="Enter quantity"
                                        className="dark-placeholder !h-[60px]"
                                        inputRef={refQuantity}
                                        maxLength={5}
                                        {...Quantity}
                                        error={Boolean(errors.quantity)}
                                        helperText={
                                            errors.quantity &&
                                            errors.quantity.message
                                        }
                                        fullWidth
                                    />
                                </Grid>
                              </Grid>
                                <Grid item>
                                    <LabelledTextField
                                        label={
                                            <Typography className="text-natural-00 font-normal">
                                                Sample delivery address
                                                <span className="text-error-500">
                                                    *
                                                </span>
                                            </Typography>
                                        }
                                        placeholder="Enter address"
                                        className="dark-placeholder !h-[60px]"
                                        inputRef={refAddress}
                                        maxLength={100}
                                        {...Address}
                                        error={Boolean(errors.address)}
                                        helperText={
                                            errors.address &&
                                            errors.address.message
                                        }
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item className="w-full md:w-1/2 md:ml-auto">
                                    <Button
                                        type="submit"
                                        fullWidth
                                        className="!h-[33px] !mt-4 bg-primary hover:bg-primary text-white"
                                        disabled={!isValid}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
