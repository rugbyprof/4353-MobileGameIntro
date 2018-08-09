from subprocess import call

def padd(i):
    if i < 10:
        return "0"+str(i)
    else:
        return str(i)

i = 1
for d in range(10,350,10):
    call(["convert", "-rotate", str(d) , "-background", "none" , "flipv2.png", "flipv2_right"+str(i)+".png"])
    d = d * -1
    call(["convert", "-rotate", str(d) , "-background", "none" , "flipv2.png", "flipv2_left"+str(i)+".png"])
    i = i + 1

