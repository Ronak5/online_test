class User < ActiveRecord::Base
  include Clearance::User

  validates_presence_of :email, :name, :password, :contact_no, :percentile
  validates_uniqueness_of :email
  def get_total_attempts
      Result.where(:user_id => self.id).count
  end

  def get_correct_answer
    Result.where(:user_id => self.id , :is_correct => true).count
  end


end
