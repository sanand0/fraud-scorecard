'''Loads a large chunk of random data into the Fraud Scorecard'''

import sys, urllib
from random import choice, randint

count = 10000
try: count = int(sys.argv[1])
except: pass

def load_direct():
    comments = (
        "This customer was not sure of what they were saying.",
        "Customer completely unaware that they had an account.",
        "Does not reside in the country. Had moved out of the apartment 6 months ago.",
        "",
        "",
        ""
    )

    for num in xrange(count):
        urllib.urlopen('http://localhost:81/Direct/', 
        # {"user_id":"ab12","order":"2893829","start_time":1259759266554,"end_time":1259759318970,"decision":"","recommendation":"Reject","score":769,"comments":"","answers":{"Q11":["388",388],"Q12":["Yes",0],"Q13":["No",50],"Q21":["Yes",0],"Q22":["634002",-10],"Q23":["No",40],"Q24":["",0],"Q25":["",0],"Q26":["",0],"Q27":["",0],"Q28":["",0],"Q31":["Yes",80],"Q41":["No",1],"Q42":["",0],"Q43":["",0],"Q44":["",0],"Q45":["",0],"Q51":["No",220],"Q52":["",0],"Q53":["",0],"Q54":["",0],"Q55":["",0],"Q56":["",0],"Q57":["",0],"Q58":["",0],"Q59":["",0],"Q510":["",0],"Q511":["",0],"Q512":["",0]},"history":"<p>ab12 (02 December 2009 13:08:38):</p><ul><li>Created</li></ul>"}
            "{'user_id': '"         + choice(('ab12', 'cd34'))          + "'," +
            "'order': '"            + str(10000000 + num)               + "'," +
            "'start_time': "        + str(1258759318970 + num * 1000)   + "," +
            "'end_time': "          + str(1258759318970 + num * 1000)   + "," +
            "'decision': '"         + choice(('Accept', 'Reject'))      + "'," +
            "'recommendation': '"   + choice(('Accept', 'Reject'))      + "'," +
            "'score': "             + str(randint(200, 800))            + "," +
            "'comments': '"         + choice(comments)                  + "'," +
            "'answers': {'Q11':['388',388],'Q12':['Yes',0],'Q13':['No',50],'Q21':['Yes',0]}," +
            "'history': ''}"
        ).read()
        if num % 100 == 0: print '.',

load_direct()