import { Model } from 'sequelize-typescript';

export const COLUMN_DEFAULT = 'default';

export function ColumnsDefault(model: typeof Model): string[] {
  return Object.keys(model.rawAttributes).filter((k: string) => {
    return ![
      'created_at',
      'updated_at',
      'deleted_at',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ].includes(k);
  });
}

export function UpdateEntity<Model>(entity: Model, change: any): Model {
  ColumnsDefault((entity as any).getModalType())
    .filter((k) => k !== 'id')
    .forEach((k) => {
      if (change[k] !== undefined && entity[k] !== change[k])
        entity[k] = change[k];
    });
  return entity;
}
