const { getNames } = require('../helpers');

const commandGenerator = (entity, method) => {
  const names = getNames(entity)

  let content = '';

  // headers
  let imports = `
  import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
  import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

  import { ${names.uperFL}Entity } from '../../../domain/entities/${names.name}.entity';
  import { ${names.uperFL}CommandsRepository } from '../../../domain/repositories/${names.fileName}.repository';
  import { ${names.uperFL}CommandsImplement } from '../../../infrastructure/repositories/${names.fileName}';
  import { ${method.action}${names.uperFL}ResponseDTO } from '../../../interfaces/http/v1/add-user/dto/add-user.response';
  import { List${names.uperFL}sResponseDTO } from '../../../interfaces/http/v1/list-users/dto/list-users.response';
  `;
  content = content.concat(imports);

  // body
  let exportClassCommandBegin = `
  export class ${method.action}${names.uperFL}Command {
    constructor(`
  content = content.concat(exportClassCommandBegin);
  entity.attributes.map((attribute) => {
    const attributeName = attribute.name;
    const attributeType = attribute.type;
    let type = '';

    if (attributeType == 'varchar') {
      type = 'string'
    }
    if (attributeType == 'float' || attributeType == 'int') {
      type = 'number'
    }

    const readOnlyAttribute = `
      readonly ${attributeName}: ${type},`
    content = content.concat(readOnlyAttribute);
  })
  const exportClassCommandEnding = `
    ) {}
  }
  `
  content = content.concat(exportClassCommandEnding);

  const commandHandler = `
  @CommandHandler(${method.action}${names.uperFL}Command)
  export class ${method.action}${names.uperFL}Handler
    implements ICommandHandler<${method.action}${names.uperFL}Command, ${method.action}${names.uperFL}ResponseDTO>
  {
    constructor(
      @Inject(${names.uperFL}CommandsImplement)
      private readonly ${names.name}Repository: ${names.uperFL}CommandsRepository,
      private readonly logger: Logger,
    ) {}
  
    async execute(command: ${method.action}${names.uperFL}Command): Promise<${method.action}${names.uperFL}ResponseDTO> {
      const userEntity = new UserEntity(
        0,
        command.userName,
        command.userLastName,
        command.userEmail,
      );
      const result = await this.userRepository.addUser(userEntity);
      if (result.isErr()) {
        this.logger.warn(result.error, 'AddUserHandler.execute');
        throw new InternalServerErrorException(
          result.error.message,
          result.error.code,
        );
      }
  
      const data = result.value;
  
      return new AddUserResponseDTO(
        true,
        new ListUsersResponseDTO(
          data.userCode,
          data.userName,
          data.userLastName,
          data.userEmail,
        ),
      );
    }
  }  
  `
  content = content.concat(commandHandler);

  // footer

  return content;
}

module.exports = { commandGenerator };
