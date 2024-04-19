const prettierrcGenerator = (ffobject) => {
  ffobject.content = `{
  "singleQuote": true,
  "trailingComma": "all"
}
`;
};

module.exports = { prettierrcGenerator };