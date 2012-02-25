// ==UserScript==
// @name           Reddit Auto-Hide
// @namespace      net.dschep.reddit-autohide
// @description    Hides posts as you visit them.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        http://www.reddit.com/*
// ==/UserScript==

$(document).ready(function () {
    $('a.title').mousedown(function (e) {
        if (e.which == 3) return; // ignore right click

        var $this = $(this)
        $.post('/api/hide', {
            executed: 'hidden',
            id: $this.closest('.thing').attr('data-fullname'),
            renderstyle: 'html',
            uh: $('[name=uh]').val()
        });
    });
});
