$(function () {
    $('#lLi').mousemove(function () {
        $('.show').show()
    })
    $('.show').mouseout(function () {
        $('.show').hide()
    })
    $('#inpID').focus(function () {
        $('.top-b').children('.top-b-ul-r').find('li').hide()
    }).blur(function(){
        $('.top-b').children('.top-b-ul-r').find('li').show()
    })
    $('.top-b').children('.top-b-ul-r').find('a').find('s').click(function(){
        window.location.href='https://www.vmall.com/list-111'
    })

    /*   $(".classify ul li a").each(function () {
     $(this).click(function () {
     var sibl = $(this).parent().siblings()
     $(sibl).each(function () {
     $(this).find('a').removeClass("ys")

     })
     $(this).addClass("ys")
     })

     })

     $('.price ul li a').each(function () {
     $(this).click(function () {
     var sibl = $(this).parent().parent().children()
     $(sibl).each(function () {
     $(this).find('a').removeClass('ys')
     $(this).find('a').find('s').removeClass('orderBy_asc')
     .removeClass('orderBy_desc')
     .removeClass('commands_order_desc')
     })
     $(this).addClass('ys')
     var type = $(this).attr('type')
     if (type == 'jg' || type == 'sj') {
     var flag = $(this).attr('flag')
     if (flag) {
     $(this).find('s').addClass('orderBy_asc')
     alert(flag)
     console.log(this);
     $(this).attr('flag', '')
     } else {
     $(this).find('s').addClass('orderBy_desc')
     $(this).attr('flag', 'true')
     alert(flag)
     console.log(this);
     }

     } else if (type == 'pjs') {
     $(this).find('s').addClass('commands_order_desc')
     }
     })

     })*/

    $(".classify ul li a").each(function () {
        $(this).click(function () {
            var fu = $(this).parent().siblings()
            $(fu).each(function () {
                $(this).find('a').removeClass('ys')
            })
            $(this).addClass('ys')
        })
    })

    $(".price ul li a").each(function () {
        $(this).click(function () {
            var lli = $(this).parent().parent().children()
            lli.each(function () {
                $(this).find('a').removeClass('ys')
                $(this).find('a').find('s').attr('flag', 'true')
                    .removeClass('orderBy_asc')
                    .removeClass('orderBy_desc')


            })
            $(this).addClass('ys')
            var type = $(this).attr('type')
            var flag = $(this).attr('flag')
            console.log(this);
            if (type == 'jg' || type == 'sj') {

                if (flag) {
                    $(this).find('s').addClass('orderBy_asc')
                    $(this).attr('flag', '')
                } else {
                    $(this).find('s').addClass('orderBy_desc')
                    $(this).attr('flag', 'true')
                }
            } else if (type == 'pjs') {
                $(this).addClass('commands_order_desc')
            }
        })
    })
    fn()
})
;

/*ajax*/
function fn() {
    $.ajax({
        url: 'data/productsList.json',
        type: 'post',
        dataType: 'json',
        success: function (res) {
            $(res).each(function () {
                //创建li标签
                var liObj = $('<li>')
                //创建div标签
                var divObj = $('<div>')
                //创建span标签在后面插入imh标签的src=后台接口的img路径然后插入div里面
                $("<span>").append($('<img>').attr('src', this.productImg)).appendTo(divObj);
                //创建span标签后面插入a设置的href属性设置为javascript 让他的内容是描述内容然后插入div里面
                $("<span>").append($("<a>").attr('href', 'javascript:;').html(this.productIntro)).appendTo(divObj)

                $('<span>').html(this.productPrice).appendTo(divObj)
                var p1 = $('<p>').html('参加抢购').click(function () {
                    window.location.href = '详情页.html'
                })
                var p2 = $('<p>').html(this.productEvaluate + '人评价')
                $("<span>").append(p1).append(p2).appendTo(divObj)
                $('<img>').addClass('iMg').attr("src", "imgs/s" + this.productStatus + ".png").appendTo(divObj)
                divObj.css('position', 'relative'),
                    divObj.appendTo(liObj)
                liObj.appendTo($('#uls'))

            })
        }
    })

    /*底下图片*/

    $('.preview ul li').each(function () {
        $(this).click(function () {
            $('.container .onshow').find('img').attr('src', $(this).find('img').attr('liImg'))
            $('#dt').find('img').attr('src', $(this).find('img').attr('liImg'))
            $(this).siblings().removeClass('active_pic')
            $(this).addClass('active_pic')
        })
    })
    var dqy = 0  //当前页
    var liW = $('.container .preview ul li:eq(0)').outerWidth() //每个li的宽度
    var mygs = 6 //每页的个数
    var lizkd = $(".preview ul li").length  //li宽度
    var zys = lizkd % mygs == 0 ? lizkd / mygs : Math.floor(lizkd / mygs);
    $('#left_btn').click(function () {
        console.log(dqy);
        // 如果当前页大于0 让他-去一个图片的宽度乘上每页的个数*--当前页
        if (dqy > 0) {
            $('.container .preview ul').css('left', -liW * mygs * (--dqy) + 'px')
        }
    })
    $('#right_btn').click(function () {
        if (dqy < zys) {
            //如果当前页小于总页数就让他移动每个宽度乘上他的每页的个数乘上当前页++
            $('.container .preview ul').css('left', -liW * mygs * (++dqy) + 'px')
        }
    })

    /*放大镜*/
    $('.onshow').mouseenter(function () {
        $('.mark').show()
        $('#dt').show()

    })
    $('.onshow').mousemove(function (e) {
        var e = e || event

        var l = e.pageX - $(this).offset().left - $('.mark').outerWidth() / 2
        var t = e.pageY - $(this).offset().top - $('.mark').outerHeight() / 2
        if (l <= 0) {
            l = 0
        } else if (l >= $(this).outerWidth() - $('.mark').outerWidth()) {
            l = $(this).outerWidth() - $('.mark').outerWidth
        }
        if (t <= 0) {
            t = 0
        } else if (t >= $(this).outerHeight() - $('.mark').outerHeight()) {
            t = $(this).outerHeight() - $('.mark').outerHeight()
        }
        $('.mark').css({'left': l + 'px', 'top': t + 'px'})
        // 阴影左右移动的范围除去左边盒子的宽减去里面小盒子的宽乘大盒子减去大盒子的图片的宽度
        var L = l / ($('.onshow').outerWidth() - $('.mark').outerWidth()) * ($('#dt').outerWidth() - $('#dt img').outerWidth())
        var T = t / ($('.onshow').outerHeight() - $('.mark').outerHeight()) * ($('#dt').outerHeight() - $('#dt img').outerHeight())
        $('#dt img').css({'left': L + 'px', 'top': T + 'px'})

        //console.log(T);
    })
    $('.onshow').mouseleave(function () {
        $('.mark').hide()
        $('#dt').hide()
    })

}
