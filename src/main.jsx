import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "components/Dashboard/OrderStatus/Chat/ChatContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChatProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChatProvider>
    </React.StrictMode>
);
