$(document).ready(function(){
    const kartica = $(".card");
    const karticaSeznam = $(".card .list-group");

    // $(".card").css("display", "none");
    kartica.hide();

    for (x in filmi.Movies) {
        let data = filmi.Movies[x].Title;
        $("ul:first").append("<li class='list-group-item list-group-item-action' data-id='"+ filmi.Movies[x].imdbID +"'>"+ data +"</li>");
    }

    $("ul:first li").click(function() {
        // $(".card").css("display", "flex");
        kartica.show();

        karticaSeznam.empty()
        let filmerino = $(this).attr('data-id');
        
        //sliko (Poster), naslov filma (Title), povzetek (Plot), seznam igralcev (Actors), povezavo na IMDb (imdbID) in povezavo na spletno stran (Website)
        let linkSlike;
        let naslovFilma;
        let povzetek;
        let igralci;
        let seznamIgralcev;
        let povezavaIMDb = "http://www.imdb.com/title/";
        let povezavaSpletnaStran;

        for(i = 0; i < filmi.Movies.length;i++){
            if(filmi.Movies[i].imdbID == filmerino){
                linkSlike = filmi.Movies[i].Poster;
                naslovFilma = filmi.Movies[i].Title;
                povzetek = filmi.Movies[i].Plot;
                igralci = filmi.Movies[i].Actors;
                povezavaIMDb += filmi.Movies[i].imdbID;
                povezavaSpletnaStran = filmi.Movies[i].Website;
                break;
            }
        }
        $(".card-img-top").attr("src",linkSlike);
        $(".card-title").text(naslovFilma);
        $(".card-text").text(povzetek);

        seznamIgralcev = vPolje(igralci);
        for (j = 0; j < seznamIgralcev.length; j++) {
            karticaSeznam.append("<li class='list-group-item'>"+ seznamIgralcev[j] +"</li>");
        }
        
        $(".card-link:first").attr( { href:povezavaSpletnaStran, target:"_blank" } );
        $(".card-link:last-child").attr( { href:povezavaIMDb, target:"_blank" } );
    });

    $("button").click(function() {
    // $(".card").css("display", "none");
       kartica.hide();
    });
});

function vPolje(potato){
    return potato.split(",");
}