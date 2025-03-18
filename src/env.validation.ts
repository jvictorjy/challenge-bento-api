import {
  plainToInstance,
  Transform,
  TransformFnParams,
} from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, validateSync } from 'class-validator';

const transform = {
  toInt: ({ value }: TransformFnParams) => parseInt(value),
};

export class EnvironmentVariables {
  @IsNotEmpty()
  @Transform(transform.toInt)
  @IsInt()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  USER_TOKEN_SECRET: string;

  @IsNotEmpty()
  @IsString()
  API_DELIVERY_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: false,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
