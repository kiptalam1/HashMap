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
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    } 
    set(key, value) {
        let index = this.hash(key);

        if (!this.buckets[index]) {
            this.buckets[index] = []
        };

        this.buckets[index].push([key, value]);
    }
    get(key) {
        let index = this.hash(key);

        if (!this.buckets[index]) { 
            return null;
        }

        for (let bucket of this.buckets[index]) {
            if (bucket[0] === key) {
                return bucket[1];
            }
        }
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
                return true;
            }
        }
    }
}

let myMap = new HashMap()
myMap.set('name', 'Adams')
myMap.set('age', '24')

console.log(myMap.get('age'))
console.log(myMap.get('name'))
console.log(myMap.has('life'))
// console.log(myMap.remove('age'))



console.log(myMap.buckets)
