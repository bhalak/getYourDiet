export enum ProductAtionFlags {
  Add,
  Edit,
  Delete,
}

export type ProductActionFag =
  | ProductAtionFlags.Add
  | ProductAtionFlags.Delete
  | ProductAtionFlags.Edit;
