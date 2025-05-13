import { LeakyBucket } from "./bucket";

class BucketsHolder extends Map<string, LeakyBucket> {
    private static instance: BucketsHolder;

    private constructor() {
        super();
    }

    public static getInstance(): BucketsHolder {
        if (!BucketsHolder.instance) {
            BucketsHolder.instance = new BucketsHolder();
        }
        return BucketsHolder.instance;
    }
    public leakBuckets(): void {
        for (const bucket of this.values()) {
           bucket.leak();
        }
    }
    override get(key: string): LeakyBucket | undefined {
        let bucket = super.get(key);
        if(!bucket) {
            bucket = new LeakyBucket(10, 1); 
            this.set(key, bucket);
            return bucket;
        }        
        return bucket;
    }
    override set(key: string, value: LeakyBucket): this {
        if (this.has(key)) {
            throw new Error(`Bucket with key ${key} already exists.`);
        }
        return super.set(key, value);
    }
}

export default BucketsHolder;