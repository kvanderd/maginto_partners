get '/' do
  erb :index
end


post '/contact' do
	p "love " * 90
	p params

	redirect "/thanks"
end

 
get '/thanks' do
	erb :thank_you
end
