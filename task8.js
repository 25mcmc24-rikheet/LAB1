let bookArray = [];

$(document).ready(function () {

    $.ajax({
        url: "task8.xml",
        type: "GET",
        dataType: "xml",
        success: function (xml) {

            $(xml).find("book").each(function () {

                let book = {
                    title: $(this).find("title").text(),
                    author: $(this).find("author").text(),
                    genre: $(this).find("genre").text(),
                    price: parseFloat($(this).find("price").text()),
                    date: $(this).find("date").text()
                };

                bookArray.push(book);
            });

            loadGenre();
            displayBooks(bookArray);
        },
        error: function () {
            alert("Error loading XML");
        }
    });


    $("#search").click(function () {
        applyFilter();
    });

});


function loadGenre() {

    let genreList = [];

    for (let i = 0; i < bookArray.length; i++) {

        if (!genreList.includes(bookArray[i].genre)) {
            genreList.push(bookArray[i].genre);
        }
    }

    for (let j = 0; j < genreList.length; j++) {
        $("#genre").append("<option value='" + genreList[j] + "'>" + genreList[j] + "</option>");
    }
}


function displayBooks(data) {

    $("#bookTable tbody").empty();

    if (data.length === 0) {
        $("#bookTable tbody").append("<tr><td colspan='5'>No Data Found</td></tr>");
        return;
    }

    for (let i = 0; i < data.length; i++) {

        let row = "<tr>";
        row += "<td>" + data[i].title + "</td>";
        row += "<td>" + data[i].author + "</td>";
        row += "<td>" + data[i].genre + "</td>";
        row += "<td>" + data[i].price + "</td>";
        row += "<td>" + data[i].date + "</td>";
        row += "</tr>";

        $("#bookTable tbody").append(row);
    }
}


function applyFilter() {

    let g = $("#genre").val();
    let a = $("#author").val().toLowerCase();
    let min = $("#min").val();
    let max = $("#max").val();

    let result = [];

    for (let i = 0; i < bookArray.length; i++) {

        let match = true;

        if (g !== "all" && bookArray[i].genre !== g) {
            match = false;
        }

        if (a !== "" && !bookArray[i].author.toLowerCase().includes(a)) {
            match = false;
        }

        if (min !== "" && bookArray[i].price < parseFloat(min)) {
            match = false;
        }

        if (max !== "" && bookArray[i].price > parseFloat(max)) {
            match = false;
        }

        if (match) {
            result.push(bookArray[i]);
        }
    }

    displayBooks(result);
}