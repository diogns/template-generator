const tsconfigbuildGenerator = (ffobject) => {
  ffobject.content = `{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
}
`;
};

module.exports = { tsconfigbuildGenerator };