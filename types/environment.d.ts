namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    ENV: string;
    REACT_APP_SERVER_ENDPOINT: string;
  }
}
