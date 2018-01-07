import Storage from './Storage';
import Graph from './Graph';

class RHH {
  constructor(seq, type) {
    this.storage = new Storage();
    this.graph = new Graph();
    this.type = type;
    seq.forEach((v) => {
      this.storage.append(v.degree, v);
    });
    return this.isGraphic();
  }
  
  transform(v1) {
    this.graph.addNode(v1);
    const shiftedNodes = this.storage.shift(v1.degree, this.type);
    shiftedNodes.forEach((v) => {
      this.graph.addNode(v);
      this.graph.addEdge(v1, v);
    });
  }
  
  draw(label) {
    console.log("going to draw graph");
    console.log(this.graph.getCycles());
    drawGraph(this.graph, label, `shift-${this.type}-graph`);
  }
  
  isGraphic() {
    let v1 = null;
    while (this.storage.length != 0) {
      v1 = this.storage.popRandom(this.type);
      if (!v1 || v1.degree == 0) {
        //this.draw(v1.label);
        this.graph.getCycles();
        return true;
      } else if (v1.degree >= this.storage.length) {
        return false;
      } else if (this.storage.non_zero_count() < v1.degree - 1) {
        return false;
      }
      this.transform(v1);
    }
    //this.draw();
    this.graph.getCycles();
    return true;
  }
}

export default RHH;
