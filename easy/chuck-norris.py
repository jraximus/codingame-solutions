#https://www.codingame.com/training/easy/chuck-norris

import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

message = raw_input()

# Write an action using print
# To debug: print >> sys.stderr, "Debug messages..."

def make_7_bit(base_2_ascii):
    result = base_2_ascii
    for x in range(0, 7 - len(base_2_ascii)):
        result = "0" + result
    return result

result = ""
base = -1
count = ""
previous = -1
result_space_appender = ""
base_2_ascii = ""
for c in message:
    base_10_ascii = ord(c)
    base_2_ascii += make_7_bit(bin(base_10_ascii)[2:])
    
index = 0
while index < len(base_2_ascii):
    bit = base_2_ascii[index]
    if base == -1:
        if bit == "1":
            base = "0"
        else:
            base = "00"
        index += 1
        previous = bit
        count = "0"
    else:
        if bit == previous:
            count += "0"
            index += 1 
        else:
            result += result_space_appender + base + " " + count
            result_space_appender = " "
            base = -1
    
    if base != -1 and index == len(base_2_ascii):
        result += result_space_appender + base + " " + count
            
        
print >> sys.stderr, message
print >> sys.stderr, base_10_ascii
print >> sys.stderr, base_2_ascii
print result
