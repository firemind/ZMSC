$(document).ready(function(){
  $('body').bind('hideOpenMenus', function(){
    $("ul:jqmData(role='menu')").find('li > ul').hide();
  }); 
  var menuHandler = function(e) {
    $('body').trigger('hideOpenMenus');
    $(this).find('li > ul').show();
    e.stopPropagation();
  };
  $("ul:jqmData(role='menu') li > ul li").click(function(e) {
    $('body').trigger('hideOpenMenus');
    e.stopPropagation();
  });
  $('body').delegate("ul:jqmData(role='menu')",'click',menuHandler);
  $('body').click(function(e){
    $('body').trigger('hideOpenMenus');
  });
}
);
