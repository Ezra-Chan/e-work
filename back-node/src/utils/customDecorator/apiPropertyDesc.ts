import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

/**
 *
 * @param {object} descs 对实体类字段的描述
 * @returns {PropertyDecorator}
 */
export const ApiPropertyDesc =
  (descs: object, options?: ApiPropertyOptions): PropertyDecorator =>
  (target: any, key: string) =>
    ApiProperty({ ...options, description: descs[key] ?? '' })(target, key);
