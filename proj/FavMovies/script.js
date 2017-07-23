const baza = window.localStorage;

$(()=>{
   izpisLista();
   
   $('div[role="alert"]').hide();

   $("button").click(function() {    
       
       let podatkiFilma = $(this).parent().siblings();

       let najdenNaziv = false;
       let id = podatkiFilma[0].innerHTML;
       let naziv = podatkiFilma[1].innerHTML;
       let zvrst = podatkiFilma[2].innerHTML;
       let leto = podatkiFilma[3].innerHTML;

       var objektZFilmi = baza.getItem('mojiFilmi');

       if(objektZFilmi !== null){
        let parsaniObjekt = JSON.parse(objektZFilmi);
        for (var key in parsaniObjekt) {
            if(parsaniObjekt[key].naziv === naziv){
                $('div[role="alert"]').html(`Film <b>${parsaniObjekt[key].naziv}</b> je že dodan!`);
                $('div[role="alert"]').attr("class","alert alert-danger");
                $('div[role="alert"]').show();
                najdenNaziv = true;
                break;
            }
        }
        if (najdenNaziv === false) {
            let novPriljubljen = {"id":id, "naziv":naziv, "zvrst":zvrst, "leto":leto}; 
            parsaniObjekt.push(novPriljubljen);
            baza.setItem('mojiFilmi', JSON.stringify(parsaniObjekt));
            
           
            $('div[role="alert"]').html(`Film <b>${naziv}</b> je bil uspesno dodan!`);
            $('div[role="alert"]').attr("class","alert alert-success");
            $('div[role="alert"]').show();
            $('ul').empty();
            izpisLista();
        }
       }else{
           let dodajTaFilm = `[{"id":"${id}","naziv":"${naziv}", "zvrst":"${zvrst}", "leto":"${leto}"}]`;
            baza.setItem('mojiFilmi', dodajTaFilm);

            $('div[role="alert"]').html(`Film <b>${naziv}</b> je bil uspesno dodan!`);
            $('div[role="alert"]').attr("class","alert alert-success");
            $('div[role="alert"]').show();
            $('ul').empty();
            izpisLista();
       }
    });
    
    klikne();
});

function izpisLista(){
    let objektFilmi = baza.getItem('mojiFilmi');
    let counter = 0;
    if (objektFilmi!== null) {
        let pparsaniObjekt = JSON.parse(objektFilmi);
        for (var key in pparsaniObjekt) {
             $('ul').append("<li class='list-group-item'>"+"<span>"+pparsaniObjekt[key].naziv+"</span>"+" - "+"<a href='#'> Odstrani</a>" + "</li>");
            counter++;
        }
        if (counter === 0) {
            $('ul').append("<li class='bg-primary list-group-item text-white'>Ni priljubljenih filmov</li>");
        }
    } else {
        $('ul').append("<li class='bg-primary list-group-item text-white'>Ni priljubljenih filmov</li>");
    }
    
    klikne();
}

function klikne(){
    $("a").click(function() {    
       let filmVSeznamu = $(this).siblings('span').text();

       let movies = baza.getItem('mojiFilmi');
       let parsaniMovies = JSON.parse(movies);
       parsaniMovies = parsaniMovies.filter(function( obj ) {
            return obj.naziv !== filmVSeznamu;
       });

       baza.setItem('mojiFilmi', JSON.stringify(parsaniMovies));

       $('div[role="alert"]').html(`Film <b>${filmVSeznamu}</b> je bil izbrisan!`);
       $('div[role="alert"]').attr("class","alert alert-info");
       $('div[role="alert"]').show();
       $('ul').empty();
       izpisLista();
    });
}