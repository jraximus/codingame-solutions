#https://www.codingame.com/training/medium/skynet-revolution-episode-1

import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

class Node:    
    exits = []
    
    def __init__(self, index):
        self.index = index
        self.exit_gateway = False
        self.connections = []
        
    def add_connection(self, node):
        self.connections.append(node)
        
    def remove_connection(self, node):
        index = self.connections.index(node)
        del self.connections[index]
        
    def display_node_info(self):
        print >> sys.stderr, "Node: " + str(self.index)
        print >> sys.stderr, self.connections
        
def find_connection_to_cut(node):
    node.display_node_info()
    shortest_hops = -1
    n1 = None
    n2 = None
    for connection in node.connections:
        temp_hops, temp_n1, temp_n2 = shortest_path_to_exit(1, node, connection, [])
        if temp_hops != -1 and (shortest_hops == -1 or temp_hops < shortest_hops):
            shortest_hops = temp_hops
            n1 = temp_n1
            n2 = temp_n2
    
    n1.remove_connection(n2)
    n2.remove_connection(n1)
    print str(n1.index) + " " + str(n2.index)
    
def shortest_path_to_exit(hops, prev_node, current_node, visited):
    if current_node.exit_gateway:
        #print >> sys.stderr, 'gateway node found: ' + str(prev_node.index) + ' ' + str(current_node.index)
        return hops, prev_node, current_node
    elif len(current_node.connections) == 0 or hops > 13:
        return -1, None, None
    else:
        shortest_hops = -1
        n1 = None
        n2 = None
        for next_node in current_node.connections:
            temp_hops = -1
            if next_node.index not in visited:
                temp_hops, temp_n1, temp_n2 = shortest_path_to_exit(hops + 1, current_node, next_node, visited + [next_node.index])
            if temp_hops != -1 and (shortest_hops == -1 or temp_hops < shortest_hops):
                shortest_hops = temp_hops
                n1 = temp_n1
                n2 = temp_n2
        return shortest_hops, n1, n2
# n: the total number of nodes in the level, including the gateways
# l: the number of links
# e: the number of exit gateways
n, l, e = [int(i) for i in raw_input().split()]
nodes = [Node(i) for i in xrange(n)]
for i in xrange(l):
    # n1: N1 and N2 defines a link between these nodes
    n1, n2 = [int(j) for j in raw_input().split()]
    #print >> sys.stderr, n1,n2
    nodes[n1].add_connection(nodes[n2])
    nodes[n2].add_connection(nodes[n1])
    
for i in xrange(e):
    ei = int(raw_input())  # the index of a gateway node
    setattr(nodes[ei], 'exit_gateway', True)
    Node.exits.append(nodes[ei])
    
# game loop
while True:
    si = int(raw_input())  # The index of the node on which the Skynet agent is positioned this turn
    find_connection_to_cut(nodes[si])
