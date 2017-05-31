module ApplicationHelper
  def session_data
    {
      session: {
        initialPath: request.path,
        authenticityToken: form_authenticity_token,
        valid: !current_user.nil?,
        user: current_user
      }
    }
  end
end
