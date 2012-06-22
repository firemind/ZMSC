$(document).ready(function(){
  // view for a booking
  window.BookingView = Backbone.View.extend({
    tagName: 'li',
    attributes: {
      'data-theme': 'b'
    },
    template:_.template($('#booking-item-template').html()),

    render:function (eventName) {
      // render template
      this.$el.html(this.template({m:this.model }));
      this.$el.jqmData('bookingId', this.model.get('id'));
      // when clicking the element
      this.$el.bind('click', function(){
        // set booking id
        $("#form").jqmData('bookingId', $(this).jqmData('bookingId'));
        booking = Collections.bookings.get($(this).jqmData('bookingId'));
        // create form view and render
        bookingFormView = new BookingFormView({model: booking});
        bookingFormView.render();
      });
      return this;
    }
  });

  // view for day
  window.DayView = Backbone.View.extend({
    attributes: {'data-role': "collapsible"},

    template:_.template($('#booking-list-template').html()),
    
    // add a booking
    addBooking: function(booking){
      this.options.bookings.push(booking);
    },

    // render all bookings
    renderBookings: function(){
      myul = $(this.el).find("ul");
      // for each booking
      $.each(this.options.bookings, function(i, b){
        // render and append
        myul.append(b.render().el);
      });
      return this;
    },

    render:function (eventName) {
      // render template
      this.$el.html(this.template({weekday: this.options.bookings[0].model.getDateWeekday()}));
      return this;
    }
  });

  // complete home view
  window.HomeView = Backbone.View.extend({
    el: $("#home"),

    // add a booking
    addOne: function(booking) {
      var view = new BookingView({model: booking});
      // day does not exist
      if (this.days[booking.get("date")] == undefined){
        // create day
        this.days[booking.get("date")] = new DayView({bookings: []});
      }
      // add booking to day
      this.days[booking.get("date")].addBooking(view);
    },

    // add all bookings
    addAll: function(){
      this.days = {};
      // empty the list
      $("#booking-lists").empty();
      // addOne for each booking
      _.each(Collections.bookings.models, this.addOne, this);
      // for each day
      for (day in this.days) {
        // render and append
        $(this.days[day].render().el).appendTo("#booking-lists");
        // render bookings and listview
        this.days[day].renderBookings();
        $(this.days[day].el).trigger('create');
        $(this.days[day].el).collapsible();
        $(this.days[day].el).find("ul").listview();
      } 
    },
    initialize: function(){
      this.collection.on('dataload', this.addAll, this);
      this.collection.on('destroy', this.addAll, this);
    }
  });
  new HomeView({collection: Collections.bookings});
  
  // on click to add
  $("#add-booking-btn").bind('click', function(){
    $("#form").jqmRemoveData('bookingId');
    booking = new Booking();
    bookingFormView = new BookingFormView({model: booking});
    bookingFormView.render();
  });

});

// when page loaded load bookings
$("#home").live('pageinit', function(){
  Collections.getBookings();

  // set reload button
  $("#reload").click(reloadPage);
});
