## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :groups_users
- has_many :groups, through: groups_users
- has_many :massages

## massagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|string|null: false|
|body|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
belongs_to :group
belongs_tp :user

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false|
|groupname|string|null: false|
### Association
- has_many :groups_users
- has_many :users, through: groups_users
- has_many :massages

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user
