# -*- coding: utf-8 -*-
import socket
import time
total = 0
time_list = list()
for i in range(1000):
    HOST = '140.116.86.202'
    PORT = 23000

    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client.connect((HOST, PORT))
    

    f = open("temp.mp3", "rb")
    send_string = f.read()
    f.close()
    serverMessage = '下一筆'
    start = time.time()
    client.send(send_string)

    serverMessage = str(client.recv(1024), encoding='utf-8')
    #print('Server:', serverMessage)
    end = time.time()
    total = total + (end-start)
    time_list.append(end-start)
    client.close()
    time.sleep(0.5)
print(total/1000)
f = open("wifi_time2.txt", "w")
for i in range(len(time_list)):
    f.write(str(time_list[i])+'\n')

f.close()