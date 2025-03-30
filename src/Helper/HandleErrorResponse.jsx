export default function handleErrorResponse(response, setError) {
    
    if (response.errors) {
        response.errors.forEach((error) => {
            const field = error.field;
            const message = error.message;
            if (field && message) {
                setError(field, {
                    message: message,
                });
            } else {
                console.log("Unknown error occurred.");
            }
        });
    } else {
        console.log("Unknown error response.");
    }
}
