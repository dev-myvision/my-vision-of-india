import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Pages link with plain <a> on purpose: a full load lets the home page's scripts
      // (public/js) start fresh, which client-side navigation would not do.
      "@next/next/no-html-link-for-pages": "off",
      // Images are prepared as WebP at fixed sizes in public/images, with srcset where needed.
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Static scripts served as they are (the ported home page and three.js).
    "public/**",
  ]),
]);

export default eslintConfig;
