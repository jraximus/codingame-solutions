#https://www.codingame.com/training/easy/mime-type

import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

n = int(raw_input())  # Number of elements which make up the association table.
q = int(raw_input())  # Number Q of file names to be analyzed.
mimes = {}
for i in xrange(n):
    # ext: file extension
    # mt: MIME type.
    ext, mt = raw_input().split()
    mimes[ext.lower()] = mt
print >> sys.stderr, mimes
for i in xrange(q):
    fname = raw_input()  # One file name per line.
    ext = fname.split('.')[-1]
    if '.' in fname and ext and ext.lower() in mimes:
        print mimes[ext.lower()]
    else:
        print "UNKNOWN"
