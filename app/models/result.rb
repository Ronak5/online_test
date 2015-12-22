class Result < ActiveRecord::Base
  has_one :question
  has_one :user
  has_one :option
end
