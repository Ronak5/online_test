class Question < ActiveRecord::Base
  has_many  :options
  has_one :answer

  def get_options
    self.options
  end
end
