module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "browser": true,
        "jest": true,
        "cypress/globals": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:jsx-a11y/recommended",
        "prettier",
        "plugin:jest-dom/recommended",
        "plugin:testing-library/react",
        "plugin:cypress/recommended",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    plugins: ["react", "react-hooks", "import", "jsx-a11y", "prettier", "jest-dom", "testing-library", "cypress"],
    "rules": {
        "strict": 0,
        "max-len": [2, 120, 4],
        "indent": ["error", 4],
        "comma-dangle": [
            "error",
            {
                arrays: "only-multiline",
                objects: "only-multiline",
                imports: "only-multiline",
                exports: "only-multiline",
                functions: "never",
            },
        ],
        "testing-library/await-async-utils": 0,
        "cypress/no-unnecessary-waiting": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "no-console": ["error", { allow: ["warn", "error"] }],
        "react/react-in-jsx-scope": 0,
        "testing-library/prefer-screen-queries": 0,
        "testing-library/no-container": 0,
        "testing-library/no-node-access": 0,
        "no-nested-ternary": 2,
        "react/prop-types": 2,
        "import/no-extraneous-dependencies": 0,
        "react/require-default-props": 0,
        "react/default-props-match-prop-types": 2,
        "no-unused-vars": 2,
        "semi": ["error", "always"],
        "react/jsx-one-expression-per-line": 0,
        "jsx-a11y/no-static-element-interactions": 2,
        "jsx-a11y/label-has-for": [
            2,
            {
                components: ["Label"],
                required: {
                    every: ["nesting", "id"],
                },
                allowChildren: false,
            },
        ],
    }
};
  