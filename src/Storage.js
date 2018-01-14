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
    while ((!this.store[this.head] || this.store[this.head].length == 0) && (this.head > 0)) {
      this.head -= 1;
    }
  }

  find(i) {
    // find the list that contains the i'th element
    let j = this.head;
    let count = this.store[j].length;
    while (count <= i) {
      j -= 1;
      count += this.store[j].length;
    }
    return { degree: j, count };
  }

  pop(i) {
    const { degree, count } = this.find(i);
    // count - i gives the distance from the end of the last list
    // length - distance from end is distance from start
    const k = this.store[degree].length - (count - i);
    const vertex = this.store[degree].splice(k, 1)[0];
    this.length -= 1;
    this.updateHead();
    return vertex;
  }
  
  popRandom() {
    const i = this.randomInt(this.length - 1);
    return this.pop(i);
  }

  popUntilDegree(degree) {
    let i = this.head;
    let ret = [];
    while (i > degree) {
      ret = ret.concat(this.store[i].slice());
      this.store[i] = [];
      i--;
    }
    this.length -= ret.length;
    this.updateHead();
    return ret;
  }

  popMultipleRandomFromStack(count, degree) {
    let i = 0;
    const ret = [];
    while (i < count) {
      const j = this.randomInt(this.store[degree].length - 1);
      const vertex = this.store[degree].splice(j, 1)[0];
      ret.push(vertex);
      i++;
    }
    this.length -= ret.length;
    this.updateHead();
    return ret;
  }
  
  shift(number) {
    if (number === 0) {
      return [];
    }
    const { degree } = this.find(number - 1);
    let items = this.popUntilDegree(degree);
    const randomPopCount = number - items.length;
    const randomPopItems = this.popMultipleRandomFromStack(randomPopCount, degree);
    items = items.concat(randomPopItems);
    items.forEach((v) => {
      v.degree--;
      this.append(v.degree, v);
    });
    return items;
  }
}
