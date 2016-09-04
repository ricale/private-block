class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  def is_json_request
    request.env['CONTENT_TYPE'] == 'application/json'
  end
end
