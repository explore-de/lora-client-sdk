export type KeyValue<T extends string | number | boolean> = {
    key: string;
    value: T;
};
export type KeyValueScalar = {
    key: string;
    value: string | number | boolean;
};
