##
# MERN Material Demo
#
# @file
# @version 0.1

# Install everything
install:
	@cd server && yarn install
	@cd client && yarn install
	@docker pull mongo

# Server
server-run:
	@cd server && yarn server
server-clean:
	@rm server/yarn.lock server/node_modules -rf

# Client
client-run:
	@cd client && yarn start
client-clean:
	@rm client/yarn.lock client/node_modules -rf

# Database
db-run:
	@docker run -d --name mongodb -p 27017:27017 mongo
db-clean:
	@docker rm mongodb
db-stop:
	@docker stop mongodb
db-reset: db-stop db-clean

# All
up: db-run server-run client-run
clean: server-clean client-clean db-reset

# end
