class CreateResults < ActiveRecord::Migration
  def change
    create_table :results do |t|
      t.integer :question_id
      t.integer :option_id
      t.integer :user_id
      t.boolean :is_correct
      t.timestamps
    end
  end
end
