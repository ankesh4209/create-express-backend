module.exports = [
  {
    // Files to ignore
    ignores: ["node_modules/**", "logs/**", "coverage/**", "dist/**"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        // Node.js globals
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        console: "readonly",
        Buffer: "readonly",
        // Common globals
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
      },
    },
    rules: {
      // Possible Errors
      "no-undef": "error",
      "no-constant-condition": "warn",
      "no-dupe-args": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-extra-semi": "error",
      "no-func-assign": "error",
      "no-unreachable": "error",

      // Best Practices
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-else-return": "warn",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-self-assign": "error",
      "no-unused-expressions": "error",

      // Variables
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-use-before-define": ["error", { functions: false }],

      // Stylistic Issues
      semi: ["error", "always"],
      quotes: ["error", "double", { avoidEscape: true }],
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "comma-dangle": ["error", "always-multiline"],
    },
  },
];
