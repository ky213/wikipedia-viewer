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

    return false;
});

$("#close-search").on("click", function () {
    $("#search-box")
        .animate({ width: 0 }, 300)
        .fadeOut(100, function () {
            $(".tobeFaded").fadeIn(500)
        })

    return false;
});


$("form").on("submit", function () {
    const query = $(this).find("input").val();
    const req = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=10&origin=*&search=" + query 
   

   // https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=usa&callback=angular.callbacks._0

    spinner('add');
    fetch(req).then(async function (res) {
        spinner('remove');
        console.log(await res.json());
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