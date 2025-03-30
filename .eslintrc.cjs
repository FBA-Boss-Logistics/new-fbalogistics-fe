// eslint-disable-next-line no-undef
module.exports = {
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
    ],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: {
        react: {
            version: "detect",
        },
        "import/resolver": {
            node: {
                paths: ["./src"],
                extensions: [".js", ".jsx"],
            },
        },
    },
    plugins: ["react-refresh", "import"],
    rules: {
        "react-refresh/only-export-components": "off",
        "react/prop-types": "off",
        "react/display-name": "off",
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                js: "never",
                jsx: "never",
            },
        ],
        "import/no-unresolved": "error",
        "react/jsx-filename-extension": [
            "error",
            { extensions: [".jsx", ".js"] },
        ],
    },
};
