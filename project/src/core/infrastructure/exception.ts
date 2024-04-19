
  import { InfrastructureDefaultExceptionCode } from './constants';

  export abstract class InfrastructureException extends Error {
    code: string;
  
    constructor(message?: string) {
      super(message);
      this.code = InfrastructureDefaultExceptionCode.Default;
    }
  }  
  