window.onload = init;

function init() {
    var add_output = document.getElementById("add_output");
    var remove_output = document.getElementById("remove_output");
    // add new guests--------------------------------------------------------------------------
    document.getElementById("send").addEventListener("click", function() {
        var name = document.forms[0].name.value;
        var count = Number(document.forms[0].count.value);
        var confirmed = document.forms[0].confirmed.value;
        var myid = document.forms[0].myid.value
        if (confirmed == "true") {
            confirmed = true;
        } else {
            confirmed = false;
        }
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

    });
    // remove a guest with id-------------------------------------------------------------------
    document.getElementById("remove").addEventListener("click", function() {
        var id = document.forms[1].id.value;
        // because array starts from 0 index
        id = Number(id) - 1;
        if (id < res.length) {
            remove_output.innerHTML = "";
            res.splice(id, 1);
            counter = 0;
            build(res, "output");
        } else {
            remove_output.style.color = "red";
            remove_output.innerHTML = "it doesn't exist in list";
        }

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
    laodJson("GET", "https://api.myjson.com/bins/10tx5f", function(r) {
        build(r, "output");
    });

}