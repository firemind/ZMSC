$(document).ready(function(){
  $("#settings").live('pageshow', function(event){
    $("#username").val(settings.get("username"));
    $("#password").val(settings.get("password"));
    $("#url").val(settings.get("url"));
    $('#save-settings-btn').live('click', function(){
      formJSON = $('#settings form').first().formParams();
      settings.edit(formJSON.username, formJSON.password, formJSON.url);
    });
  });
});
