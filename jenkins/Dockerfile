FROM jenkins/jenkins
 
USER root

RUN curl -sSL https://get.docker.com/ | sh

USER jenkins

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt

RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt

USER root