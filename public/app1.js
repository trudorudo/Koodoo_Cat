$(document).ready(function () {
    // console.log("HELLO!")

    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.fixed-action-btn').floatingActionButton();
    $('.modal').modal();


    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {
            direction: 'left'
        });
    });

    // $(function () {
    //     $.ajax("/saved", {
    //         type: "GET"
    //     }).then(function (data) {
    //         console.log(data[1]);
    //         for (var i = 0; i < data.length; i++) {
    //             $(".articlesCard").append('<div class="col s12 m12">' + ' <h2 class="header">' + data[i].title + '</h2>' + '<div class="card horizontal">'  +
    //                 '<div class="card-image" style=" max-width: 30%;">'
    //                 + '<img src=' + data[i].imgLink > + '>' +
    //                 '</div>' 

                    // ' <div class="card-stacked">' +
                    // ' <div class="card-content">' +
                    // '<p>' + data[i].content + '</p>' +
                    // ' </div>' +
                    // ' <div class="card-action">' +
                    // ' <a href=' + data[i].link + 'target="_blank" class="btn waves-effect waves-light">Link</a>' +

                    // '<button id="deleteArticle" class="btn waves-effect waves-light" type="submit" name="action" data-id=' + data[i]._id + '>Delete Article </button>' +
                    // ' <a id="notes" class="btn modal-trigger" href="#modal1" data-id=' + data[i]._id + '>Notes</a>' +
                    // ' </div> </div> </div> </div ><hr>  '
    //             )};
    //     });
    // });

    fetch(`/saved`).then(res => res.json()).then(articles => {
        var articlesDiv = document.querySelector('#savedArticlesDiv');
        articles.slice(0, 5).forEach(a => {
            // console.log(a.title);
            var articlesCard = document.createElement('div');
            articlesCard.className += "row"
            articlesCard.innerHTML = `
            <div class="col s12 m12">
            <h2 class="header"> ${a.title}</h2>

            <div class="card horizontal">
                <div class="card-image" style="    max-width: 30%;">
                    <img src=${a.imgLink}>
                </div>

                <div class="card-stacked">
                    <div class="card-content">
                        <p>${a.content}</p>
                    </div>
                    <div class="card-action">
                        <a href=${a.link} target="_blank" class="btn waves-effect waves-light">Link</a>

                        <button id="deleteArticle" class="btn waves-effect waves-light" type="submit"
                            name="action" data-id=${a._id}>Delete Article
                        </button>
                        <a id="notes" class="btn modal-trigger" href="#modal1" data-id=${a._id}>Notes</a>
                    </div>
                </div>

            </div>
        </div>
          <hr>
          `
            articlesDiv.append(articlesCard);
        });
    });




    //open model with notes
    $(document).on("click", "#notes", function () {
        var thisId = $(this).attr("data-id");
        // console.log(thisId);
        $("#savednotes").empty();
        $("#bodyinput").empty();
        $.ajax({
            method: "GET",
            url: "/article/" + thisId
        })
            .then(function (data) {
                console.log(data);
                $("#savednotes").append("<h5 class='notetitle'>" + data.title + "</h5>" + "<hr>");

                $("#savednotes").append("<h6 class='notetitle'>New Note</h6>");

                $("#savednotes").append("<textarea id='bodyinput' name='body' placeholder='Type your note here...'></textarea> ");
                $("#savednotes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
                $("#savednotes").append("<h6 class='notetitle'>My Note:</h6>");

                if (data.note.length >= 1) {
                    // Place the body of the note in the body textarea
                    for (var i = 0; i < data.note.length; i++) {
                        $("#savednotes").append("<p class='note'>" + "-" + data.note[i].body + "<button data-note_id=" + data.note[i]._id + " class='deleteNote'>delete</button> " + "</p>");
                    }
                } else $("#savednotes").append("<p> Oppps! Looks like you don't have any notes yet!");
            });
    });

    //save note of the artcle
    $(document).on("click", "#savenote", function () {
        var noteId = $(this).attr("data-id");
        // console.log(noteId);
        $.ajax({
            method: "POST",
            url: "/article/" + noteId,
            data: {
                body: $("#bodyinput").val(),
            }
        })
            .then(function (data) {
                console.log(data);
                $("#bodyinput").val("");
                location.reload();
            });
        $("#bodyinput").val("");
    })

    //delete article from saved (update status to "unsaved")
    $(document).on("click", "#deleteArticle", function () {
        var thisId = $(this).attr("data-id");
        $.ajax({
            type: "PUT",
            url: "/delete/" + thisId
        })
            .then(function (data) {
                // console.log(data);
                location.reload();
            })
    });

    //delete note
    $(document).on("click", ".deleteNote", function () {
        // console.log("delete!");
        var noteId = $(this).attr("data-note_id");
        // console.log(noteId)
        $.ajax({
            type: "GET",
            url: "/deletenote/" + noteId
        })
            .then(function (data) {
                location.reload();

            })
    })
});
