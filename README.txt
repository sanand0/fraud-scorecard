Install
    1. Install  Java Runtine Environment (JRE 1.5 or above).
       I'll assume it's at C:\JRE
    2. Unzip persevere.zip. I'll assume it's at D:\SCORECARD\PERSEVERE.
    3. Unzip scorecard.zip. I'll assume it's at D:\SCORECARD\SCORECARD.

Run
    Edit the last two lines in SCORECARD.BAT to reflect the paths. E.g.:
        SET JAVA_HOME=C:\JRE
        D:\SCORECARD\PERSEVERE\BIN\PERSVR.BAT -p 81 -r C:\SCORECARD
    Run D:\SCORECARD\SCORECARD\SCORECARD.BAT. Visit localhost:81 to test.
    Go to Start - Control Panel - Scheduled Tasks and add a new task.
    Select SCORECARD.BAT as the file to run.
    Select C:\SCORECARD as the "Start in" folder (change as required).
    Select the user to run as. (The user must have Administrator access.)
    Ensure that "Run only if logged in" is NOT ticked.
    Ensure that the task will not be stopped after a certain number of hours.
    In the Schedule tab, change the schedule to "At System Startup".
    Right-click on the task and run it.
    To stop all instances of the server, kill all java.exe on Task Manager.
    
Backup and restore
    To backup, take a copy of the C:\SCORECARD folder.
    To restore, replace the copy of the C:\SCORECARD folder.
    If the system crashes, re-install and restore the C:\SCORECARD folder.

Application overview
    The code is mostly client-side javascript, and is in:
        questions-*.js          questions in the scorecard (for each business)
        view.html               shows all the records
        form.html               creates or edits a record
        common.js               standard libraries -- jQuery + plugins
    
    All the colours, layouts, fonts, etc. are in:
        scorecard.css           Cascading Style Sheet for the application
        *.gif, *.png            Various images used in the application
        
    All the server side code is in:
        WEB-INF/jslib/Scorecard.js  Stores data in a flat file
        WEB-INF/jslib/CSV.js        Exports data as CSV

    The only files you'll ever edit should be:
        questions-*.js
        WEB-INF/jslib/Scorecard.js
    
How to add a new business
    Let's say the new business is "Wine". You need to do 4 things:
    1. Copy questions-Direct.js to questions-Wine.js (and change the questions)
    2. Add a line to the top of WEB-INF/jslib/Scorecard.js that says:
        Class({ id: 'Wine', properties: scorecard_schema});
    3. Add a background-colour for the business in scorecard.css. For example:
        .Wine { background-color: purple; }
       Note the spelling of "color" and the dot (.) at the start of the line
    4. Tell people to visit /view.html?db=Wine

How to change questions?
    The questions are stored in a Javascript file called questions-*.js.
    Just open the file and follow the directions.
