# Random Havel Hakimi

This is a tool that generates graphs where each vertex has degree 2 using the Random Havel Hakimi algorithm. The input is the number of vertices and the algorithm is run 10000 times. The output is a chart with the number of times each graph was generated.

Since the degrees of the vertices are 2, the class of graphs that are generated are cycles corresponding to the integer partitioning (with numbers greater than 2) of the number of vertices. For example, with 6 vertices we can either have a single cycle with 6 vertices, or a graph with two cycles with 3 vertices each.
