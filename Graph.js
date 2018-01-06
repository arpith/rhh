class Graph {
  constructor() {
    this.nodes = {};
    this.edges = [];
    this.neighbours = {};
    this.cycles = [];
  }

  addNode(v1) {
    this.nodes[v1.id] = v1;
  }
  
  addNeighbour({ id }, neighbour) {
    if (!this.neighbours[id]) {
      this.neighbours[id]= [];
    }
    this.neighbours[id].push(neighbour);
  }
  
  addEdge(v1, v2) {
    this.edges.push({from: v1.id, to: v2.id });
    this.addNeighbour(v1, v2);
    this.addNeighbour(v2, v1);
  }
  
  popAndExtend(stack) {
    const {vertex, parent} = stack.pop();
    this.neighbours[vertex.id]
      .filter(({id}) => id != parent.id)
      .forEach(neighbour => stack.push({vertex: neighbour, parent: vertex}));
    return vertex;
  }
  
  getCycles() {
    const visited = {}
    Object.values(this.nodes).forEach((root) => {
      if (!visited[root.id]) { 
        visited[root.id] = true;
        const stack = [{vertex: root, parent: root}];
        this.popAndExtend(stack);
        const cycle = [root];
        while (stack.length != 0) {
          const vertex = this.popAndExtend(stack);
          if (visited[vertex.id]) {
            break;
          }
          cycle.push(vertex);
          visited[vertex.id] = true;
        }
        this.cycles.push(cycle);
      }
    });
  }
}
