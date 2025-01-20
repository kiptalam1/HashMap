export class HashMap {
    constructor (initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.buckets = new Array(initialCapacity);
        this.size = 0;
    }
    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % this.capacity;
    } 
    set(key, value) {
        if (this.size >= this.capacity * this.loadFactor) this.resize();
        let index = this.hash(key);

        if (!this.buckets[index]) this.buckets[index] = [];

        for (let entry of this.buckets[index]) {
            if (entry[0] === key) {
                entry[1] = value; //update value
                return;
            }
        }
        this.buckets[index].push([key, value]); // add new entry
        this.size++;
    }
    get(key) {
        let index = this.hash(key);

        if (!this.buckets[index]) { 
            return null;
        }

        for (let [storedKey, storedValue] of this.buckets[index]) {
            if (storedKey === key) {
                return storedValue;
            }
        }
        return null;
    }
    has(key) {
        let index = this.hash(key);
        if(!this.buckets[index]) return false;
            
        for (let [storedKey] of this.buckets[index]) {
            if (storedKey === key) return true;
        }
        return false;
    }
    remove(key) {
        let index = this.hash(key);

        if (!this.buckets[index]) return false;

        for (let [i, bucket] of this.buckets[index].entries()) {
            if (bucket[0] === key) {
                this.buckets[index].splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }
    length() {
        return this.size;
    }
    clear() {
        this.buckets = new Array(this.capacity);
        this.size = 0;
    }
    keys() {
        let storedKeys = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                for (let [key] of bucket) {
                    storedKeys.push(key);
                }
            }
        }
        return storedKeys;
    }
    values() {
        let storedValues = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                for (let [_, value] of bucket) {
                    storedValues.push(value);
                }
            }
        }
        return storedValues;
    }
    entries() {
        let allEntries = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                for (let [key, value] of bucket) {
                    allEntries.push([key, value]);
                }
            }
        }
        return allEntries;
    }
    resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity);
        this.size = 0;
        for (let bucket of oldBuckets) {
            if (bucket) {
                for (let [key, value] of bucket) {
                    this.set(key, value);
                }
            }
        }
    }
}
