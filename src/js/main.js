function getURLParameter(name) {return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;} 
    function run_geo(geo_url){
        $.ajax({type: 'GET',url: geo_url,dataType: 'xml',
            success: function(xml) {$(xml).find('ip').each(function(){
            var city = $(this).find('city').text();
            var region = $(this).find('region').text();
            if(city!=region){var ipg = city+', '+region;}else{var ipg = city;}
            $('<input type="hidden" />').attr({name: 'location', class: 'location', value:ipg}).appendTo("form");
        });}});
    }
    
$(document).ready(function($) {

  $('form.newform input[name="phone"]').mask('9-999-999-99-99');
    $('form.newform input[name="phone"]').blur(function() {
        if($(this).val().length != 15) {
            $(this).parent().addClass('error-input');
        }
    });
  
  $('form.newform input[name="phone"]').focus(function() {
    $(this).parent().removeClass('error-input');
  });

  $('form.newform span.cross').click(function(event) {
        $(this).closest('.newinput-wrap').removeClass('error-input');

  });

  $.get("http://ipinfo.io", function(response) {geo_url='http://ipgeobase.ru:7020/geo?ip='+response.ip; run_geo(geo_url);}, "jsonp");
    utm=[];$.each(["utm_source","utm_medium","utm_campaign","utm_term",'source_type','source','position_type','position','added','creative','matchtype'],function(i,v){$('<input type="hidden" />').attr({name: v, class: v, value: function(){if(getURLParameter(v) == undefined)return '-'; else return getURLParameter(v)}}).appendTo("form")});
    $('<input type="hidden" />').attr({name: 'url', value: document.location.href}).appendTo("form");
    $('<input type="hidden" />').attr({name: 'title', value: document.title}).appendTo("form");
    
    $('.newsec .check').click(function() {



        if($(this).find('.checkbox').hasClass('active')){

            $(this).find('.checkbox').removeClass('active');
            $('button.newbutton').removeClass('active');
        
        }else{
        
            $(this).find('.checkbox').addClass('active');
            $('button.newbutton').addClass('active');
        
          
        }

    });


    	
    

    $('form.newform').submit(function(e){
        e.preventDefault();

        if ($(this).find('.newbutton').hasClass('active')) {            

            $(this).find('input[type="text"]').trigger('blur');
            if($(this).find('.error-input').length == 0){
                var type=$(this).attr('method');
                var url=$(this).attr('action');
                var data=$(this).serialize();
                $.ajax({type: type, url: url, data: data,
                    success : function(){

                        swal({
                            type: "success",
                            title: "Успешно!",
                            text: "Спасибо за Ваше обращение! Наши специалисты скоро с Вами свяжутся."
                        }, function () {
                        });                        

                        // $.arcticmodal('close');$('#form-block max-px-w600 mr-auto').arcticmodal();
                        //submit_track_event(track_event);
                    }
                }); 
            }
        }
    });
  
});