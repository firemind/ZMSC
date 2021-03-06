$(document).ready(function(){
  window.BookingFormView = Backbone.View.extend({
    tagName: 'form',
    el: $("#booking-form"),
    template:_.template($('#booking-form-template').html()),

    render:function (eventName) {
      // render template
      this.$el.html(this.template({m:this.model }));
      acts = new Activities();
      // select box activities
      as = new ActivitySelect({el: $("#select-activity"), collection: acts});
      // select box projects
      ps = new ProjectSelect({el: $("#select-project"), collection: Collections.projects});
      ps.activitiesView = as;
      if(this.model.get('activity_id') != undefined){
        acts.add(Collections.activities.get(this.model.get('activity_id')));
      }
      $(this.el).trigger("create");
      return this;
    }
  });

  // option view for select
  Option = Backbone.View.extend({
    tagName: 'option',
    render:function (eventName) {
      $(this.el).attr('value', this.model.get('id')).html(this.model.get('name'));
      return this;
    }
  });

  // project select view
  ProjectSelect = Backbone.View.extend({
    el: $("#select-project"),

    events: {
        "change": "changeSelected"
    },

    changeSelected: function(){
      this.setSelectedId(parseInt($(this.el).val()));
    },

    setSelectedId: function(id){
      ac = Collections.projects.get(id).getActivities();
      this.activitiesView.collection.reset(ac);
      $(this.activitiesView.el)[0].selectedIndex = 0;
      $(this.activitiesView.el).selectmenu();
      $(this.activitiesView.el).selectmenu("refresh");
    },

    initialize: function() {
      this.collection.on('dataload', this.addAll, this);
    },

    addOne: function(m){
        // render option
        $(this.el).append(new Option({ model: m }).render().el);
    },

    addAll: function(){
      // empty the select
      $(this.el).empty();
      // render all options
      _.each(this.collection.models, this.addOne, this);
      // rerender selectmenu
      $(this.el).selectmenu();
      if($(this.el).jqmData('selid') != "undefined"){
        $(this.el).val($(this.el).jqmData('selid'));
      }else{
        $(this.el).find("option").first().attr('selected', true);
        this.changeSelected();
      }
      $(this.el).selectmenu("refresh");
    }
  });

  ActivitySelect = Backbone.View.extend({
    el: $("#select-activity"),
    initialize: function() {
      this.collection.on('reset', this.addAll, this);
      this.collection.on('add', this.addAll, this);
    },

    addOne: function(m){
        // render the option
        $(this.el).append(new Option({ model: m }).render().el);
    },

    addAll: function(){
      // empty the select
      $(this.el).empty();
      // render all options
      _.each(this.collection.models, this.addOne, this);
    }
  });
  
  // when page shown
  $("#form").live('pageshow', function(event){
    // get all projects
    Collections.getProjects();
    
    // delete button
    $('#delete-booking-btn').live('click', function(){
      var bookingId = $('#form').jqmData('bookingId'),
          booking;
      if (bookingId){
          // get booking and destroy
          booking = Collections.bookings.get(bookingId);
          if(!booking.destroy()){ 
            alert("destroy failed");
          }else{
            $.mobile.showPageLoadingMsg( $.mobile.pageLoadErrorMessageTheme, "deleted sucessfully", true );
            setTimeout( $.mobile.hidePageLoadingMsg, 1500 );
            $.mobile.changePage("#home", "fade", true, false);
          }
      }
    });

    $('#save-booking-btn').live('click', function(){
      var bookingId = $('#form').jqmData('bookingId'),
          booking;

      formJSON = $('#booking-form form').first().formParams();
      if (bookingId){ // get booking, set and save
        booking = Collections.bookings.get(bookingId);
        if(booking.set(parseDates(formJSON))){ 
          $.mobile.showPageLoadingMsg( $.mobile.pageLoadErrorMessageTheme, "saved sucessfully", true );
          setTimeout( $.mobile.hidePageLoadingMsg, 1500 );
          // go to home
          if(booking.save() && booking.get("end_time") != undefined){
            $.mobile.changePage("#home", "fade", true, false);
          }
        }
      }else{ // create new booking
        if(booking = Collections.bookings.create(parseDates(formJSON))){
          $.mobile.showPageLoadingMsg( $.mobile.pageLoadErrorMessageTheme, "saved sucessfully", true );
          setTimeout( $.mobile.hidePageLoadingMsg, 1500 );
          // go to hom
          if(formJSON.end_time != ""){
            $.mobile.changePage("#home", "fade", true, false);
          }else{
            $('#form').jqmData('bookingId', Collections.bookings.get("id"));
          }
        }
      }
      reloadPage();
    });
    // finish button
    $('#finish-booking-btn').live('click', function(){
      var bookingId = $('#form').jqmData('bookingId'),
          booking;
      if (bookingId){
          // get booking and destroy
          booking = Collections.bookings.get(bookingId);
          booking.set({end_time: new Date()});
          if (booking.save()){
            $.mobile.showPageLoadingMsg( $.mobile.pageLoadErrorMessageTheme, "finished sucessfully", true );
            setTimeout( $.mobile.hidePageLoadingMsg, 1500 );
            $.mobile.changePage("#home", "fade", true, false);
          }
      }
    });
  });
});
