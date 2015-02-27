require 'pony'


get '/' do
  erb :index
end


post '/contact' do

	message = params["message"]
	email = params["email"]
	subject = params["subject"]
	company = params["company"]
	name = params["name"]

	Pony.mail({
	  :to => ENV['gmail_username'],
		:subject							=> 'Contact Form Maginto Partners',
    :body 								=> {name: name, message: message, email: email, subject: subject, company: company, name: name},
	  :via => :smtp,
	  :via_options => {
	    :address              => 'smtp.gmail.com',
	    :port                 => '587',
	    :enable_starttls_auto => true,
	    :user_name            =>  ENV['gmail_username'],
	    :password             => ENV['gmail_password'],
	    :authentication       => :plain, # :plain, :login, :cram_md5, no auth by default
	    :domain               => "http://127.0.0.1:9393/" # the HELO domain provided by the client to the server
	  }
	})

# {"name"=>"Love", "email"=>"Love@love.com", "subject"=>"", "message"=>"kkkkk", "msg-submitted"=>"true"}

	redirect "/thanks"
end

 
get '/thanks' do
	erb :thanks
end
