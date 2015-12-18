class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.belongs_to :question, index: true
      t.belongs_to :option, index: true

      t.timestamps null: false
    end
    add_foreign_key :answers, :questions
    add_foreign_key :answers, :options
  end
end
