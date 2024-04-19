const nestcliGenerator = (ffobject) => {
  ffobject.content = `{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}  
`;
};

module.exports = { nestcliGenerator };