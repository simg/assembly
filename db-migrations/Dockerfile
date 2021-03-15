FROM node:12
LABEL description="Run migrations against postgres database"

RUN npm install -g graphile-migrate

CMD [ "graphile-migrate", "watch" ]