export default class Storage {
  constructor(q) {
    this.store = {};
    this.head = 0;
    this.length = 0;
    this.q = q;
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

  randomNumber(max) {
    return Math.random() * max;
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
      if (v.degree > 0) {
        this.append(v.degree, v);
      }
    });
    return items;
  }

  sum(a, b) {
    return a + b;
  }

  degreeSeq() {
    // Return the degree sequence stored :)
    const createSeq = ([d, v]) => v.slice().fill(parseInt(d));
    const sequences = Object.entries(this.store).map(createSeq);
    return [].concat(...sequences);
  }

  D() {
    // In general, let q be a real number.
    // Let D(q)=sum((d_i)^q) be the sum of all the degrees to the power of q.
    // If the sequence is (2,1,1) for vertices (A,B,C) and q=1
    // then D = 2 + 1 + 1
    const raise = (d) => Math.pow(d, this.q);
    return this.degreeSeq().map(raise).reduce(this.sum);
  }

  weight(degree) {
    // A vertex with degree d is selected with probability d^q/D(q)
    // If the sequence is (2,1,1) for vertices (A,B,C) and q = 1
    // Then A is selected with probability 1/2 while B and C each is selected with probability 1/4
    return Math.pow(degree, this.q) / this.D();
  }

  S() {
    // Define S(q) to be the selection process in which
    // a vertex with degree d is selected with probability d^q/D(q)
    // The technique used is explained here:
    // http://codetheory.in/weighted-biased-random-number-generation-with-javascript-based-on-probability/
    // Let the weights be w0, w1, etc.
    // Select a random number r between 0 and sum(weights)
    // Let i be the smallest index such that r <= sum(w0 + ... + w_i).
    // Then we choose the item corresponding to w_i.
    const degrees = this.degreeSeq();
    const totalWeight = degrees.map(this.weight, this).reduce(this.sum);
    const randomNumber = this.randomNumber(totalWeight);
    let sumWeights = 0;
    for (const [i, degree] of degrees.entries()) {
      sumWeights += this.weight(degree);
      if (randomNumber <= sumWeights) {
        return this.pop(i);
      }
    }
  }
}
