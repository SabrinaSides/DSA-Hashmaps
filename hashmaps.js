class HashMap {
    constructor(initialCapacity=8){
        this.length = 0
        this._hashTable = []
        this._capacity = initialCapacity
        this._deleted = 0
    }

    //function that takes a string and hashes it (djb2 algorithm)
    static _hashString(string){
        let hash = 5381
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        return hash >>> 0;
    }

    get(key){
        const index = this._findSlot(key)
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }
        return this._hashTable[index].value;
    }

    //O(1) best and O(n) if collision takes place
    set(key, value){
        //checks whether the load ratio is greater than the given max
        const loadRatio = (this.length + this._deleted + 1) / this._capacity
        if(loadRatio > HashMap.MAX_LOAD_RATIO){
            //resizes if necessary
            this._resize(this._capacity * HashMap.SIZE_RATIO)
        }

        //find the slot where this key should be
        const index= this._findSlot(key)

        if(!this._hashTable[index]){
            this.length++;
        }
        //after finding the appropriate slot, adds an object to the array and increases length
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        }; 
    }

    //add to _deleted count
    //deleted property changed to true
    //decrease the length of the hashtable
    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }

    //used to find the correct slot for a given key
    //_hashString function helps calculate the hash of they key and then uses the 
    //modulus to find a slot for the key within the current capacity
    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;

        for (let i=start; i<start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._hashTable[index];
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index;
            }
        }
    }

    //to make sure that each item lives in the correct location you recreate
    //the hash map from scratch with a larger capacity
    _resize(size){
        const oldSlots = this._hashTable
        this._capacity = size
        //reset the length - it will get rebuilt as you add the items back
        this.length = 0
        this._deleted = 0
        this._hashTable = []

        //adding items back
        for (const slot of oldSlots){
            if (slot !== undefined && !slot.DELETED){
                this.set(slot.key, slot.value)
            }
        }
    }
}

//collision: 2 unique keys hash to the same slot in the array
//resolve collisions by open addressing (moving to nearest empty slot) or seperate chaining (starts linked list)
