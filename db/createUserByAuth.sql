insert into users (username, authid, nickname, name, pic) values ($1, $2, $3, $4, $5) returning id, username, authid, nickname, name, pic;
