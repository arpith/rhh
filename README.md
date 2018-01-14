# Random Havel Hakimi

This is a tool that generates graphs where each vertex has degree 2 using the Random Havel Hakimi algorithm. The input is the number of vertices and the algorithm is run 10000 times. The output is a chart with the number of times each graph was generated.

Since the degrees of the vertices are 2, the class of graphs that are generated are cycles corresponding to the integer partitioning (with numbers greater than 2) of the number of vertices. For example, with 6 vertices we can either have a single cycle with 6 vertices, or a graph with two cycles with 3 vertices each.

## Algorithm
While there are vertices in the data structure, pop a random vertex and do the transform:
1. Add the vertex v to the graph
2. Shift d vertices in the data structure (where d is the degree of the vertex popped)
3. For each of the d vertices, add the vertex to the graph and add an edge between this vertex and v


## Data structure
The data structure consists of an stack of vertices for each degree. There are three main operations on the data structure:

1. pop(i) pops the i'th vertex (when sorted by degree) from the data structure. 
2. popRandom() pops a random vertex
3. shift pops d maximum degree vertices, decrements their degree and appends them to the d-1'th stack in the data structure.

## Example
Let the sequence b 9,9,9,8,8,7,7,...,d,... 
Assume a vertex, call it v, with degree d<7 is selected in the random process. Then:
d=1: one of the vertices with degree 9 is selected randomly as its neighbor. 
d=2: two of the vertices with degree 9 are selected randomly as its neighbors.
d=3: all the vertices with degree 9 are the neighbors of v.
d=4: all the vertices with degree 9 and one random vertex with degree 8 are the neighbors of v.
d=5: all the vertices with degree 8 and 9 are the neighbors of v.
d=6: all the vertices with degree 8 and 9 and one random vertex with degree 7 are the neighbors of v.
