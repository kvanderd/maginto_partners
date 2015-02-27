get '/' do
  erb :index
end


post '/contact' do
	p "love " * 90
	p params
# http://stackoverflow.com/questions/14709421/sending-mail-with-pony-and-sinatra
	redirect "/thanks"
end

 
get '/thanks' do
	erb :thanks
end
