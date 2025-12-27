declare module 'better-sqlite3' {
  import { Database as SQLiteDatabase } from 'better-sqlite3';

  export default class Database {
    constructor(filename: string, options?: any);
    
    exec(sql: string): void;
    prepare(sql: string): Statement;
    
    close(): void;
    
    // Add other methods as needed
    static readonly OPEN_READONLY: number;
    static readonly OPEN_READWRITE: number;
    static readonly OPEN_CREATE: number;
    static readonly OPEN_URI: number;
    static readonly OPEN_MEMORY: number;
  }

  interface Statement {
    run(...params: any[]): any;
    get(...params: any[]): any;
    all(...params: any[]): any[];
    iterate(...params: any[]): IterableIterator<any>;
    pluck(): Statement;
    expand(): Statement;
    raw(): Statement;
    
    // Add other statement methods as needed
  }
}