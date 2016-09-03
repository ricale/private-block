class AuthController < ApplicationController
  def is_signed_in?
    result =
      if user_signed_in?
        {signed_in: true, user: current_user}
      else
        {signed_in: false}
      end

    render json: result
  end
end
