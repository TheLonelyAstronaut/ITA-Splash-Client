function toJSON(this: Map<never, unknown>): Record<string, unknown> {
    const object: Record<string, unknown> = {};
    this.forEach((value, key) => (object[key] = value));
    return object;
}

Object.defineProperty(Map.prototype, 'toJSON', {
    value: toJSON,
    writable: true,
    configurable: true,
});

export default class ExtendedMap<K, T> {
    readonly storage: Map<K, T>;

    constructor(map?: Map<K, T>) {
        if (map) {
            this.storage = map;
        } else {
            this.storage = new Map<K, T>();
        }
    }

    public insert = (key: K, data: T): this => {
        this.storage.set(key, data);
        return this;
    };

    public remove = (key: K): void => {
        this.storage.delete(key);
    };

    public get = (key: K): T | undefined => {
        return this.storage.get(key);
    };

    public copy = (): ExtendedMap<K, T> => {
        const newStorage = new Map<K, T>(this.storage);
        return new ExtendedMap<K, T>(newStorage);
    };
}
