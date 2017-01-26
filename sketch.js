var order = 2;
var ngrams = {};
var button;
var nstr = {};
var beginnings = []
var avglen = 0;
function preload() {
    names = loadStrings('logs.txt');
    console.log(names)
}

function setup() {

    button = createButton("generate");
    button.mousePressed(markovIt);
    noCanvas();
    for (var j = 0; j < names.length; j++) {
        var nstr = names[j].split(" ");
        avglen += nstr.length
        avglen = avglen / 2
        for (var i = 0; i <= nstr.length - 1; i++) {

            var gram = nstr[i];
            if (i === 0) {
                beginnings.push(gram);
            }
            //console.log(ngrams[gram])
            if (ngrams[gram] == undefined) {
                ngrams[gram] = [];
            }
            if (nstr[i + 1] != undefined) {
                ngrams[gram].push(nstr[i + 1]);
            }

        }
    }
    //console.log(ngrams);
}

function markovIt() {

    var currentGram = random(beginnings);
    var result = currentGram;
    var len = round(avglen) + round(random(-1,10))
    for (var i = 0; i < len ; i++) {
        var possibilities = ngrams[currentGram];

        var next = random(possibilities);
        if (!next) {
            break;
        }
        result = result + " " + next;
        currentGram = next;
    }

    createP(result);
}
