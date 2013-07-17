
jQuery('a[href^="http://"]').attr('target', '_blank');
///New replies since last visit to thread
$('.element.boards li').each(function (i, o) {
    var obj = $(o);
    var text = obj.text();
    var i = text.lastIndexOf("(");
    var x = text.lastIndexOf(")");
    var comments = text.substring(i + 1, x);
    var key = $('a', obj).attr('href');
    var lastCount = localStorage.getItem(key);
    if (lastCount != null)
    {
        var newComments = comments-lastCount;
        if (newComments > 0)
        {
            obj.append(" ["+newComments+"]");
        }
    }
    else
    {
        obj.append(" ["+comments+"]");
    }
    obj.click(function() {
        localStorage.setItem(key,comments);    
    });
    
});

var commentsShow = false;
$('.story .metaData a[title^="Se"]').mouseover(function (e) {
    if (commentsShow == false) {
        commentsShow = true;
        var url = $(this).attr('href');
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        $('#example1-xy').html("X: " + x + " Y: " + y);
        var div = $('<div/>');
        div.css('position', 'absolute');
        var top = y + 20;
        div.css('top', top + 'px');
        div.css('background', 'rgba(255,255,255,0.95)');
        div.css('z-index', 10);
        div.css('width', '500px');
        div.css('margin-left', '10px');
        div.css('-webkit-box-shadow', '10px 10px 25px black');
        div.load(url + ' #comments', function () {
            if (div.html().length > 0) {
                div.click(function () {
                    $(this).remove();
                    commentsShow = false;
                });
                $('#container').prepend(div);
            }
            else {
                commentsShow = false;
            }
        });


    }
});