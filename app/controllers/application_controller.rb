class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  def is_json_request
    request.env['CONTENT_TYPE'] == 'application/json'
  end

  def wrap_default_result_and_resque
    yield

  rescue Exception => e
    if is_json_request
      render status: 400, json: {message: e.to_s}
    end
  end

  def render_result(result, options = {})
    @result = result

    if is_json_request
      render json: @result, status: options[:status]

    else
      render 'commons/root', locals: {props: @result}
    end
  end
end
