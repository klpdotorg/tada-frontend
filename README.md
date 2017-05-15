# tada-frontend
Front-end code for TADA app using React

#### Setup Nodejs and NPM

Setup nodejs and npm on the machine. For Ubuntu systems:

```
sudo apt-get install nodejs npm

```

For MacOS, use Homebrew or some other package manager.

Note: Node has released a major version and it is best to be on that. On TADA staging server, as of 28.11.2016, Node version is: v7.2.0. npm is 3.10.9. tadadev is slightly older but that's due for an upgrade anyway.

#### Download code by:
```
git clone https://github.com/klpdotorg/tada-frontend/ && cd tada-frontend

npm install

npm run dev
```
npm run dev -- this runs the development server.

npm run deploy -- runs the deployment code which is used on production servers.

#### Running the front-end code

Using ``` npm run dev ``` will give you a hot loading dev server. Simply, go to [http://localhost:8080/](http://localhost:8080/) to see the live frontend.

You can run deploy also which will spew out a bundle.js ready for distribution. This is recommended on production.

Build bundle.js before deploy
```
npm run deploy
```

### Jenkins integration

Note that any push to DEVELOP will be deployed to tadadev.klp.org.in:3000 automatically by Jenkins. Only push tested changes to develop.

### Installation on Windows

Set up the ubuntu bash on Windows
https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/

Run the bash as Administrator
Get the latest nodejs and npm and not the default versions

```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install nodejs
```
DO NOT ACCESS THE UBUNTU FILE SYSTEM FROM A WINDOWS EXPLORER
So, install git and set up ssh keys as needed

During npm run dev, you may get an error: Node: invalid argument, uv_interface_addresses
Ref: https://github.com/Microsoft/BashOnWindows/issues/1343
Fix by adding this piece of code right on top of the webpack.config.js
```
// hack for Ubuntu on Windows
try {
  require('os').networkInterfaces();
}
catch (e) {
  require('os').networkInterfaces = () => ({});
}
```
You could sublime / IDE on Windows with your git repo and use the ubuntu bash only to run thr server with code updates. 