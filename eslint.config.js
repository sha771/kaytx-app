const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const globals = require('globals');

module.exports = defineConfig([
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.expo/**",
      "**/.next/**",
      "**/out/**",
      "**/*.min.js",
      "**/*.bundle.js",
      "**/*.d.ts",
      "android/**",
      "ios/**",
      "web-build/**",
      "coverage/**",
      "scripts/systemd/**",
      "**/__generated__/**",
      "**/.cache/**",
      "**/eslint-report.json",
      "**/lint_output.txt",
      "**/tsconfig_errors.txt",
      "tests/**",
      "**/__tests__/**",
      "backend/__tests__/**",
      "backend/__tests__unit/**",
      "backend/tests/**",
      "backend/config/**",
      "backend/lib/config.ts",
      "backend/lib/env-validation.ts",
      "backend/trpc/routes/**",
      "examples/**",
      "scripts/**",
      "load-tests*.js",
      "run.js",
      "**/_expo/**",
      "**/.expo-shared/**"
    ]
  },
  expoConfig,
  {
    files: ["webpack.config.js", "eslint.config.js", "babel.config.js", "metro.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        __dirname: "readonly",
        require: "readonly",
        module: "readonly",
      },
    },
  },
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "backend/db/schema",
                "backend/db/schema.ts",
                "db/schema",
                "db/schema.ts",
                "**/db/schema",
                "**/db/schema.ts",
              ],
              message: "Use backend/db/drizzle-schema.ts as the database schema source of truth.",
            },
          ],
        },
      ],
      // Suppress non-critical warnings
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/array-type": "off",
      "expo/no-dynamic-env-var": "off",
      // Disable import rules that require unrs-resolver (native binding issue)
      "import/namespace": "off",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
      "import/default": "off",
      "import/named": "off",
      "import/no-unresolved": "off",
      "import/no-duplicates": "off",
      "import/export": "off",
    },
  }
]);
