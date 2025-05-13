export class LeakyBucket {
    private capacity: number;
    private leakRate: number;
    private tokens: number;
    private lastChecked: number;

    constructor(capacity: number, leakRate: number) {
        this.capacity = capacity;
        this.leakRate = leakRate;
        this.tokens = 0;
        this.lastChecked = Date.now();
    }

    public leak(): void {    
        const now = Date.now();
        const elapsed = (now - this.lastChecked) / 3600000; // Convert milliseconds to hours
        
        const leakedTokens = Math.floor(elapsed) * this.leakRate;

        this.tokens = Math.max(0, this.tokens - leakedTokens)
        
        this.lastChecked = now;    
    }
    public isFull(): boolean {
        return this.tokens >= this.capacity;
    }
    public addToken(): boolean {
        if (!this.isFull()) {
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