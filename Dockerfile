FROM node:8.11.3-slim

RUN apt-get update && apt-get install -yqq --no-install-recommends cron\
&& rm -rf /var/lib/apt/lists/* 


RUN mkdir /App/
COPY App/package.json  /App/package.json


RUN cd /App \
&& npm  install 


COPY App /App


# Add crontab file in the cron directory
ADD cronjob /etc/cron.d/cronjob

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/cronjob

# Apply cron job
RUN crontab /etc/cron.d/cronjob





ENTRYPOINT  ["cron", "-f"]



