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
  exceptionMissingFields: string[] | string;

  constructor(
    exceptionType: exceptionType,
    entityName = '',
    exceptionText = '',
    exceptionMissingFields = [],
  ) {
    this.exceptionType = exceptionType;
    this.entityName = entityName;
    this.exceptionText = exceptionText;
    this.exceptionMissingFields = this.normalizeMissingFieldsText(
      exceptionMissingFields,
    );
    this.generateException();
  }

  normalizeMissingFieldsText(exceptionMissingFields: string[]) {
    const nonEmptyFields = exceptionMissingFields.filter((field) => {
      field.trim();
      return field !== '';
    });
    if (nonEmptyFields.length < 2) {
      this.exceptionMissingFields = nonEmptyFields.join('');
      return this.exceptionMissingFields;
    }
    this.exceptionMissingFields = nonEmptyFields.join(', ');
    return this.exceptionMissingFields;
  }

  generateException() {
    switch (this.exceptionType) {
      case NOT_FOUND:
        throw new NotFoundException(
          `${capitalizeFirstLetter(this.entityName)} not found`,
        );
      case FORBIDDEN:
        throw new ForbiddenException(`${this.exceptionText}`);
      case BAD_REQUEST:
        throw new BadRequestException(
          `Bad request, ${this.exceptionText} ${this.exceptionMissingFields}`,
        );
      default:
        return;
    }
  }
}

export { Exception, NOT_FOUND, FORBIDDEN, BAD_REQUEST };
