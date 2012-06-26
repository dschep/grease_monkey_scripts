// ==UserScript==
// @name           Reddit Scroll-Spy-Hide
// @namespace      net.dschep.reddit-scrollspyhide
// @description    Hides posts as you scroll past them.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        http://www.reddit.com/*
// @include        https://www.reddit.com/*
// @include        https://pay.reddit.com/*
// ==/UserScript==

$(document).ready(function () {
    var things = $('.things');
    $(window).scroll(function () {
        var scrollTop= $(body).scrollTop();
        $('.link').not('.hidden').filter(function () {
            return ($(this).offset().top < scrollTop || // off screen
                    // or at bottom of page
                    scrollTop >= $('body').height() - $(window).height() - 10)
        }).each(function () {
            var $this = $(this);
            $.post('/api/hide', {
                executed: 'hidden',
                id: $this.data('fullname'),
                renderstyle: 'html',
                uh: $('[name=uh]').val()
            }, function () {
                $this.addClass('hidden')
                    .find('.hide-button a:contains(hide)')
                    .attr('onclick', "change_state(this, 'unhide', hide_thing);")
                    .text('unhide');
            });
        });
    });
});
