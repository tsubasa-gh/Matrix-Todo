class CreateTodos < ActiveRecord::Migration[7.0]
  def change
    create_table :todos do |t|
      t.references :user, null: false, foreign_key: true # userとの関連を示す外部キー
      t.string :content, null: false # todoの内容
      t.integer :priority, null: false # 優先度(0:低, 1:高)
      t.integer :importance, null: false # 重要度(0:低, 1:高)

      t.timestamps # created_at と updated_at を自動生成
    end
  end
end
