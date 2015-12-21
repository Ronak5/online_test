class AddRemoveFieldsFormUser < ActiveRecord::Migration
  def change
    remove_column :users, :address
    add_column :users, :percentile, :string
  end
end
