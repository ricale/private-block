class WritingsController < ApplicationController
  def index
    @writings = [{
      created_at: Time.now,
      title: 'test',
      author: {
        name: 'author'
      }
    }]
  end

  def show
  end

  def new
    @writing = Writing.new
  end

  def edit
  end

  def create
  end

  def update
  end

  def destroy
  end
end
