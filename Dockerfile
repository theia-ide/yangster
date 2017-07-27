FROM node:7.10
MAINTAINER "TypeFox"

LABEL name="yangster"
LABEL version="0.1"

RUN echo 'deb http://httpredir.debian.org/debian/ jessie-backports main' >> /etc/apt/sources.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends -t jessie-backports \
  openjdk-8-jre-headless \
  ca-certificates-java \
  openjdk-8-jdk \
  maven \
  && update-java-alternatives -s java-1.8.0-openjdk-amd64

# TODO add -q to gradle
RUN git clone https://github.com/TypeFox/xtext-jflex.git \
	&& mvn -q -f ./xtext-jflex/jflex-fragment/pom.xml clean install \
	&& git clone https://github.com/yang-tools/yang-lsp.git \
	&& ./yang-lsp/yang-lsp/gradlew -q -p yang-lsp/yang-lsp installDist --refresh-dependencies

# yeoman issue 282
RUN chmod -R 777 /usr/local && useradd -ms /bin/bash yangster
USER yangster

RUN npm install -g yo

WORKDIR /home/yangster

RUN git clone --recursive -b docker https://github.com/yang-tools/yangster.git \
	&& cd yangster \
	&& yarn install \
	&& yarn run setup \
	&& yarn run build
	
EXPOSE 3000
CMD cd yangster/yangster-app && yarn run start