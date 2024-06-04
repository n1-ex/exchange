//alert(11);
jQuery(function($) {

    //alert(22);

    var inItems = $('.col-in .row-payment');
    var outGroups = $('.col-out .group, .col-reserve .group');
    var outItems = $('.col-out .row-payment, .col-reserve .row-payment');

    inItems.mouseover(function() {
        inItems.removeClass('active');
        $(this).addClass('active');
        outGroups.hide();
        $('.group-' + $(this).attr('rel')).show();
        outItems.removeClass('active');
    });

    outItems.mouseover(function() {
        var inId = $('.col-in .row-payment.active').attr('rel');
        var outId = $(this).attr('rel');
        outItems.removeClass('active');
        $('.out-' + inId + '-' + outId).addClass('active');
    });

    $('.col-out .row-payment').click(function() {
        if (!$(this).hasClass('disabled')) {
            location.href = $(this).data('url');
        }
    });

    $('.currency-filter > li > a').on('click', function(e) {
        e.preventDefault();
        var
            $ul = $(this).closest('ul'),
            $parent = $(this).closest('.col'),
            group = $(this).attr('href').replace('#', ''),
            $rel = $parent.hasClass('col-out') ? $('.col-out, .col-reserve') : $parent;

        if (group == 'all') {
            $('.row-payment', $rel).show();
        } else {
            $('.row-payment[data-currency-group!=' + group + ']', $rel).hide();
            $('.row-payment[data-currency-group=' + group + ']', $rel).show();
        }
        $('li', $ul).removeClass('active');
        $(this).parent().addClass('active');

        if ($('.row-payment.active', $rel).css('display') == 'none') {
            $('.row-payment.active', $rel).removeClass('active');
            if ($parent.hasClass('col-in')) {
                $('.row-payment[data-currency-group=' + group + ']', $rel).eq(0).mouseover();
            }
        }
    });

});
