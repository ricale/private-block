class Users::SessionsController < Devise::SessionsController
  respond_to :json
  # before_filter :configure_sign_in_params, only: [:create]
  # skip_before_filter :require_no_authentication, only: :create

  # GET /resource/sign_in
  def new
    self.resource = resource_class.new(sign_in_params)
    clean_up_passwords(resource)

    # if flash[:error].blank?
    #   render json: {success: true}
    # else
      # if is_json_request
      #   if !flash[:alert].blank?
      #     render status: 401, json: {message: flash[:alert]}
      #   else
      #   end

      # else
      #   render 'commons/root'
      # end

    @props = {}
    
    # end
  end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)
    return invalid_login_attempt unless resource
    # set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)

    redirect_to '/'
    # render json: {user: current_user, authenticity_token: form_authenticity_token}
  end

  # DELETE /resource/sign_out
  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    # set_flash_message! :notice, :signed_out if signed_out

    redirect_to '/'
  end

  protected

  def require_no_authentication
    assert_is_devise_resource!
    return unless is_navigational_format?
    no_input = devise_mapping.no_input_strategies

    authenticated = if no_input.present?
      args = no_input.dup.push scope: resource_name
      warden.authenticate?(*args)
    else
      warden.authenticated?(resource_name)
    end

    if authenticated && resource = warden.user(resource_name)
      message = I18n.t("devise.failure.already_authenticated")
      # redirect_to after_sign_in_path_for(resource)

      if is_json_request
        render json: {user: current_user, message: message}
      else
      end
    end
  end

  def invalid_login_attempt
    warden.custom_failure!
    render :json=> {:success=>false, :message=>"Error with your login or password"}, :status=>401
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
end
