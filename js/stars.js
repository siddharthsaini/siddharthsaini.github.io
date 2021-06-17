$(function(){
    var screenHeight = screen.height;
    var screenWidth = screen.width;
    
    if(screenWidth <= 400){
        var smallStar = 250;
        var mediumStar = 100;
        var largeStar = 40;
    }
    if(screenWidth > 400 && screenWidth <= 1400){
        var smallStar = 350;
        var mediumStar = 200;
        var largeStar = 75;
    }
    if(screenWidth > 1400 && screenWidth <= 2500){
        var smallStar = 400;
        var mediumStar = 250;
        var largeStar = 100;
    }
    if(screenWidth > 1400){
        var smallStar = 420;
        var mediumStar = 275;
        var largeStar = 110;
    }

    var atrib = ""
    for(var i = 0; i < smallStar; i++){
        atrib += (Math.floor(Math.random() * screenWidth) + 1) + "px " + (Math.floor(Math.random() * screenHeight) + 1) + "px #FFF, ";
        if(i+1 == smallStar){
            atrib += (Math.floor(Math.random() * screenWidth) + 1) + "px " + (Math.floor(Math.random() * screenHeight) + 1) + "px #FFF";
        }
    }
    $($('#stars-small').children()[0]).css("box-shadow", atrib);

    var atrib = ""
    for(var i = 0; i < mediumStar; i++){
        atrib += (Math.floor(Math.random() * screenWidth) + 1) + "px " + (Math.floor(Math.random() * screenHeight) + 1) + "px #FFF, ";
        if(i+1 == mediumStar){
            atrib += (Math.floor(Math.random() * screenWidth) + 1) + "px " + (Math.floor(Math.random() * screenHeight) + 1) + "px #FFF";
        }
    }
    $($('#stars-medium').children()[0]).css("box-shadow", atrib);

    var atrib = ""
    for(var i = 0; i < largeStar; i++){
        atrib += (Math.floor(Math.random() * screenWidth) + 1) + "px " + (Math.floor(Math.random() * screenHeight) + 1) + "px #FFF, ";
        if(i+1 == largeStar){
            atrib += (Math.floor(Math.random() * screenWidth) + 1) + "px " + (Math.floor(Math.random() * screenHeight) + 1) + "px #FFF";
        }
    }
    $($('#stars-large').children()[0]).css("box-shadow", atrib);
});
