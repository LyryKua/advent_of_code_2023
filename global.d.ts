declare namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;

      AOC_SESSION_COOKIE: string;
    }
}
