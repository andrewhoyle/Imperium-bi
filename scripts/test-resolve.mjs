// Lets `node --test` run the TypeScript sources as they are: Node strips the types,
// and this resolves the extensionless relative imports the bundler allows.
import { registerHooks } from "node:module";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (/^\.\.?\//.test(specifier) && !/\.[cm]?[jt]sx?$/.test(specifier)) {
      try {
        return nextResolve(`${specifier}.ts`, context);
      } catch {
        // Not a TypeScript module: resolve it as written.
      }
    }
    return nextResolve(specifier, context);
  },
});
