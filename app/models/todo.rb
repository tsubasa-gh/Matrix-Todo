class Todo < ApplicationRecord
  belongs_to :user  # Userモデルとの関連付け

  validates :content, presence: true  # contentカラムの存在を検証
  validates :priority, inclusion: { in: [0, 1] }  # priorityカラムが0か1であることを検証
  validates :importance, inclusion: { in: [0, 1] }  # importanceカラムが0か1であることを検証
end
