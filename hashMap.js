class HashMap {
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
    resize() {
        const newCapacity = this.capacity * 2;
        const newBuckets = new Array(newCapacity);

        for (let bucket of this.buckets) {
            if (bucket) {
                for (let [key, value] of bucket) {
                    let newIndex = this.hash(key) % newCapacity;
                    if (!newBuckets[newIndex]) newBuckets[newIndex] = [];
                    newBuckets[newIndex].push([key, value]);
                }
            }
        }
        this.buckets = newBuckets;
        this.capacity = newCapacity;
    }
    set(key, value) {
        if (this.size >= this.capacity * this.loadFactor) this.resize();
        let index = this.hash(key);

        if (!this.buckets[index]) {
            this.buckets[index] = []
        };

        this.buckets[index].push([key, value]);
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
        if(!this.buckets[index]) {
            return false;
        } else {
            return true;
        }
    }
    remove(key) {
        let index = this.hash(key);

        if (!this.buckets[index]) {
            return false;
        }
        for (let [i, bucket] of this.buckets[index].entries()) {
            if (bucket[0] === key) {
                this.buckets[index].splice(i, 1);
                this.size--;
                return true;
            }
        }
    }
    length() {
        return this.size;
    }
}

let myMap = new HashMap()
myMap.set('name', 'Adams')
myMap.set('age', '24')

console.log(myMap.get('age'))
console.log(myMap.get('name'))
console.log(myMap.has('life'))
// console.log(myMap.remove('age'))



console.log(myMap.size)
console.log(myMap.buckets)

