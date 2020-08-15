#https://www.codingame.com/training/medium/there-is-no-spoon-episode-1

import sys
import math

# Don't let the machines win. You are humanity's last hope...

width = int(raw_input())  # the number of cells on the X axis
height = int(raw_input())  # the number of cells on the Y axis
grid = []
for i in xrange(height):
    grid.append([])
for i in xrange(height):
    line = raw_input()  # width characters, each either 0 or .
    for node in line:
        if node == '0':
            grid[i].append('0')
        else:
            grid[i].append('.')

def find_next_free_node(x, y, horizontal_check):
    if horizontal_check:
        row = grid[y]
        for x2 in xrange(x + 1, len(row)):
            if row[x2] == '0':
                return (x2, y)            
        return (-1, -1)
    else:
        for y2 in xrange(y + 1, len(grid)):
            row = grid[y2]
            if row[x] == '0':
                return (x, y2)                    
        return (-1, -1)

def print_node(x, y):
    return str(x) + ' ' + str(y) + ' '
    
def process_nodes(x1, y1):
    x2, y2 = find_next_free_node(x1, y1, True)
    x3, y3 = find_next_free_node(x1, y1, False)
    result = print_node(x1, y1) + print_node(x2, y2) + print_node(x3, y3)
    print result
    
for y in xrange(height):
    for x in xrange(width):
        if grid[y][x] == '0':
            process_nodes(x, y)