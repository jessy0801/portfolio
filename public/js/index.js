jQuery.expr.filters.offscreen = function(el) {
    var rect = el.getBoundingClientRect();
    return (
        (rect.x + rect.width) < 0
        || (rect.y + rect.height) < 0
        || (rect.x > window.innerWidth || rect.y > window.innerHeight)
    );
};

var is_colliding = function( $div1, $div2 ) {
    // Div 1 data
    if ($div1 !== undefined && $div2 !== null) {
        var d1_offset             = $div1.offset();
        var d1_height             = $div1.outerHeight( true );
        var d1_width              = $div1.outerWidth( true );
        var d1_distance_from_top  = d1_offset.top + d1_height;
        var d1_distance_from_left = d1_offset.left + d1_width;

        // Div 2 data
        var d2_offset             = $div2.offset();
        var d2_height             = $div2.outerHeight( true );
        var d2_width              = $div2.outerWidth( true );
        var d2_distance_from_top  = d2_offset.top + d2_height;
        var d2_distance_from_left = d2_offset.left + d2_width;

        var not_colliding = ( d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left );

        // Return whether it IS colliding
        return ! not_colliding;
    } else {
        return false;
    }
};

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function totop() {
    $("#myBtn").animate({
       marginBottom: '+=200px'
    }, 500,function () {
        $("#myBtn").css({
            marginBottom: '-=200px'
        });
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });

}

$(function() {
    var $blocks = $('.animBlock.notViewed');
    var $window = $(window);

    $window.on('scroll', function(e){

        $blocks.each(function(i,elem){
            if($(this).hasClass('viewed'))
                return;

            isScrolledIntoView($(this));
        });
    });
});

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemOffset = 0;

    if(elem.data('offset') != undefined) {
        elemOffset = elem.data('offset');
    }
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    if(elemOffset != 0) { // custom offset is updated based on scrolling direction
        if(docViewTop - elemTop >= 0) {
            // scrolling up from bottom
            elemTop = $(elem).offset().top + elemOffset;
        } else {
            // scrolling down from top
            elemBottom = elemTop + $(elem).height() - elemOffset
        }
    }

    if((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) {
        // once an element is visible exchange the classes
        $(elem).removeClass('notViewed').addClass('viewed');

        var animElemsLeft = $('.animBlock.notViewed').length;
        if(animElemsLeft == 0){
            // with no animated elements left debind the scroll event
            $(window).off('scroll');
        }
    }
}

$(document).ready(function () {



    $('.navbar-toggler').click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
    });

    $('.test, .nav-link, .navbar-brand, .new-button').click(function() {
        var sectionTo = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(sectionTo).offset().top-50
        }, 1000);
        $($('.test, .nav-link, .navbar-brand, .new-button').parent()).addClass("active").not(this.parentNode).removeClass("active");
    });


    var ctx = document.getElementById("graph").getContext('2d');

    Chart.defaults.global.defaultFontColor = "#fff";


    var graph = new Chart(ctx, {
        type: 'horizontalBar',
        responsive: true,
        data: {
            labels: ["PHP/MySQL", "HTML/CSS", "JavaScript", "NodeJS", "Laravel", "Symfony", "WordPress", "CakePHP"],
            datasets: [{
                label: 'Compétence',
                data: [80, 70, 70, 60, 35, 30, 35 , 20 ],
                backgroundColor: [
                    'rgba(0, 15, 193, 0.5)',
                    'rgba(0, 15, 193, 0.5)',
                    'rgba(0, 15, 193, 0.5)',
                    'rgba(0, 15, 193, 0.5)',
                    'rgba(0, 15, 193, 0.5)',
                    'rgba(0, 15, 193, 0.5)',
                    'rgba(0, 15, 193, 0.5)',
                    'rgba(0, 15, 193, 0.5)'
                ],
                hoverBackgroundColor:[
                    'rgba(0, 216, 255, 0.5)',
                    'rgba(0, 216, 255, 0.5)',
                    'rgba(0, 216, 255, 0.5)',
                    'rgba(0, 216, 255, 0.5)',
                    'rgba(0, 216, 255, 0.5)',
                    'rgba(0, 216, 255, 0.5)',
                    'rgba(0, 216, 255, 0.5)',
                    'rgba(0, 216, 255, 0.5)'
                ],
                /*borderColor: [
                    'background-color: rgb(0, 216, 255);)',
                    'background-color: rgb(0, 216, 255);)',
                    'background-color: rgb(0, 216, 255);)',
                    'background-color: rgb(0, 216, 255);)',
                    'background-color: rgb(0, 216, 255);)',
                    'background-color: rgb(0, 216, 255);'
                ],*/
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: false
            },
            legend: {
                display: false,
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: 'white',
                    zIndex: 999,
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 90,
                    padding: -110
                }
            },



            scales: {
                yAxes: [{
                    ticks: {

                    },
                    gridLines: {
                        display: false ,
                        color: "#FFFFFF"
                    }
                }],
                xAxes: [{
                    offset: true,
                    ticks: {
                        suggestedMax:100,
                        beginAtZero:true

                    },
                    gridLines: {
                        display: true ,
                        color: "#FFFFFF"
                    }



                }]
            }


        }
    });


    $("#spaceship").attr("tabindex",-1).focus();


    var i=4;
    var fireRate = 10;
    var speed = 5;
    var bulletSpeed = 20;
    var keys = {};
    setInterval(movePlane, 20);


    $(document).keydown(function(e) {

        //Pour Evite de bouger la page en jouent
        if (e.keyCode == 32 | e.keyCode==39 | e.keyCode==37) {
            e.preventDefault();
        }

        keys[e.keyCode] = true;
    });

    $(document).keyup(function(e) {
        delete keys[e.keyCode];
    });

    function movePlane() {

        for (var direction in keys) {
            if (!keys.hasOwnProperty(direction)) continue;
            if (direction == 37) {
                $("#spaceship").animate({left: "-="+speed}, 0);
            }
            if (direction == 39) {
                $("#spaceship").animate({left: "+="+speed}, 0);
            }
            if (direction == 32) {
                i++;
                if (i == fireRate) {
                    $("#jumbotron").prepend('<img class="bullet"  src="public/img/mega-laser-1.png" style="top: ' + $('#spaceship').css('top') + ';left: ' + $('#spaceship').css('left') + ';margin-left: 8.5px "   />');

                    i=0;
                }

            }

        }
        var bullet = $(".bullet");

        if(bullet.length > 0) {
            var name = $('#name'),
                lastname = $('#lastname'),
                ecole= $('#ecole'),
                local = $('#local'),
                image = $('.img-profile');


            if (name.length>0 && is_colliding(bullet, name)) {
                fx(name);
                bullet.remove();

            }

            if ( image.length>0 && is_colliding(bullet, image)) {
                imgexplode(image);
                bullet.remove();

            }

            if (lastname.length>0 && is_colliding(bullet, lastname)) {
                fx(lastname);
                bullet.remove();

            }


            if (ecole.length>0 &&is_colliding(bullet, ecole)) {
                fx(ecole);
                bullet.remove();

            }

            if (local.length>0 &&is_colliding(bullet, local)) {
                fx(local);
                bullet.remove();

            }
        }

        $(bullet).stop().animate({
            top: '-=10'
        }, bulletSpeed);



        $('.bullet:offscreen').remove();

    }

});



function imgexplode(i) {
    $(i).explode({
        omitLastLine : false,
        radius : 500,
        minRadius : 10,
        release : false,
        fadeTime : 300,
        recycle : true,
        recycleDelay : 500,
        fill : true,
        explodeTime : 300,
        maxAngle : 360,
        gravity : 0,
        round : false,
        groundDistance : 400,
        ignoreCompelete : false,
        land:true,
        checkOutBound:true,
        finish:true
    });
}
function fx(o) {
    var $o = $(o);
    var test = $o.text();
    var defaulth = $o.height;
    var defaultw = $o.css('width');
    $o.html($o.text().replace(/([\S])/g, "<span>$1</span>"));
    $o.css("position", "relative");
    $("span", $o).each(function(i) {
        var newTop = Math.floor(Math.random()*500)*((i%2)?1:-1);
        var newLeft = Math.floor(Math.random()*500)*((i%2)?1:-1);
        console.log(newLeft);
        $(this).css({
            lineHeight: '50px',
            height:defaulth+'px',
            position: "absolute",
            opacity: 1,
            fontSize: 12,
            top: 0,
            left: 0,
            marginLeft:parseInt(defaultw, 10)/2+'px' ,
            float: 'none'
        }).animate({
            height:defaulth+'px',
            opacity: 0,
            fontSize: 84,
            top: newTop,
            left:newLeft
        },1000,function () {
            $o.find('span').remove();
            o.text(test);
        });
    });

}