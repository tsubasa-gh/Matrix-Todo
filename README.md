# 概要
<img src="/frontend/readme_images/README_top.png" alt="Matrix Todo">

#### サービスURL
[Matrix Todo](https://matrix-todo-frontend.vercel.app/introduction) 

登録済みのユーザーを使用する場合は以下をご利用ください。<br>
メールアドレス：test01@example.com<br>
パスワード：pass01

#### サービスへの想い
本サービスは世界的な名著である「7つの習慣」に登場するタスク管理のフレームワークである、「時間管理のマトリックス」に基づいて作成しました。<br>
私は仕事や日常においてシンプルなTodoリストを用いてタスク管理を行なっています。しかし、タスクを並列に並べるのは効率が悪いと考え、「重要度」と「緊急度」の2つの軸でタスクを管理する「時間管理のマトリックス」を用いた本アプリケーションを開発するに至りました。<br>
「重要度」と「緊急度」に基づいてタスク管理を行うことで、仕事や日常での最大のパフォーマンスの実現を後押しすることを目指します。

# 機能一覧
<table style="width:100%;">
  <tr>
    <th style="width:50%;">紹介画面</th>
    <th style="width:50%;">ログイン画面</th>
  </tr>
  <tr>
    <td style="width:50%;">
      <img src="/frontend/readme_images/intro.png" alt="紹介画面" style="max-width:100%;">
      <p>初めてサービスを訪れるユーザー向けに、スライドを用いたUIを実装しました。</p>
    </td>
    <td style="width:50%;">
      <img src="/frontend/readme_images/login.png" alt="ログイン画面" style="max-width:100%;">
      <p>devise_token_authを用いてメールアドレスとパスワードをキーにしたログイン機能を実装しました。</p>
    </td>
  </tr>

  <tr>
    <th style="width:50%;">タスク追加画面</th>
    <th style="width:50%;">タスク表示画面</th>
  </tr>
  <tr>
    <td style="width:50%;">
      <img src="/frontend/readme_images/addTask.png" alt="タスク追加画面" style="max-width:100%;">
      <p>「重要度」と「緊急度」を設定してタスクを登録する機能を実装しました。</p>
    </td>
    <td style="width:50%;">
      <img src="/frontend/readme_images/account.png" alt="タスク表示画面" style="max-width:100%;">
      <p>「重要度」と「緊急度」に基づいて4つの領域でタスクを分類して表示する機能、タスクの削除機能、タスクの完了時チェック機能を実装しました。</p>
    </td>
  </tr>

  <tr>
    <th style="width:50%;">新規登録画面</th>
    <th style="width:50%;">ユーザーアカウント画面</th>
  </tr>
  <tr>
    <td style="width:50%;">
      <img src="/frontend/readme_images/signup.png" alt="新規登録画面" style="max-width:100%;">
      <p>ユーザーの新規登録機能を実装しました。</p>
    </td>
    <td style="width:50%;">
      <img src="/frontend/readme_images/displayTasks.png" alt="アカウント画面" style="max-width:100%;">
      <p>ユーザー情報の変更、パスワード変更、ユーザーの削除機能を実装しました。</p>
    </td>
  </tr>

  <tr>
    <th style="width:50%;">About画面</th>
    <th style="width:50%;"></th>
  </tr>
  <tr>
    <td style="width:50%;">
      <img src="/frontend/readme_images/about.png" alt="アバウト画面" style="max-width:100%;">
      <p>「時間管理のマトリックス」の紹介と、本アプリケーションの使用方法のページをタブ形式のUIで実装しました。</p>
    </td>
    <td style="width:50%;"></td>
  </tr>
</table>


# 使用技術
|||
| --- | --- |
| フロントエンド | TypeScript 5.4,  Next.js 14.2, MUI |
| バックエンド | Ruby 3.1,  Ruby on Rails 7.1 |
| データベース | PostgreSQL 16.0 |
| インフラ | Vercel, Render |
| デザイン | Canva |
| その他 | Git, GitHub |

# ER図
<img alt="ER図" src="/frontend/readme_images/ER.png">

# 今後の展望
今後は以下の機能を実装したいと考えています。
- ゲストログイン
- ドラッグ&ドロップでタスクの位置変更
- ログイン前にメールを送付してのパスワードリセット
