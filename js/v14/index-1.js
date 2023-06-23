const socket = io({
    path: '/sockets',
    query: {
        page: 'main'
    }
});

var serversData = [],
    initCounter = false;

$('.howtostart-button').on('mouseenter', function() {
    $('.cars__item').addClass('hovered');
});

$('.howtostart-button').on('mouseleave', function() {
    $('.cars__item').removeClass('hovered');
});

function plural(forms, n) {

    let idx;

    if(n % 10 === 1 && n % 100 !== 11) {

        idx = 0;

    } else if(n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {

        idx = 1;

    } else {

        idx = 2;

    }

    return forms[idx] || '';

}

function InitServers() {

    socket.emit('site', {
        type: 'servers'
    }, (response) => {

        if(!response) return false;

        serversData = response;

        SetOnline();

    });

}

InitServers();

socket.on('servers', (response) => {

    if(!response) return false;

    serversData = response;

    SetOnline();

});

function SetOnline() {

    if(!serversData) return false;

    let maxOnline = 1000,
        currentOnline = 0,
        online24Hours = 0,
        playersAmount = 0,
        record = serversData.record || 0;

    if(serversData.online)
        for(let [key, server] of Object.entries(serversData.online)) {

            if(!server) continue;

            online24Hours += server.online24Hours;
            playersAmount += server.playersAmount;
            currentOnline += server.currentOnline;

            $('.block.two .servers-content > .servers__item').eq(key - 1).find('.item__online').text(server.currentOnline + '/' + maxOnline);

        }

    $('.block.two #current_online > span').text(currentOnline + ' ' + plural(['игрок', 'игрока', 'игроков'], currentOnline));

    $('.block.two .stats-wrapper .stats__item#record > .item__amount').text(record);
    $('.block.two .stats-wrapper .stats__item#hours24 > .item__amount').text(online24Hours);
    $('.block.two .stats-wrapper .stats__item#alltime > .item__amount').text(playersAmount);

    if(!initCounter)
        $(function() {

            initCounter = true;
        
            var target_block = $(".stats-wrapper");
            var blockStatus = true;
            
            $(window).on('scroll', function() {
            
                var scrollEvent = ($(window).scrollTop() > (target_block.position().top - $(window).height()));
                
                if(scrollEvent && blockStatus) {
                
                    blockStatus = false;
        
                    $(".stats-wrapper > .stats__item > .item__amount").each(function(key, item) {
        
                        var numb_end = $(item).text();
        
                        $({numberValue: 0}).animate({numberValue: numb_end}, {
                        
                            duration: 3000,
                            easing: "swing",
                            
                            step: function(val) {
                            
                                $(item).html(Math.ceil(val));
                                
                            }
                            
                        });
        
                    });
                    
                }
                
            });
            
        });

}