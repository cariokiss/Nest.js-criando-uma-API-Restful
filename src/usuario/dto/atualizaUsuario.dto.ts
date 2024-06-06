import { CriaUsuarioDto } from './criaUsuario.dto';
import { PartialType } from '@nestjs/mapped-types';

// Aplica o decorator @IsOptional em todas as propriedades do CriaUsuarioDto
export class AtualizaUsuarioDto extends PartialType(CriaUsuarioDto) {}
