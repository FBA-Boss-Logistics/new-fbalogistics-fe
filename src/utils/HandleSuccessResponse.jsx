import { useToast } from "hooks";
export default function HandleSuccessResponse(response) {
    const responseToast = useToast();
    responseToast.toastSuccess(
        response?.message || "Details updated successfully"
    );

    // if (response.errors) {
    //     response.errors.forEach((error) => {
    //         const field = error.field;
    //         const message = error.message;
    //         if (field && message) {
    //             responseToast.toastSuccess(message);
    //             setError(field, {
    //                 message: message,
    //             });
    //         } else {
    //             console.log("Unknown error occurred.");
    //         }
    //     });
    // } else {
    //     console.log("Unknown error response.");
    // }
}
