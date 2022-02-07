export type IStorage = {
  enable_sites: string;
};

export const is_IStorage = (arg: unknown): arg is IStorage =>
    typeof arg === "object" &&
    arg !== null &&
    typeof (arg as IStorage).enable_sites === "string";
