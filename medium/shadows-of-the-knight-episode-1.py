#https://www.codingame.com/training/medium/shadows-of-the-knight-episode-1

import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

debug = False

# w: width of the building.
# h: height of the building.
w, h = [int(i) for i in raw_input().split()]
n = int(raw_input())  # maximum number of turns before game over.
x0, y0 = [int(i) for i in raw_input().split()]
px0 = x0
py0 = y0

x1 = x0
y1 = y0
x2 = None
y2 = None

prev_dir = None

if debug:
    print >> sys.stderr, "width: " + str(w) + " height: " + str(h)
    print >> sys.stderr, "# of total jumps: " + str(n)

# game loop
while True:
    bomb_dir = raw_input()  # the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
    
    if debug:
        print >> sys.stderr, "bomb_dir: " + str(bomb_dir)

    x_deviation = 0
    y_deviation = 0
    if "U" in bomb_dir:
        if y2 == None:
            y2 = 0
        if prev_dir !=None and "D" in prev_dir:
            y2 = py0
        y_deviation = int(abs(round((y2 - y1)/2))) * -1
        #y_deviation = -1
    
    elif "D" in bomb_dir:
        if y2 == None:
            y2 = h
        if prev_dir !=None and "U" in prev_dir:
            y2 = py0
        y_deviation = int(abs(round((y2 - y1)/2)))
        #y_deviation = 1
        
    if "L" in bomb_dir:
        if x2 == None:
            x2 = 0
        if prev_dir !=None and "R" in prev_dir:
            x2 = px0
        x_deviation = int(abs(round((x2 - x1)/2))) * -1
        #x_deviation = -1
    elif "R" in bomb_dir:
        if x2 == None:
            x2 = w
        if prev_dir !=None and "L" in prev_dir:
            x2 = px0
            
        x_deviation = int(abs(round((x2 - x1)/2)))
        #x_deviation = 1
        
    if debug:
        print >> sys.stderr, "(x0,y0) - (" + str(x0) + "," + str(y0) + ")"
        print >> sys.stderr, "(x1,y1) - (" + str(x0 + x_deviation) + "," + str(y0 + y_deviation) + ")"

    # state saving current jumps for next step
    px0 = x0
    py0 = y0
    prev_dir = bomb_dir
    
    x0 = x0 + x_deviation
    y0 = y0 + y_deviation
    x1 = x0
    y1 = y0
    print str(x0) + " " + str(y0)
