from subprocess import call
import time

# for d in range(1,110):
#     call(["screencapture", "-x", "-R1436,256,736,714", "./earth"+str(d)+".png"])
#     time.sleep(.06)

for d in range(1,110):
    call(["convert", "-resize", "200x", "-fuzz", "30%", "-transparent", "black", "./earth"+str(d)+".png","./earth_200_"+str(d)+".png"])