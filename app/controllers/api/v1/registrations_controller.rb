# cotrollers/api/v1/registrations_controller.rb
module Api
    module V1
        class RegistrationsController < DeviseTokenAuth::RegistrationsController
            before_action :authenticate_api_v1_user!, only: [:update_name_and_email]

            def update_name_and_email
                if current_api_v1_user.update(name_and_email_params)
                  render json: {status: 'success'}, status: :ok
                else
                  render json: {errors: current_user.errors.full_messages},   status: :unprocessable_entity
                end
            end

            private
            def name_and_email_params
                params.permit(:name, :email)
            end

            def sign_up_params
                params.permit(:email, :password, :password_confirmation, :name)
            end
          
              def account_update_params
                params.permit(:email, :password, :password_confirmation, :name)
              end
        end
    end
end
