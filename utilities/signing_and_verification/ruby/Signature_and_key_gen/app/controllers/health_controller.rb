class HealthController < ApplicationController
    def health
      render plain: "Health, Check!"
    end
  end