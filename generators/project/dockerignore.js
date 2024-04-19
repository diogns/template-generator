const dockerignoreGenerator = (ffobject) => {
  ffobject.content = `node_modules
test
infra
dist
`;
};

module.exports = { dockerignoreGenerator };