import { useToast } from "hooks";
export default function HandleErrorResponse(response, setError) {
    const responseToast = useToast();
    responseToast.toastError(response?.message || "error");

    if (response.errors) {
        response.errors.forEach((error) => {
            const field = error.field;
            const message = error.message;
            if (field && message) {
                responseToast.toastError(message);
                setError(field, {
                    message: message,
                });
            } else {
                responseToast.toastError(message);
            }
        });
    } else {
        console.log("Unknown error response.");
    }
}
