
    import { NotFoundException } from '@nestjs/common';

    export class PositionNotFoundException extends NotFoundException {
      constructor() {
        super(PositionNotFoundException.getMessage());
      }
      static getMessage() {
        return 'Position was not found in database';
      }
    }
    