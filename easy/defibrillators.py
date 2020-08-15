#https://www.codingame.com/training/easy/defibrillators

import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

def calc_distance(lonA, latA, lonB, latB):
    x = (lonB - lonA) * math.cos( (latA + latB) / 2 )
    y = (latB - latA)
    return math.sqrt(math.pow(x, 2) + math.pow(y, 2)) * 6371

lon = float(raw_input().replace(',', '.'))
lat = float(raw_input().replace(',', '.'))
n = int(raw_input())
closest = None
for i in xrange(n):
    defib = raw_input()    
    lonB = float(defib.split(';')[4].replace(',', '.'))
    latB = float(defib.split(';')[5].replace(',', '.'))
    distance = calc_distance(lon, lat, lonB, latB)
    if closest is None or distance < closest:
        closest = distance
        closest_defib = (defib.split(';;')[0]).split(';')[1]
print closest_defib

