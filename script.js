$("#custom-search").on("click", function (e) {
    $(".tobeFaded").fadeOut(300, () => {
        $("#search-box")
            .removeClass('d-none')
            .fadeIn(100, function () {
                $("#search input")[0].focus();
                $(this).animate({
                    width: "70%"
                }, 300)
            })
    });
    return false
});

$("#close-search").on("click", function () {
    $("#search-box")
        .animate({ width: "1%" }, 300)
        .fadeOut(100, function () {
            $(".tobeFaded").fadeIn(500)
        })

    return false;
});


$("form").on("submit", function () {
    const query = $(this).find("input").val();
    const req = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=10&origin=*&search=" + query


    spinner('add');
    fetch(req).then(async function (res) {
        spinner('remove');
        $('#results ul')
            .empty()
            .fadeOut(300)
        spreadResult(await res.json());
    }).catch(function (err) {
        spinner('remove');
        console.log("Error", err);
    })

    return false;
});

function spinner(action) {
    if (action === 'add') {
        $("#spinner").removeClass('fa-search')
            .addClass('fa-spinner fa-pulse')

    } else {
        $("#spinner").removeClass('fa-spinner fa-pulse')
            .addClass('fa-search')
    }
}

function spreadResult(r) {
    r.shift()
    r.forEach(function (val, i) {
        val.forEach(function (text, j) {
            let link = $("<a href='#' target='_blank' class='d-block pl-3 text-dark'></a>"),
                title = $("<h3></h3>"),
                body = $("<p class='lead'></p>")

            title.text(r[0][j]);
            body.text(r[1][j]);
            link.attr('href', r[2][j])
                .append(title, body)
            $('#results ul')
                .append(link)
                .fadeIn(300)
        })
    })
}

