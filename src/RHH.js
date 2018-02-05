import Storage from './Storage';
import Graph from './Graph';

class RHH {
  constructor(seq, q) {
    this.storage = new Storage(q);
    this.graph = new Graph();
    seq.forEach((v) => {
      this.storage.append(v.degree, v);
    });
    return this.isGraphic();
  }
  
  transform(v1) {
    this.graph.addNode(v1);
    const shiftedNodes = this.storage.shift(v1.degree);
    shiftedNodes.forEach((v) => {
      this.graph.addNode(v);
      this.graph.addEdge(v1, v);
    });
  }
  
  isGraphic() {
    while (this.storage.length != 0) {
      const v1 = this.storage.S();
      this.transform(v1);
    }
    return true;
  }
}

export default RHH;
