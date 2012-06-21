$(document).ready(function(){
  $("#reload").click(reloadPage);

  window.BookingView = Backbone.View.extend({
      tagName: 'li',

      template:_.template($('#booking-item-template').html()),

      render:function (eventName) {
        this.$el.html(this.template({m:this.model }));
        this.$el.jqmData('bookingId', this.model.get('id'));
        this.$el.bind('click', function(){
          $("#form").jqmData('bookingId', $(this).jqmData('bookingId'));
          booking = Collections.bookings.get($(this).jqmData('bookingId'));
          bookingFormView = new BookingFormView({model: booking});
          bookingFormView.render();
        });
        return this;
      }
  });
  window.DayView = Backbone.View.extend({
      attributes: {'data-role': "collapsible"},

    template:_.template($('#booking-list-template').html()),
      addBooking: function(booking){
        this.options.bookings.push(booking);
      },

      renderBookings: function(){
        myul = $(this.el).find("ul");
        $.each(this.options.bookings, function(i, b){
          myul.append(b.render().el);
        });
        return this;
      },
      render:function (eventName) {
        this.$el.html(this.template({weekday: this.options.bookings[0].model.getDateWeekday()}));
        return this;
      }
  });
  window.HomeView = Backbone.View.extend({
    el: $("#home"),
    addOne: function(booking) {
      var view = new BookingView({model: booking});
      if (this.days[booking.get("date")] == undefined){
        this.days[booking.get("date")] = new DayView({bookings: []});
      }
      this.days[booking.get("date")].addBooking(view);
    },
    addAll: function(){
      _.each(Collections.bookings.models, this.addOne, this);
      for (day in this.days) {
        $(this.days[day].render().el).appendTo("#booking-lists")
        this.days[day].renderBookings();
        $(this.days[day].el).trigger('create');
        $(this.days[day].el).collapsible();
        $(this.days[day].el).find("ul").listview();
      } 
    },
    initialize: function(){
      this.days = {};
      this.collection.on('dataload', this.addAll, this);
    }
  });
  new HomeView({collection: Collections.bookings});
  $("#add-booking-btn").bind('click', function(){
    $("#form").jqmRemoveData('bookingId');
    booking = new Booking();
    bookingFormView = new BookingFormView({model: booking});
    bookingFormView.render();
  });

});
$("#home").live('pageinit', function(){
  Collections.getBookings();
});
