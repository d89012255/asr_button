import numpy
import pydub
import os
from pydub import AudioSegment
from pydub.silence import split_on_silence
import shutil
pydub.AudioSegment.converter = r"C:\PATH_Programs\bin\ffmpeg.exe"  # set path of ffmpeg.exe

for i in range(1):                                         # numbers from 0 to 9     
    sound = AudioSegment.from_wav(f'temp.wav')
    #get 分貝數
    dBFS = sound.dBFS
    print(dBFS)
    chunks = split_on_silence(sound, 
            min_silence_len = 50,                         # minimum length of silence:250 ms 
            silence_thresh = dBFS-3,                      # threshhold to divide voice and silence
            keep_silence = 1000                             # time left before and after each voice cut:1000 ms(留下靜音)
        )
    path = './number_temp'
    if not os.path.isdir(path):
        os.mkdir(path)
    else:
        shutil.rmtree(path)
        os.mkdir(path)
   
    for j, chunk in enumerate(chunks):
        chunk.export(f'./number_temp/{i}_temp_{j}.wav',bitrate = "160k",format = "wav")