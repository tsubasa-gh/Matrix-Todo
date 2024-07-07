class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
        include DeviseHackFakeSession

        wrap_parameters false

        before_action do
                I18n.locale = :ja
        end
        before_action :configure_permitted_parameters, if: :devise_controller?

        # nameを変更可能にする例
        def configure_permitted_parameters
                devise_parameter_sanitizer.permit(:account_update, keys: [:name])
        end
end
