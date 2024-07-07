module DeviseHackFakeSession #APIモードのようにセッションを使用しない場合にセッションへのアクセスがあると発生するエラーの回避
    extend ActiveSupport::Concern
  
    class FakeSession < Hash
      def enabled?
        false
      end
  
      def destroy
      end
    end
  
    included do
      before_action :set_fake_session
  
      private
  
      def set_fake_session
        if Rails.configuration.respond_to?(:api_only) && Rails.configuration.api_only
          request.env['rack.session'] ||= ::DeviseHackFakeSession::FakeSession.new
        end
      end
    end
  end