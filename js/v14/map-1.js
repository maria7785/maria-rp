const socket = io({
    path: '/sockets',
    query: {
        page: 'map'
    }
});

var map_field = $('.map-inner > .map-object'),
    mapsData = null;

function getVH(px) {
	return px * (100 / document.documentElement.clientHeight);
}

$('.map-filters').on('click', '.filter__item', function() {

    var _this = $(this),
        _this_type = _this.data('type'); 

    if(!_this.hasClass('active')) {

        _this.addClass('active');
        map_field.find('.map__item.' + _this_type).fadeOut(250);

    }
    else {

        _this.removeClass('active');
        map_field.find('.map__item.' + _this_type).fadeIn(250);

    }

});

$('.map__server select').on('select2:select', function (e) {
    var _this = $(this),
        _this_val = _this.val();

    PrintObjects(_this_val);
});

function InitObjects() {

    socket.emit('site', {
        type: 'maps'
    }, (response) => {

        if(!response) return false;

        mapsData = response;

        PrintObjects();

    });

}

function PrintObjects(_server = 1) {

    if(_server == null || !mapsData || !mapsData[_server]) return false;

    map_field.html('');

    var objects = mapsData[_server];

    var html = '';
    $.each(objects['houses'], function(key, item) {
        var left = 0,
            top = 0,
            status = 'free',
            desc = '',
            owner = 'отсутствует';

        if(item.x > 0) left = (3000 + Math.abs(item.x)) / 6;
        else left = (3000 - Math.abs(item.x)) / 6;
        if(item.y > 0) top = (2950 - Math.abs(item.y)) / 6;
        else top = (2950 + Math.abs(item.y)) / 6;

        if(item.owner_id > 0) {
            owner = item.owner_name;
            status = 'busy';
        }
        else status = 'free'; 
        
        desc += 'Дом #' + item.id;
        desc += '<br>';
        desc += 'Стоимость ' + item.price + ' руб.';
        desc += '<br>';
        desc += 'Владелец ' + owner;

        html += '<div style="left: '+ left +'px; top: '+ top +'px" class="map__item house '+ status +' wow animate__animated animate__bounceIn" data-tippy-content="'+ desc +'"></div>';
    });
    map_field.append(html);

    var html = '';
    $.each(objects['garages'], function(key, item) {
        var left = 0,
            top = 0,
            status = 'free',
            desc = '',
            owner = 'отсутствует';

        if(item.x > 0) left = (3000 + Math.abs(item.x)) / 6;
        else left = (3000 - Math.abs(item.x)) / 6;
        if(item.y > 0) top = (2950 - Math.abs(item.y)) / 6;
        else top = (2950 + Math.abs(item.y)) / 6;

        if(item.owner > 0) {
            owner = item.owner_name;
            status = 'busy';
        }
        else status = 'free'; 
        
        desc += 'Гараж #' + item.id;
        desc += '<br>';
        desc += 'Стоимость ' + item.price + ' руб.';
        desc += '<br>';
        desc += 'Владелец ' + owner;

        html += '<div style="left: '+ left +'px; top: '+ top +'px" class="map__item garage '+ status +' wow animate__animated animate__bounceIn" data-tippy-content="'+ desc +'"></div>';
    });
    map_field.append(html);

    var html = '';
    $.each(objects['fuel_stations'], function(key, item) {
        var left = 0,
            top = 0,
            status = 'free',
            desc = '',
            owner = 'отсутствует';

        if(item.x > 0) left = (3000 + Math.abs(item.x)) / 6;
        else left = (3000 - Math.abs(item.x)) / 6;
        if(item.y > 0) top = (2950 - Math.abs(item.y)) / 6;
        else top = (2950 + Math.abs(item.y)) / 6;

        if(item.owner_id > 0) {
            owner = item.owner_name;
            status = 'busy';
        }
        else status = 'free'; 
        
        desc += item.name;
        desc += '<br>';
        desc += 'Стоимость ' + item.price + ' руб.';
        desc += '<br>';
        desc += 'Цена за литр ' + item.fuel_price + ' руб.';
        desc += '<br>';
        desc += 'Владелец ' + owner;

        html += '<div style="left: '+ left +'px; top: '+ top +'px" class="map__item fuel '+ status +' wow animate__animated animate__bounceIn" data-tippy-content="'+ desc +'"></div>';
    });
    map_field.append(html);

    var html = '';
    $.each(objects['business'], function(key, item) {
        var left = 0,
            top = 0,
            status = 'free',
            desc = '',
            owner = 'отсутствует';

        if(item.x > 0) left = (3000 + Math.abs(item.x)) / 6;
        else left = (3000 - Math.abs(item.x)) / 6;
        if(item.y > 0) top = (2950 - Math.abs(item.y)) / 6;
        else top = (2950 + Math.abs(item.y)) / 6;

        if(item.owner_id > 0) {
            owner = item.owner_name;
            status = 'busy';
        }
        else status = 'free';
        
        desc += item.name;
        desc += '<br>';
        desc += 'Стоимость ' + item.price + ' руб.';
        desc += '<br>';
        desc += 'Владелец ' + owner;

        html += '<div style="left: '+ left +'px; top: '+ top +'px" class="map__item business '+ status +' wow animate__animated animate__bounceIn" data-tippy-content="'+ desc +'"></div>';
    });
    map_field.append(html);

    tippy('.map__item', {
        animation: 'perspective',
        theme: 'translucent',
        followCursor: true,
        allowHTML: true
    });

}

InitObjects();