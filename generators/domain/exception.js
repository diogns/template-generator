const { getNames } = require('../helpers');

const exceptionGenerator = (entity) => {
    const names = getNames(entity)

    const content = `
    import { NotFoundException } from '@nestjs/common';

    export class ${names.uperFL}NotFoundException extends NotFoundException {
      constructor() {
        super(${names.uperFL}NotFoundException.getMessage());
      }
      static getMessage() {
        return '${names.uperFL} was not found in database';
      }
    }
    `   
    return content;
}

module.exports = { exceptionGenerator };
