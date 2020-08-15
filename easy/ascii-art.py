#https://www.codingame.com/training/easy/ascii-art

import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

l = int(raw_input())
h = int(raw_input())
t = raw_input()

print >> sys.stderr, "L:   "+str(l)
print >> sys.stderr, "H:   "+str(h)
print >> sys.stderr, "T:   "+str(t)

alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ?"

for i in xrange(h):    
    row = raw_input()
    row_result = ""
    for char in t:
        try:
            alphaIndex = alphabet.index(char.upper())
        except ValueError:
            alphaIndex = alphabet.index('?')
        startIndex = alphaIndex * l
        row_result += row[startIndex: startIndex + l]
    print row_result

# Write an action using print
# To debug: print >> sys.stderr, "Debug messages..."



