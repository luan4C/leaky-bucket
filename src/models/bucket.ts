export class LeakyBucket {
    private capacity: number;
    private leakRate: number;
    private tokens: number;
    private lastChecked: number;

    constructor(capacity: number, leakRate: number) {
        this.capacity = capacity;
        this.leakRate = leakRate;
        this.tokens = capacity;
        this.lastChecked = Date.now();
    }

    public leak(): boolean {
        if(this.tokens ==0)
            return false;   
        const now = Date.now();
        const elapsed = (now - this.lastChecked) / 1000;
        const leakedTokens = elapsed * this.leakRate;

        this.tokens = Math.max(0, this.tokens - leakedTokens);
        this.lastChecked = now;
        return true;
    }
    public isFull(): boolean {
        return this.tokens == 0;
    }
    public refill(): boolean {
        if (this.tokens < this.capacity) {
            this.tokens++;
            this.lastChecked = Date.now();
            return true; 
        }

        return false; 
    }
    public getLastChecked(): number {  
        return this.lastChecked;
    }
    public getLeakRate(): number {  
        return this.leakRate;
    }
    public getAvailableTokens(): number {
        this.leak();
        return this.tokens;
    }
}