class User < ActiveRecord::Base
  include Clearance::User

  validates_presence_of :email, :name, :password, :contact_no, :address
  validates_uniqueness_of :email
end
