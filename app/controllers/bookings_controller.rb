class BookingsController < ApplicationController
  def index
    @bookings = current_user.bookings
    
    render json: @bookings.order("date DESC")
  end

  def show
    render json: current_user.bookings.find(params[:id])
  end

  def create
    ::Rails.logger.debug "!!! params:: #{params.inspect}\n"
    
    @booking = current_user.bookings.build(params[:booking])
    ::Rails.logger.debug "!!! @booking:: #{@booking.inspect}\n"
    
    if @booking.save
      render json: @booking, status: :created, location: @booking
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  def update
    
    @booking = current_user.bookings.find(params[:id])

    if @booking.update_attributes(params[:booking])
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
