$(document).ready(function(){
  window.BookingFormView = Backbone.View.extend({
    tagName: 'form',
    el: $("#booking-form"),
    template:_.template($('#booking-form-template').html()),

    render:function (eventName) {
      this.$el.html(this.template({m:this.model }));
      acts = new Activities();
      as = new ActivitySelect({el: $("#select-activity"), collection: acts});
      ps = new ProjectSelect({el: $("#select-project"), collection: Collections.projects});
      ps.activitiesView = as;
      if(this.model.get('activity_id') != undefined){
        acts.add(Collections.activities.get(this.model.get('activity_id')));
      }
      $(this.el).trigger("create");
      return this;
    }
  });
  Option = Backbone.View.extend({
    tagName: 'option',
    render:function (eventName) {
      $(this.el).attr('value', this.model.get('id')).html(this.model.get('name'));
      return this;
    }
  });
  ProjectSelect = Backbone.View.extend({
    el: $("#select-project"),
    events: {
        "change": "changeSelected"
    },
    changeSelected: function(){
      this.setSelectedId($(this.el).val());
    },
    setSelectedId: function(id){
      ac = Collections.projects.get(id).getActivities();
      this.activitiesView.collection.reset(ac);
      $(this.activitiesView.el)[0].selectedIndex = 0;
      $(this.activitiesView.el).selectmenu("refresh");
    },
    initialize: function() {
      this.collection.on('dataload', this.addAll, this);
    },
    addOne: function(m){
        $(this.el).append(new Option({ model: m }).render().el);
    },
    addAll: function(){
      $(this.el).empty();
      _.each(this.collection.models, this.addOne, this);
      $(this.el).val($(this.el).jqmData('selid'));
      $(this.el).selectmenu();
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
        $(this.el).append(new Option({ model: m }).render().el);
    },
    addAll: function(){
      $(this.el).empty();
      _.each(this.collection.models, this.addOne, this);
    }
  });
  
  $("#form").live('pageshow', function(event){
    Collections.getProjects();
    $('#delete-booking-btn').live('click', function(){
      var bookingId = $('#form').jqmData('bookingId'),
          booking;
      if (bookingId){
          //editing
          booking = Collections.bookings.get(bookingId);
          if(!booking.destroy()){ 
            alert("destroy failed");
          }
      }
    });

    $('#save-booking-btn').live('click', function(){
      var bookingId = $('#form').jqmData('bookingId'),
          booking,
          formJSON = $('#booking-form form').first().formParams();
      if (bookingId){
          //editing
          booking = Collections.bookings.get(bookingId);
          if(booking.set(formJSON)){ 
            booking.save();
            changePage("#home", "fade", true, false);
          }else{
            alert("save failed");
            console.dir(formJSON);
            console.dir(booking);
          }
      }else{
          b = new Booking();
          b.set(formJSON);
          Collections.bookings.create(b.toJSON());
          changePage("#home", "fade", true, false);
      }
    });
  });
});
