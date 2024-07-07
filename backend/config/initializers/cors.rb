Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'https://matrix-todo-frontend.vercel.app' # Next.jsを動作させているアドレスとポート番号
  
      resource '*',
        headers: :any,
        expose: ['access-token', 'uid','client'],
        methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
  end