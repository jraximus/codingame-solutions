#https://www.codingame.com/training/easy/power-of-thor-episode-1

import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.
# ---
# Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.

 # light_x: the X position of the light of power
 # light_y: the Y position of the light of power
 # initial_tx: Thor's starting X position
 # initial_ty: Thor's starting Y position
light_x, light_y, initial_tx, initial_ty = [int(i) for i in raw_input().split()]

thor_x = initial_tx
thor_y = initial_ty
# game loop
while 1:
    remaining_turns = int(raw_input()) # The remaining amount of turns Thor can move. Do not remove this line.

    # Write an action using print
    # To debug: print >> sys.stderr, "Debug messages..."
    position = ''
    
    # A single line providing the move to be made: N NE E SE S SW W or NW
    if thor_y > light_y:
        position = 'N'
        thor_y -= 1
    elif thor_y < light_y:
        position = 'S'
        thor_y += 1
        
    if thor_x > light_x:
        position += 'W'
        thor_x -= 1
    elif thor_x < light_x:
        position += 'E'
        thor_x += 1
        
    print >> sys.stderr, "Position..."+position
    print position
