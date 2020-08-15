# https://www.codingame.com/training/easy/horse-racing-duals

import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

n = int(raw_input())
strengths = []
for i in xrange(n):
    strengths.append(int(raw_input()))
strengths.sort()

best_match = strengths[0]
for i in xrange(len(strengths)):
    if i - 1 > 0 and abs(strengths[i] - strengths[i-1]) < best_match:
        best_match = abs(strengths[i] - strengths[i-1])
    elif i + 1 < len(strengths) and strengths[i + 1] - strengths[i] < best_match:
        best_match = abs(strengths[i + 1] - strengths[i])
print best_match
