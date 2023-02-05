import {
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { capitalizeFirstLetter } from './stringUtils';

enum exceptionType {
  NOT_FOUND = 'notFound',
  FORBIDDEN = 'forbidden',
  BAD_REQUEST = 'badRequest',
}

const { NOT_FOUND, FORBIDDEN, BAD_REQUEST } = exceptionType;

class Exception {
  exceptionType: exceptionType;
  entityName: string;
  exceptionText: string;

  constructor(
    exceptionType: exceptionType,
    entityName = '',
    exceptionText = '',
  ) {
    this.exceptionType = exceptionType;
    this.entityName = entityName;
    this.exceptionText = exceptionText;
    this.generateException();
  }

  generateException() {
    switch (this.exceptionType) {
      case NOT_FOUND:
        throw new NotFoundException(
          `${capitalizeFirstLetter(this.entityName)} with such ID not found`,
        );
      case FORBIDDEN:
        throw new ForbiddenException(this.exceptionText);
      case BAD_REQUEST:
        throw new BadRequestException(`Bad request, ${this.exceptionText}`);
      default:
        return;
    }
  }
}

export { Exception, NOT_FOUND, FORBIDDEN, BAD_REQUEST };
