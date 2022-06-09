# importing libraries 
import speech_recognition as sr 
import os 
import shutil
import time
import moviepy.editor
import docx
from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler
from pydub import AudioSegment
from pydub.silence import split_on_silence
import summarize_document as sd
from google.cloud import speech
import io 

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="credentials.json"
client = speech.SpeechClient()

# create a speech recognition object
r = sr.Recognizer()
doc = docx.Document()

# path declaration
current_path = os.path.abspath(os.path.join(os.path.dirname(__file__)))
video_path = current_path+"\\Videos"
document_path =  current_path+"\\documents" 
completed_video_path = current_path+"\\completed_video"  
audio_path = current_path+"\\audio_data" 

def on_created(event):
    time.sleep(5)
    
    # get uploaded file name and path
    fileName = (event.src_path).split("\\")
    fileName1 = fileName[len(fileName)-1]
    fn = fileName1.split(".")

    # convert video to audio
    video = moviepy.editor.VideoFileClip(event.src_path)
    audio = video.audio

    # save audio file
    audio.write_audiofile(audio_path+"\\"+fn[0]+".wav")
    time.sleep(2)
    
    # read audio file to remove silence
    sound = AudioSegment.from_file(audio_path+"\\"+fn[0]+".wav")

    # Split track where the silence is 2 seconds or more and get chunks using 
    # the imported function.
    chunks = split_on_silence (
        # Use the loaded audio.
        sound, 
        min_silence_len = 500,
        # adjust this per requirement
        silence_thresh = sound.dBFS-14,
        # keep the silence for 1 second, adjustable as well
        keep_silence=500,
    )

    # loop through chunks and save as new audio without silence
    for i, chunk in enumerate(chunks):
        if(i == 0):
            audio_without_silence = chunk
        else:
            audio_without_silence = audio_without_silence + chunk

        if(i == len(chunks)-1):
            os.remove(audio_path + "\\"+fn[0]+".wav")
            audio_without_silence.export(audio_path + "\\"+fn[0]+".wav", format="wav")

    # read audio file to convert into text
    audio_file = os.path.join("audio_data", f""+fn[0]+".wav")

    with io.open(audio_file, "rb") as audio:
        content = audio.read()

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        #sample_rate_hertz=8000,
        language_code="en-US",
        audio_channel_count=2,
        # Enable automatic punctuation
        enable_automatic_punctuation=True,
    )

    response = client.recognize(config=config, audio=audio)

    for i, result in enumerate(response.results):
        alternative = result.alternatives[0]
        doc.add_paragraph(alternative.transcript)
        print("Transcript: {}".format(alternative.transcript))  
    # write text into word doc
    doc.save(document_path+"\\"+fn[0]+".docx")
    video.close()
    time.sleep(2)

    # move video into another folder after completion
    shutil.move(event.src_path, completed_video_path+"\\"+fileName1)
    sd.summerize(fn[0]+".docx")
 
def on_deleted(event):
    print("deleted")
        
def on_modified(event):
    print("modified")
        
def on_moved(event):
    print("moved")

if __name__ == "__main__":
    # An agent has been created here to monitor video-data folder. when a new video is uploaded to that folder,
    # it automatically starts processing that video.
    event_handler = LoggingEventHandler()
    event_handler.on_created = on_created
    event_handler.on_deleted = on_deleted
    event_handler.on_modified = on_modified
    event_handler.on_moved = on_moved

    observer = Observer()
    observer.schedule(event_handler, video_path, recursive=True)
    observer.start()

    try:
        print("Started")
        while True:
            time.sleep(1)
    finally:
        observer.stop()
    observer.join()