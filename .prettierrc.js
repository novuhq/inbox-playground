module.exports = {
  printWidth: 100,
  trailingComma: "all",
  importOrder: [
    "^(next)|(next/(.*))$",
    "^(react)|(react/(.*))$",
    "<THIRD_PARTY_MODULES>",
    "^@/components/(.*)$",
    "^@/types/(.*)$",
    "^@/lib/(.*)$",
    "^@/styles/(.*)$",
    "^@/images/(.*)$",
    "^@/svgs/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
