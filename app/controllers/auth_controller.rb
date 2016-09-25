class AuthController < ApplicationController
  def is_signed_in?
    result =
      if user_signed_in?
        {user: current_user, authenticity_token: form_authenticity_token}
      else
        {}
      end

    render json: result
  end
end
