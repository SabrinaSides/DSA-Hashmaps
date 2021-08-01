const HashMap = require('./hashmaps');

function main() {
  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;

  let lotr = new HashMap()

  let data = [
    { Hobbit: 'Bilbo' },
    { Hobbit: 'Frodo' },
    { Wizard: 'Gandalf' },
    { Human: 'Aragorn' },
    { Elf: 'Legolas' },
    { Maiar: 'The Necromancer' },
    { Maiar: 'Sauron' },
    { RingBearer: 'Gollum' },
    { LadyOfLight: 'Galadriel' },
    { HalfElven: 'Arwen' },
    { Ent: 'Treebeard' },
  ]

  data.forEach(data => {
      let key = Object.keys(data)[0]
      lotr.set(key, data[key])
  })

  console.log(lotr)
  //hashmap is short by two items because two key values matched

  console.log('Maiar:', lotr.get('Maiar')) //value Sauron

  console.log('Hobbit:', lotr.get('Hobbit')) //value Frodo

  //returns value for last matched key because no collision handling
  //capacity is 24 now. resize fx = capacity (inital capacity 8) * size ratio
  
}

main()

const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1);
    console.log(map2.get(str3));
}

WhatDoesThisDo()
//prints 20, 10 -- because keys are the same, the last value is the printed value