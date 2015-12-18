class CreateOptions < ActiveRecord::Migration
  def change
    create_table :options do |t|
      t.string :description
      t.belongs_to :question, index: true

      t.timestamps null: false
    end
    add_foreign_key :options, :questions
  end
end
