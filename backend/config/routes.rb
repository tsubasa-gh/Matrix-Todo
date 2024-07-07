Rails.application.routes.draw do
  resources :pages, only: [:index]

  namespace :api do
    namespace :v1 do
      resources :home, only: [:index]
      resources :todos, only: [:create, :destroy, :index]

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/registrations'
      }
      devise_scope :api_v1_user do
        put 'auth/update_name_and_email', to: 'registrations#update_name_and_email'
      end

    end 
  end
end
