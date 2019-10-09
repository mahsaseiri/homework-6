// global variables
var res = [];
var counter = 0;
var result = document.getElementById("result");
result.classList.add("alert", "alert-dark", "mt-2", "p-3", "rounded")
    // this method confirms guests that they are not confirmed------------------------------
    // ch --> points eleman ,p -->points parenteleman
function check(p, ch) {
    ch.style.display = "none";
    p.classList.remove("bg-danger");
    p.classList.add("bg-success");
    // '<span class="n" style="display:none">' + d[i].count + '</span>';
    var num = Number(p.childNodes[4].innerHTML);
    counter += num;
    result.innerHTML = "the number of guests(confirmed): " + counter;
    result.innerHTML += '<br>';
    result.innerHTML += "capacity : 30 ";



};
// remove a guest from res array and guest'slist that is confirmed ---------------------

function clo(p, c) {
    p.style.display = "none";
    for (var i = 0; i < res.length; i++) {
        if (res[i].name == p.childNodes[2].innerHTML) {
            res.splice(i, 1);

        }
    }
    // '<span class="n" style="display:none">' + d[i].count + '</span>';
    var num = Number(p.childNodes[3].innerHTML);
    counter -= num;
    result.innerHTML = "the number of guests(confirmed): " + counter;
    result.innerHTML += '<br>';
    result.innerHTML += "capacity : 30 ";

};
// remove a guest from res array and guest'slist that is not confirmed ---------------------
function cl(p, c) {
    p.style.display = "none";
    for (var i = 0; i < res.length; i++) {
        //'<span class="n1">' + d[i].name + '</span>';
        if (res[i].name == p.childNodes[3].innerHTML) {
            res.splice(i, 1);

        }
    }
    // in p.classList ,index of bg-success class is 5
    if (p.classList[5] == "bg-success") {
        //'<span class="n" style="display:none">' + d[i].count + '</span>'
        var num = Number(p.childNodes[4].innerHTML);
        counter -= num;
        result.innerHTML = "the number of guests(confirmed): " + counter;
        result.innerHTML += '<br>';
        result.innerHTML += "capacity : 30 ";
    }


};