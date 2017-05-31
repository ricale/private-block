module ApplicationHelper
  def session_data
    {
      initialPath: request.path,
      authenticityToken: form_authenticity_token,
      loggedInNow: !current_user.nil?,
      user: current_user
    }
  end
end
