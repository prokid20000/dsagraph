/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex)
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    for (let node of vertex.adjacent) {
      this.removeEdge(node, vertex);
    }
    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    let result = [];

    let willVisit = [start];
    let visited = new Set(willVisit);

    while (willVisit.length > 0) {
      let node = willVisit.pop();

      result.push(node.value);


      for (let neighbor of node.adjacent) {
        if (!visited.has(neighbor)) {
          willVisit.push(neighbor);
          visited.add(neighbor);
        }
      }


    }

    return result;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let result = [];

    let willVisit = [start];
    let visited = new Set(willVisit);

    while (willVisit.length > 0) {
      let node = willVisit.shift();

      result.push(node.value);


      for (let neighbor of node.adjacent) {
        if (!visited.has(neighbor)) {
          willVisit.push(neighbor);
          visited.add(neighbor);
        }
      }


    }

    return result;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    let dist = new Object();
    let previous = new Object();

    for (let node of this.nodes) {
      dist[node.value] = Infinity;
      previous[node.value] = undefined;
    }
    

    dist[start.value] = 0;


    const nodeQueue = [];
    this.nodes.forEach(node => nodeQueue.push(node));

    //find the node
    while (nodeQueue.length > 0) {
      let currNode = null;
      for (let node of nodeQueue) {
        if (currNode === null) {
          currNode = node;
        }
        else if (dist[node.value] < dist[currNode.value]) {
          currNode = node;
        }
      }

      //find currNode in the queue
      const currNodeIdx = nodeQueue.indexOf(currNode);

      //removes currNode from the queue
      nodeQueue.splice(currNodeIdx, 1);

      //check the distance of each other node, update if shorter
      for (let neighbor of currNode.adjacent) {
        let alternateDistance = dist[currNode.value] + 1;

        if (alternateDistance < dist[neighbor.value]) {
          dist[neighbor.value] = alternateDistance;
          previous[neighbor.value] = currNode;
        }
      }
    }
  
    
    let endNode = end;
    let count =0;
    
    while(endNode.value !== start.value){
      
      endNode = previous[endNode.value];
      if(endNode === undefined){
        return undefined;
      }
      
      count++;
    }
    
    return count;
  }
}


module.exports = { Graph, Node }
