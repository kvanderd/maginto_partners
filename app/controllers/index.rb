require 'pony'


get '/' do
  erb :index
end


post '/contact' do
	Pony.mail({
	  :to => ENV['gmail_username'],
		:subject							=> 'Contact Form Maginto Partners',
    :body 								=> 'Hello you sexy thing 4:).',
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
