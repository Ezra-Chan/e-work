import { Validate } from 'class-validator';

export const UniqueValidator = (entity: any, field: string) => {
  return Validate((value: any) => {
    return entity.findOne({ [field]: value }).then((result: any) => {
      if (result) {
        return false;
      }
      return true;
    });
  });
};
