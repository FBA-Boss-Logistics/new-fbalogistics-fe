import { Button } from "@mui/material";
import styles from "./index.module.css";
const BorderButton = ({
    children = "contained",
    variant = "contained",
    containerClass,
    ...rest
}) => {
    return (
        <>
            <div
                className={`${styles["btn-border-comp"]} hover:border-primary-500 cursor-pointer ${containerClass}`}
            >
                <Button fullWidth={true} variant={variant} {...rest} >
                    {children}
                </Button>
            </div>
        </>
    );
};
export default BorderButton;