import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly name: string;
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
}
