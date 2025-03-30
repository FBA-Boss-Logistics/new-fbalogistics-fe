import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { pageDetails, commonDescription } from "routes/RouteConstants";

const Seo = () => {
    const { pathname } = useLocation();

    const currentPageDetails = useMemo(() => pageDetails(pathname), [pathname]);
    return (
        <div>
            <Helmet>
                <title>
                    {currentPageDetails?.title
                        ? `${currentPageDetails.title} | `
                        : ""}
                    FBA-Boss
                </title>
                <meta
                    name="description"
                    content={
                        currentPageDetails?.description || commonDescription
                    }
                />
            </Helmet>
        </div>
    );
};

export default Seo;
