class HashSet {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
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

    resize() {
        const newCapacity = this.capacity * 2;
        const newBuckets = new Array(newCapacity);

        for (let bucket of this.buckets) {
            if (bucket) {
                for (let key of bucket) {
                    const newIndex = this.hash(key) % newCapacity;
                    if (!newBuckets[newIndex]) newBuckets[newIndex] = [];
                    newBuckets[newIndex].push(key);
                }
            }
        }

        this.buckets = newBuckets;
        this.capacity = newCapacity;
    }

    add(key) {
        if (this.size >= this.capacity * this.loadFactor) this.resize();
        const index = this.hash(key);

        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        for (let existingKey of this.buckets[index]) {
            if (existingKey === key) return; // Key already exists
        }

        this.buckets[index].push(key);
        this.size++;
    }

    has(key) {
        const index = this.hash(key);
        if (!this.buckets[index]) return false;

        for (let existingKey of this.buckets[index]) {
            if (existingKey === key) return true;
        }

        return false;
    }

    remove(key) {
        const index = this.hash(key);

        if (!this.buckets[index]) return false;

        for (let [i, existingKey] of this.buckets[index].entries()) {
            if (existingKey === key) {
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
        const allKeys = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                allKeys.push(...bucket);
            }
        }
        return allKeys;
    }
}

