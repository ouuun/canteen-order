export interface Database {
  name: string;
  host: string;
  port: string;
  user: string;
  password: string;
  dialect: string;
  timezone: string;
  database?: string;
}

export interface Rabbitmq {
  name: string;
  uri: string;
  cert?: string;
  key?: string;
  pfx?: string;
  passphrase?: string;
  ca?: string;
}

export interface Redis {
  name: string;
  host: string;
  port: number;
  db: string;
  password?: string;
}

export interface Jwt {
  name: string;
  secret: string;
  signOptions?: any;
}

export interface Service {
  name: string;
  url: string;
}
