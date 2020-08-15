#https://www.codingame.com/training/medium/winamax-battle

import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

strength = {'2D':2, '2H':2, '2C':2, '2S':2, '3D':3, '3H':3, '3C':3, '3S':3, '4D':4, '4H':4, '4C':4, '4S':4, '5D':5, '5H':5, '5C':5, '5S':5, '6D':6, '6H':6, '6C':6, '6S':6, '7D':7, '7H':7, '7C':7, '7S':7, '8D':8, '8H':8, '8C':8, '8S':8,  '9D':9, '9H':9, '9C':9, '9S':9, '10D':10, '10H':10, '10C':10, '10S':10, 'JD':11, 'JH':11, 'JC':11, 'JS':11, 'QD':12, 'QH':12, 'QC':12, 'QS':12, 'KD':13, 'KH':13, 'KC':13, 'KS':13, 'AD':14, 'AH':14, 'AC':14, 'AS':14}
p1 = []
p2 = []
n = int(raw_input())  # the number of cards for player 1
for i in xrange(n):
    p1.append(raw_input())  # the n cards of player 1
    
m = int(raw_input())  # the number of cards for player 2
for i in xrange(m):
    p2.append(raw_input())  # the m cards of player 2

c1_stack = []
c2_stack = []
pat = False
def play_round(c1, c2):    
    global p1, p2, c1_stack, c2_stack, pat
    if strength[c1] == strength[c2]:       
        #game of war
        if len(c1_stack) == 0:
            c1_stack.append(c1)
            c2_stack.append(c2)
        if len(p1) < 4 or len(p2) < 4:
            pat = True
        else:            
            for i in range(4):
                c1_stack.append(p1.pop(0))
                c2_stack.append(p2.pop(0))
            play_round(c1_stack[-1], c2_stack[-1])
    elif strength[c1] > strength[c2]:
        if len(c1_stack) > 0:
            p1 += c1_stack            
            p1 += c2_stack
            c1_stack = []
            c2_stack = []
        else:            
            p1.append(c1)
            p1.append(c2)
    else:
        if len(c1_stack) > 0:
            p2 += c1_stack
            p2 += c2_stack            
            c1_stack = []
            c2_stack = []
        else:            
            p2.append(c1)
            p2.append(c2)

rounds = 0        
# print >> sys.stderr, 'p1:' +  str(p1)
# print >> sys.stderr, 'p2:' +  str(p2)
# print >> sys.stderr, '################################'
while len(p1) > 0 and len(p2) > 0 and not pat:
    play_round(p1.pop(0), p2.pop(0))
    rounds += 1
    # print >> sys.stderr, 'p1:' +  str(p1)
    # print >> sys.stderr, 'p2:' +  str(p2)
    # print >> sys.stderr, '################################'

# print >> sys.stderr, 'p1:' +  str(p1)
# print >> sys.stderr, 'p2:' +  str(p2)
# print >> sys.stderr, '################################'

# print >> sys.stderr, rounds
if pat:
    print "PAT"
elif len(p1) == 0:
    print '2 ' + str(rounds)
elif len(p2) == 0:  
    print '1 ' + str(rounds)