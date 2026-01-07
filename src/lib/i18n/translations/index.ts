import { id } from './id';
import { en } from './en';

// Create a flexible type based on the structure, not literal values
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : string;
};

export type TranslationKeys = DeepReadonly<typeof id>;

export { id, en };
