window.onload = init;

function init() {
    var add_output = document.getElementById("add_output");
    var remove_output = document.getElementById("remove_output");
    // add new guests--------------------------------------------------------------------------
    document.getElementById("send").addEventListener("click", function() {
        var i = true;
        var name = document.forms[0].name.value;
        var count = (document.forms[0].count.value);
        var confirmed = document.forms[0].confirmed.value;
        var myid = (res.length) + 1;
        console.log(res.length);
        if (confirmed == "yes") {
            confirmed = true;
        } else {
            confirmed = false;
        }
        if (name == "") {
            add_output.style.color = "red";
            add_output.innerHTML = "please enter the name of guest";
        } else if (count == "") {
            add_output.style.color = "red";
            add_output.innerHTML = "please enter the count";
        } else {
            count = Number(count);
            var new_guest = { "name": name, "count": count, "confirmed": confirmed, "id": myid };
            if ((count + counter) <= 30) {
                add_output.innerHTML = "";
                res.push(new_guest);
                counter = 0;
                build(res, "output");
            } else {
                var t = 30 - counter;
                add_output.style.color = "red";
                add_output.innerHTML = "you can not add more than  " + t;
            }
        }


    });
    // remove a guest with id-------------------------------------------------------------------
    document.getElementById("remove").addEventListener("click", function() {
        var i = -1;
        var b;
        var id = document.forms[1].id.value;
        id = Number(id);
        for (var j = 0; j < res.length; j++) {
            console.log(res);
            if (id == res[j].id) {
                i = 1;
                b = j;
                console.log("hello");
                break;
            }
        }
        if (i == 1) {
            remove_output.innerHTML = "";
            res.splice(j, 1);
            counter = 0;
            build(res, "output");
        } else {
            remove_output.style.color = "red";
            remove_output.innerHTML = "it doesn't exist in list";
        }

        // if (id < res.length) {
        //     remove_output.innerHTML = "";
        //     res.splice(id, 1);
        //     counter = 0;
        //     build(res, "output");
        // } else {
        //     remove_output.style.color = "red";
        //     remove_output.innerHTML = "it doesn't exist in list";
        // }

    });


    function laodJson(m, u, c) {
        var xHR = new XMLHttpRequest;
        xHR.open(m, u, true);
        xHR.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                res = JSON.parse(this.response);
                c(res);
            }
        }
        xHR.send();
    }
    // create html-------------------------------------------------------------------------
    function build(d, id) {
        var html = "";
        for (var i = 0; i < d.length; i++) {
            if (d[i].confirmed) {
                html += '<div class="bg-success text-white mt-2 p-3 rounded myclass">';
                html += '<span class="icon-cross float-right mr-2" style="font-size:18px" onclick="clo(this.parentElement,this)"></span>';
                counter += d[i].count;
            } else {
                html += '<div class="bg-danger text-white mt-2 p-3 rounded myclass">';
                html += '<span class="icon-cross float-right mr-2" style="font-size:18px" onclick="cl(this.parentElement,this)"></span>';
                html += '<span class="icon-checkmark float-right mr-2" style="font-size:18px" onclick="check(this.parentElement,this)"></span>';

            }
            html += d[i].id + "-";
            // in clo method index:2 in cl method index:3
            html += '<span class="n1">' + d[i].name + '</span>';
            // in clo method index:3 in cl method index:4
            html += '<span class="n" style="display:none">' + d[i].count + '</span>';
            html += '</div>'
        }
        result.innerHTML = "the number of guests(confirmed): " + counter + '<br>';
        result.innerHTML += "capacity: 30";
        document.getElementById(id).innerHTML = html;
    };
    // call loadJson method ----------------------------------------------------------------
    laodJson("GET", "https://api.myjson.com/bins/gk6ti", function(r) {
        build(r, "output");
    });

}