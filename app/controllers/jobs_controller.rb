class JobsController < ApplicationController
  before_action :set_job, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:index, :show]
# clear
  # GET /jobs
  # GET /jobs.json
  def index
    @jobs = Job.all.order("created_at desc")
  end
# clear
  # GET /jobs/1
  # GET /jobs/1.json
  def show
  end

  # GET /jobs/new
  def new
    @job = current_user.jobs.build
  end
# clear
  # GET /jobs/1/edit
  def edit
  end

  # POST /jobs
  # POST /jobs.json
  def create
    @job = current_user.jobs.build(job_params)
# clear
    token = params[:stripeToken]
    job_type = params[:job_type]
    job_title = params[:title]
    card_brand = params[:user][:card_brand]
    card_exp_month = params[:user][:card_exp_month]
    card_exp_year = params[:user][:card_exp_year]
    card_last4 = params[:user][:card_last4]
# clear
# now we must initiate the charge

    charge = Stripe::Charge.create(
      :amount => 40000,
      :currency => "usd",
      :description => job_type,
      :statement_descriptor => job_title,
      :source => token
    )
    # we need to pass the above to the user who is posting the job   also clear
    # we can grab the  current user  like we would in the views , then just commit it to save, stripe id =  card id
      current_user.stripe_id = charge.id
      current_user.card_brand = card_brand
      current_user.card_exp_month = card_exp_month
      current_user.card_exp_year = card_exp_year
      current_user.card_last4 = card_last4
      current_user.save!
      # clear
      # # responding to save and redirecting back to the job,
    respond_to do |format|
      if @job.save
        format.html { redirect_to @job, notice: 'Your job opening was successfully created!' }
        format.json { render :show, status: :created, location: @job }
      else
        format.html { render :new }
        format.json { render json: @job.errors, status: :unprocessable_entity }
      end
    end

  rescue Stripe::CardError => e
    flash.alert = e.message
    render action: :new

  end

  # PATCH/PUT /jobs/1
  # PATCH/PUT /jobs/1.json
  def update
    respond_to do |format|
      if @job.update(job_params)
        format.html { redirect_to @job, notice: 'Job was successfully updated!' }
        format.json { render :show, status: :ok, location: @job }
      else
        format.html { render :edit }
        format.json { render json: @job.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /jobs/1
  # DELETE /jobs/1.json
  def destroy
    @job.destroy
    respond_to do |format|
      format.html { redirect_to jobs_url, notice: 'Job was successfully destroyed!' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_job
      @job = Job.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def job_params
      params.require(:job).permit(:title, :description, :url, :job_type, :location, :job_author, :remote_ok, :apply_url, :avatar)
    end
end
# clear
