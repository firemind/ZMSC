class BookingsController < ApplicationController
  def index
    @bookings = current_user.bookings
    
    render json: @bookings.order("date DESC")
  end

  def show
    render json: current_user.bookings.find(params[:id])
  end

  def create
    
    @booking = current_user.bookings.build(params[:booking])
    
    #TODO: remove this ugly fix for date/tiem problems on client
    @booking.date += 1.day
    @booking.start_time += 1.hour
    @booking.end_time += 1.hour if @booking.end_time
    if @booking.save
      render json: @booking, status: :created, location: @booking
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  def update
    
    @booking = current_user.bookings.find(params[:id])

    if @booking.update_attributes(params[:booking])
      #TODO: remove this ugly fix for date/tiem problems on client
      @booking.date += 1.day
      @booking.start_time += 1.hour
      @booking.end_time += 1.hour if @booking.end_time
      @booking.save
      render json: @booking
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end


  def destroy
    @booking = current_user.bookings.find(params[:id])
    @booking.destroy

    head :no_content
  end
end
