class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.timestamps
      t.string :email
      t.string :encrypted_password
      t.string :confirmation_token
      t.string :remember_token
      t.string :name
      t.string :contact_no
      t.string :address
      t.string :password
    end
  end
end
