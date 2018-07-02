## Frontend Repository for Umblocks App

### Setup

#### Node.js version

This repository requires Node.js version 8, for that we recommend you to use `nvm`.

```
nvm use 8
```

#### Set up project dependencies

```
yarn install
```

#### Prepare your hosts address for the virtual host

Edit manually your hosts file to include a reference to the new local host:

```
sudo vi /etc/hosts
```

And add the new reference:

```
127.0.0.1 umblocks
127.0.0.1 umblocks.test
```

#### NGINX setup

The nginx setup will create a local virtual host that will be pointing to this project's server.

Copy the nginx configuration file to your nginx's sites enabled folder:

```
sudo cp ./nginx/umblocks-frontend.nginx /usr/local/etc/nginx/servers
```

Then, restart nginx to update the new configuration

```
sudo service nginx restart
```

Finally, you can run the server:

```
yarn start:dev
```
