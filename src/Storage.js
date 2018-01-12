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
    // See https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    return Math.floor(Math.random() * (max + 1));
  }

  updateHead() {
    while (!this.store[this.head] || this.store[this.head].length == 0) {
      this.head -= 1;
    }
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
    const vertex = this.store[j].splice(k, 1)[0];
    this.length -= 1;
    this.updateHead();
    return vertex;
  }
  
  popRandom(isMax) {
    if (isMax) {
      const i = this.randomInt(this.store[this.head].length - 1);
      return this.pop(i);
    } else {
      const i = this.randomInt(this.length - 1);
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
}
