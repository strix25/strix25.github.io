$(document).ready(function () {
    const prikaziKom = $( ".card-block a:first" );
    const seznamKom = $("ul"); 
    const steviloKom = $("#stKomentarjev");
    const oddajKom = $(".card-block a:nth-last-child(2)");
    const dialog = $("#dialog");

    dialog.hide();
    $(".notification").hide();
    
    steviloKom.text(prestejKomentarje());

    prikaziKom.text('Skrij komentarje');
    prikaziKom.click(function () {
            let toglanjeKomentara = prikaziKom.text();
            seznamKom.toggle("slide", 500);
            prikaziKom.text((prikaziKom.text() === 'Prikaži komentarje') ? 'Skrij komentarje' : 'Prikaži komentarje'); 
    });

    oddajKom.click(function () {
            prikaziKom.text('Skrij komentarje');
            seznamKom.show( "fold", 500 );
            $('#dialog').dialog({
                modal: true,
                dialogClass: 'no-close',
                buttons : {
                    'Dodaj' : {
                        text : "Dodaj",
                        click : function(){
                                    $(".notification").hide();
                                    let zapre = false;
                                    if($("#vzdevek").val()=== ""){
                                        $(".notification:first").show();
                                        zapre = true;
                                    }
                                    if($("#komentar").val()=== ""){
                                        $(".notification").eq(1).show();
                                        zapre=true;   
                                    }if(zapre===false){
                                        dodajKomentar();

                                        $(this).dialog('close')
                                        zbrisiVsebino();
                                        steviloKom.text(prestejKomentarje());
                                    }
                                }
                    },
                    'Prekliči' : {
                        text : "Prekliči",
                        click : function(){
                            $(this).dialog('close')
                            zbrisiVsebino();
                        }
                    }
                }
            });
    });
});

function prestejKomentarje(){
    return $("ul li").length;
}

function zbrisiVsebino(){
    $("#komentar").val("");
    $("#vzdevek").val("");
}

function dodajKomentar(){
    let vvzdevek = $("#vzdevek").val();
    let kkomentar = $("#komentar").val();

    $("ul").append("<li class='list-group-item'><div class='w-100'><h5>" + vvzdevek +"</h5></div><p>"+ kkomentar +"</p></li>");
    $("ul li:last-child").addClass( "list-group-item-success", 500, "easeOutBounce" );
    setTimeout(function(){
         $("ul li:last-child").removeClass( "list-group-item-success", 500, "easeInBack" );
    }, 2000);
}