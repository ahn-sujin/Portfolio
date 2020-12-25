$(function(){

/*-------scroll-------------------------------------------------------*/       
    //변수 선언 
    var win_w = $(window).width();
    var sec_pos = [];
    var html_tmp = '';
    var last = 0;

    var index = 0;
    var base_line = -300;
    var mvTrue = true;

    //1.위치 값 구하기 
    function save_offset_top(){
        sec_pos = [];

        $('section').each(function(){
            var this_offset = $(this).offset().top;
            sec_pos.push(this_offset);
        });

        last = $('section').last().offset().top + $('section').last().height();
        sec_pos.push(last);
    }

    //2. 페이지 이동 함수(movepage)
    function move_page(){
        $('html,body').stop().animate({'scrollTop':sec_pos[index]},1000);
    }

    //3. 페이지 이동 함수 (mousewheel)
    function mouse_wheel_scroll(){
        $(window).on('mousewheel DOMMouseScroll',function(e){

            e.bubbles == false;
            var evt = e.originalEvent;
            var result;

            result = (evt.wheelDelta) ? -evt.wheelDelta : evt.detail*40;

            if(mvTrue){
                mvTrue = false;
                (result>0) ? index += 1 : index -=1;
                if(index > $('section').length){
                    index = $('section').length;
                } else if(index < 0){
                    index = 0;
                }
                $('html,body').animate({'scrollTop':sec_pos[index]},700 ,function(){
                    mvTrue = true;
                });
            }

        });
    }

    //4.gnb 이벤트 연결
    $('#gnb>li').on('click',function(){
        index = $(this).index();
        move_page();
    });

    //5. pagenation 생성
    $('section').each(function(){
        var page_name = $(this).attr('data-page-name');
        html_tmp += '<a href="#">'+page_name+'</a>';
    });
    $('.pagenation').html(html_tmp);

    //6. pagenation 이벤트 연결 
    $('.pagenation').on('click','a',function(){
        index = $(this).index();
        move_page();
    });


    //7. 스크롤 모션 
    $(window).on('scroll',function(){
        var scroll = $(this).scrollTop();

        $('section').each(function(num){
            if(scroll >= sec_pos[num] +base_line && scroll < sec_pos[num+1]){
                $('section').removeClass('on').eq(num).addClass('on');
                $('#gnb>li').removeClass('on').eq(num).addClass('on');
                $('.pagenation').children('a').removeClass('on').eq(num).addClass('on');

            }
        });

    });

    //8. 리사이즈 - 반응형
    $(window).on('resize',function(){
        win_w = $(this).width();

        if(win_w >= 980){
            mouse_wheel_scroll();
        }else{
            $(window).off('mousewheel DOMMouseScroll');
        }
    });

    //9. 최초 실행 - 함수 호출
    save_offset_top(); 

    //10. 강제 이벤트 실행
    $(window).trigger('resize');


/*-------header-------------------------------------------------------*/    
    $('#header .toggle').on('click',function(e){
        e.preventDefault();
        
        $('.toggle').addClass('on');
        $('.cancle').addClass('on');

        if(win_w >= 768){
            $('.header_bg').addClass('on');
        } else{
            $('.nav_wrap').addClass('on');
        }
        
    });

    $('#header .cancle').on('click',function(e){
        e.preventDefault();

        $('.toggle').removeClass('on');
        $('.cancle').removeClass('on');

        if(win_w >= 768){
            $('.header_bg').removeClass('on');
        } else{
            $('.nav_wrap').removeClass('on');
        }

        
    });


/*-------intro-------------------------------------------------------*/ 
    $('#intro').addClass('on');

  

    









});