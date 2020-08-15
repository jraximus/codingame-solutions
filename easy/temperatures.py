#https://www.codingame.com/training/easy/temperatures

import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

n = int(raw_input())  # the number of temperatures to analyse
temps = raw_input()  # the n temperatures expressed as integers ranging from -273 to 5526

# Write an action using print
# To debug: print >> sys.stderr, "Debug messages..."

if n<=0:    
    print 0
else:
    temps = temps.split(' ')
    best = 5526
    print >> sys.stderr, temps
    for i in range(0, n):
        temp = int(temps[i])
        if abs(temp) < abs(best):
            best = temp
        elif abs(temp) == abs(best):
            if temp > best:
                best = temp
    print best
