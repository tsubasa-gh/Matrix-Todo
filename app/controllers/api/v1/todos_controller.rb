module Api
    module V1
        class TodosController < ApplicationController
            before_action :authenticate_api_v1_user!  #ユーザーが認証済みか確認
            before_action :set_todo, only: [:destroy]
        
            def index
                @todos = current_api_v1_user.todos
                render json: @todos
            end
        
            #POST /todos
            def create
                # 現在のユーザーに関連付けられた新しいTodoオブジェクトを初期化
                @todo = current_api_v1_user.todos.build(todo_params)
        
                if @todo.save
                    render json: @todo, status: :created
                else
                    render json: @todo.errors, status: :unprocessable_entity
                end
            end
        
            # DELETE /todos/:id
            def destroy
                @todo.destroy
        
                head :no_content  # 削除に成功した場合、ステータスコード204（No Content）を返す
            end
        
            private  ## 以下はこのコントローラー内でのみ使用
            def todo_params
                params.permit(:content, :priority, :importance)
            end
        
            # URLパラメータから対象のTodoを取得する
            def set_todo
                @todo = current_api_v1_user.todos.find(params[:id])
            rescue ActiveRecord::RecordNotFound
                # 指定されたIDのTodoが見つからなかった場合、ステータスコード404（Not Found）とともに、エラーメッセージをJSON形式で返す
                render json: { error: "Todo not found" }, status: :not_found
            end
        end
    end
end
