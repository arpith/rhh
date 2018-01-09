export default class Storage {
  constructor() {
    this.store = {};
    this.head = 0;
    this.length = 0;
  }

  append(key, value) {
    if (!this.store[key]) {
      this.store[key] = [];
    }
    this.store[key].push(value);
    this.length += 1;
    if (key > this.head) {
      this.head = key;
    }
  }
  
  randomInt(max) {
    return Math.random() * (max - 0) + 0;
  }
  
  pop(i) {
    let j = this.head;
    let count = this.store[j].length;
    while (count <= i) {
      // find the list that contains i
      j -= 1;
      count += this.store[j].length;
    }
    // count - i gives the distance from the end of the last list
    // length - distance from end is distance from start
    const k = this.store[j].length - (count - i); 
    return this.store[j].splice(k, 0)
  }
  
  popRandom(isMax) {
    while (!this.store[this.head] || this.store[this.head].length == 0) {
      this.head -= 1;
    }
    this.length -= 1;
    if (isMax) {
      const max = this.store[this.head].length;     
      const i = this.randomInt(max);
      return this.store[this.head].splice(i, 1)[0];
    } else {
      const i = this.randomInt(this.length);
      return this.pop(i);
    }
  }
  
  shift(count) {
    const items = [];
    for (let i = 0; i < count; i++) {
      const v = this.popRandom(true);
      v.degree--;
      items.push(v);
    }
    items.forEach(v => this.append(v.degree, v));
    return items;
  }
  
  non_zero_count() {
    if (!this.store[0]) {
      return this.length;
    } else {
      return this.length - this.store[0].length;
    }
  }
}
