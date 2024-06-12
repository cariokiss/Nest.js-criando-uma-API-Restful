import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UsuarioRepository } from '../usuario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint()
export class EmailEUnicoValidator implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const usuarioComEmailExiste =
      await this.usuarioRepository.existeComEmail(value);
    return !usuarioComEmailExiste;
  }
}

export const EmailEUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailEUnicoValidator,
    });
  };
};
