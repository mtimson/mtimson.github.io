function init() {
    console.log("init")
    var computeButton = document.getElementById('computeButton')
    var valueField = document.getElementById('values')
    var targetField = document.getElementById('target')
    var values
    valueField.oninput = function (ev) {
        values = this.value.match(/\d+/g).map(Number)
    }
    var target
    targetField.oninput = function (ev) {
        target = this.value
    }

    computeButton.onclick = function (ev) { compute(values, target) }
}

function compute(values, target) {
    console.log("compute: ", values, target)
    // var inputs = values.slice()
    // inputs.sort()

    var rem = target
    var posSoln = []
    var solutions = []

    var test = 0
    var numVals = values.length

    while (test < numVals) {
        if (values[test] <= rem) {
            rem -= values[test]
            posSoln.push(test)
        }

        if (rem == 0) {
            var soln = []
            posSoln.forEach(buildSolution)
            function buildSolution(pos) { soln.push(values[pos]) }
            soln.sort()
            addSolution(solutions, soln)
            console.assert(test == posSoln[posSoln.length - 1])
            rem += values[test]
            posSoln.pop();
        }
        ++test;

        while (test == numVals && posSoln.length > 0) {
            test = posSoln.pop()
            rem += values[test]
            ++test;
        }
    }
    var resultString = ""
    solutions.forEach(function(soln){resultString += "[" + soln.toString() + "]<br>"})
    document.getElementById("result").innerHTML = resultString
}

function addSolution(collection, newSoln) {
    for (var i = 0; i < collection.length; ++i) {
        var soln = collection[i]
        if (soln.length != newSoln.length)
            continue
        var different = false
        for (var j = 0; j < soln.length; ++j) {
            if (soln[j] != newSoln[j]) {
                different = true
                break
            }
        }
        if (!different)
            return
    }
    collection.push(newSoln)
}