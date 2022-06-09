import os

shape_predictor_path    = os.path.join('resources','shape_predictor_68_face_landmarks.dat')
alarm_paths             = [os.path.join('resources','audio_files','sleepy.mp3'),
                           os.path.join('resources','audio_files','distracting.mp3'),
                           os.path.join('resources','audio_files','yawning.mp3')]

EYE_DROWSINESS_THRESHOLD    = 0.25
EYE_DROWSINESS_INTERVAL     = 5.0
MOUTH_DROWSINESS_THRESHOLD  = 0.37
MOUTH_DROWSINESS_INTERVAL   = 2.0
DISTRACTION_INTERVAL        = 5.0
