/*

    GENERAL RULES:
        Before deploying, copy and paste at http://jslint.org/ to validate.
        Don't fiddle with brackets, braces, semicolons, commas, etc.
        Avoid double quotes (") or backslashes (\) in questions.
        Try and avoid the pound symbol in questions. It's not 7-bit ASCII.
*/

/*  The uncertainty range has 3 numbers. 
    Any score below the first number is accepted.
    Any score above the first but below the second number is borderline accepted.
    Any score above the second but below the third number is borderline rejected.
    Any score above the third number is rejected.
*/    
var uncertain_range = [100, 200, 300]; // [Accept, Borderline, Reject]

// All questions are inside this list called 'questions':
var questions = [
    // This is a section. It has a number, a 'section' title and an optional description.
    {
        "number": 1,
        "section": "Overview Questions",
        "description": "Actual questions are not disclosed -- they're confidential. These are dummy questions. Obviously."
    },

    /* This is a question. It has 6 parts.
    1. "number" uniquely identifies the question. DON'T CREATE DUPLICATE NUMBERS.
    2. "question" is the text that's shown.
    3. "help" is additional information that 
    4. "showif" is the condition that determines if the question is shown.
        Leave it blank if the question is always to be shown.
        If it's a simple condition, like "Show if question 23 is Yes", type "23=Yes"
        If it's a complex condition, write a Javascript function that returns true or false. For example,
            function() { return $('#Q23').val() == 'Yes' && +$('#Q34').val() < 3; }
    4. "required" should be "yes" if the user HAS to answer the question before
        reaching a decision. Leave it blank ("") otherwise.
        If it's a complex condition, write a Javascript function that returns true or false. For example,
            function() { return $('#Q23').val() == 'Yes' && +$('#Q34').val() < 3; }
    5. "values" is a list of possible values. Leave it black ("") if anything's OK.
        Otherwise, you can have any list of values, and put a fraud score value next to it.
        The fraud score will be added to the total.
    */
    {
        "number": "11",
        "question": "What is the score?",
        "help": "",
        "showif": "",
        "required": "yes",
        "values": ""
    },

    {
        "number": "12",
        "question": "Second question?",
        "help": "",
        "showif": "",
        "required": "yes",
        "values": {
            "Yes": 0,
            "No":  0
        }
    },

    {
        "number": "13",
        "help": "Description",
        "question": "Third question?",
        "showif": "12=Yes",
        "required": "yes",
        "values": {
            "Yes": 0,
            "No":  50
        }
    },

    {
        "number": 2,
        "section": "Next section",
        "description": ""
    },

    {
        "number": "21",
        "question": "XXX?",
        "help": "",
        "showif": "",
        "required": "yes",
        "values": {
            "Yes": 0,
            "No": 300
        }
    },

    {
        "number": "22",
        "question": "YYY?",
        "help": "",
        "showif": "21=Yes",
        "required": "yes",
        "values": {
            "abc": -10,
            "def": 20,
            "ghi": 5,
            "jkl": 0,
            "mno": 0
        }
    },

''];
