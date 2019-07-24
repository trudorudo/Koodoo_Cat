$(document).ready(function () {
    // console.log("HELLO!")
    $('.sidenav').sidenav();
    $('.parallax').parallax();
  

    //typing text
    var i = 0;
    var txt = " All Tech News On One Page |"
    var speed = 80
    function typeWriter() {
        if (i < txt.length) {
            document.getElementById("txt").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();

    fetch(`/articles`).then(res => res.json()).then(articles => {
        var articlesDiv = document.querySelector('#articlesDiv');
        articles.slice(0, 5).forEach(a => {
            // console.log(a.title);
            var articlesCard = document.createElement('div');
            articlesCard.className += "row"
            articlesCard.innerHTML = `
        <div class = "col s12 m12">
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
                     
                 <button id="savearticle" class="btn waves-effect waves-light" type="submit" name="action" data-id = ${a._id}>Save Article
                      </button>
                  </div>
              </div>
          </div>
          </div>
          <hr>
          `
            articlesDiv.append(articlesCard);
        })
    })

    $(document).on("click", "#savearticle", function () {
        var articleID = $(this).attr("data-id");
        // console.log("article id= " + articleID + "is about to be saved");
        $.ajax({
            method: "PUT",
            url: "/marksaved/" + articleID,
        })
            .then(function (data) {
                console.log(data);
                location.reload();
                console.log("hello!")
            })
    });
});
