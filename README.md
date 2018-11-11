# Watchtopus UI
Easily fully-monitor a network of servers with a quick installation of the agents and the central server.
<br>
[Watchtopus](https://github.com/edibusl/watchtopus) is an educational project and not suitable (yet) for use in production.
<br>
Watchtopus UI is the UI dashboard of the central server where you can configure the monitored hosts remotely.

## Quick Installation of the dashboard server
The dashboard ui server is part of the docker-compose that is described in [Central Server Installation](https://github.com/edibusl/watchtopus#quick-installation-of-central-server) section

## Developers - contributing
### Quick installation and running of the dashboard ui
```bash
cd ~/watchtopus-ui
npm install
npm start
```

### Building & deploying to docker registry
```bash
cd ~/watchtopus-ui/deployment
bash build_docker.sh
```