import sys
import argparse
from question_generator import QuestionGenerator
import os

current_path =  os.path.abspath(os.path.join(os.path.dirname(__file__)))

# define punctuation
punctuations = '''!()-[]{};:'"\,<>./?@#$%^&*_~'''

def add_arguments():
    parser = argparse.ArgumentParser()
    parser.add_argument('-s', '--sentence', type=str, help="The sentence for which questions are to be generated.")
    parser.add_argument('-t', '--question_type', type=str, default=['Wh', 'Are', 'Who', 'Do'], choices=['Wh', 'Are', 'Who', 'Do', 'All'], help='The types of questions to be generated.')
    return parser.parse_args()


def createQuestions(inputText):
    # args = add_arguments()
    # if not args.s:
    #     sys.stdout.write('No input given\n')
    #     sys.exit()
    q  = QuestionGenerator()

    question_list = q.generate_question(inputText)

    qList = []
    aList = []
    shortAList = []

    for row in question_list:
        if row['Q'].startswith('Does') or row['Q'].startswith('Do'):
            break
        else:
            q = row['Q']
            a = row['A']

        a_no = ''
        q_no = ''

        # remove punctuation from the string
        for char in a:
            if char not in punctuations:
                a_no += char
        for char in q:
            if char not in punctuations:
                q_no += char
        
        splitA = a_no.split(" ")

        shortA = ""

        for a in splitA:
            if a not in q_no:
                shortA += a + " "
       
        qList.append(row['Q'])
        aList.append(row['A'])
        shortAList.append(shortA)

    return qList,aList,shortAList

