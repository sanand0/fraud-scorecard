Class({ id: 'Wine', properties: scorecard_schema});
Class({ id: 'Direct', properties: scorecard_schema});
Class({ id: 'Clothing', properties: scorecard_schema});
Class({ id: 'Entertainment', properties: scorecard_schema});

// To add a new business, remove the "//" at the start of the appropriate line below
// Class({ id: 'Wine', properties: scorecard_schema});
// Class({ id: 'Clothing', properties: scorecard_schema});
// ... or you can just add your own
// The Scorecard can then be accesed at /view.html?db=Wine (or whatever)

var scorecard_schema = {
    'user_id': { type: 'string' },
    'order': { type: 'string' },
    'start_time': { type: 'integer' },
    'end_time': { type: 'integer' },
    'decision': { type: 'string' },
    'recommendation': { type: 'string' },
    'score': { type: 'integer' },
    'comments': { type: 'string' },
    'answers': { type: 'any' },
    'history': { type: 'string' }
};

if (typeof app == 'function') { oldApp = app; }
app = function(env){
    var url = decodeURIComponent(env.PATH_INFO + (env.QUERY_STRING ? '?' + env.QUERY_STRING  : ''));
    var match = url.match(/\/csv(\/.*)$/);
    if (match){
        var result = load(match[1]),
            out = ['"Business","ID","User ID","Order","Start time","End time","Time taken","Decision","Recommendation","Overruled","Score","Comments","Paused?"'],
            questions = {},
            qlist = [];
        
        // Get all possible questions
        for (var i=0, e; e=result[i]; i++) {
            for (var q in e.answers) {
                if (!questions[q]) { questions[q] = 1; qlist.push(q); }
            }
        }
        
        qlist.sort();
        out[0] += ',,' + qlist.join(','); // Add answers header
        out[0] += ',,' + qlist.join(','); // Add scores header

        for (var i=0, e; e=result[i]; i++) {
            var x = e.id.split(/\//),
                paused = e.history.match('<p>');
            var row = [
                CSV.escape(x[0]),       // Business
                CSV.escape(x[1]),       // ID
                CSV.escape(e.user_id),
                CSV.escape(e.order),
                CSV.escape(CSV.date(e.start_time)),
                CSV.escape(CSV.date(e.end_time)),
                CSV.escape(CSV.time(e.end_time - e.start_time)),    // Time taken
                CSV.escape(e.decision),
                CSV.escape(e.recommendation),
                CSV.escape(e.decision ? e.decision != e.recommendation ? 'Yes' : 'No' : ''),   // Overruled
                CSV.escape(e.score),
                CSV.escape(e.comments),
                CSV.escape(paused ? paused.length : 0)
            ];

            row.push(''); for (var j=0, q; q=qlist[j]; j++) { row.push(CSV.escape(e.answers[q] ? e.answers[q][0] : '')); }    // Push the answers
            row.push(''); for (var j=0, q; q=qlist[j]; j++) { row.push(CSV.escape(e.answers[q] ? e.answers[q][1] : '')); }    // Push the scores
            out.push(row.join(','));
        }

        return {
            status: 200,
            headers: {'Content-Type':'text/csv', 'Content-Disposition':'filename=scorecard.csv', 'Cache-Control':'max-age=0'},
            body: out.join('\n')
        };
    }
    
    // Redirect the home page to the Direct fraud scorecard. 
    else if (url == '/') {
        return {
            status: 302,
            headers: { 'Location': '/view.html?db=Direct' },
            body: '<a href="/view.html?db=Direct">Fraud scorecard</a>'
        };
    }

    // else redirect to a previous handler, if it existed
    else if (typeof oldApp == 'function') {
        return oldApp(env);
    }
};
