class BookingsController < ApplicationController
  def index
    @bookings = current_user.bookings
    ::Rails.logger.debug "!!! @bookings:: #{@bookings.inspect}\n"
    
    render json: @bookings
  end

  def show
    render json: current_user.bookings.find(params[:id])
  end

  def create
    
    @booking = current_user.bookings.build(params[:booking])

    if @booking.save
      render json: @booking, status: :created, location: @booking
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  def update
    
    @booking = current_user.bookings.find(params[:id])

    if @booking.update_attributes(params[:booking])
      head :no_content 
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
