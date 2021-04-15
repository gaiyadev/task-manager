import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      greeting: 'Hello world in JSON',
      developer: {
        name: 'Gaiya M. Obed',
        email: 'info@gaiyaobed.com.ng',
        website: 'https://www.gaiyaobed.com.ng/',
        github: 'https://github.com/gaiyadev',
        location: 'Kaduna State',
        stack: 'MERN, MEVN, MAVN, MARN, LAMP',
        technologies:
          'HTML, CSS, JavaScript, VueJs, NuxtJs, ReactJs, NextJs, PWA, Bulma, Bootstrap, Vuetify, Laravel, Lumen, AdonisJs, ExpressJs, KoaJs, MYSQL, MongoDb, Postgres, PHP, TypeScript, Flutter, Dart, Restful API, GraphQL API',
        infrastructures: 'Netlify, Vercel, Heroku, Digital Ocean',
        tools: 'npm, yarn',
      },
      project: {
        name: 'Task Management Application',
      },
      apidocs: '',
      version: '0.1.0',
    };
  }
}
