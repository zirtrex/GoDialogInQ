const { writeFile } = require('fs');
const { argv } = require('yargs');// read environment variables from .env file
require('dotenv').config();// read the command line arguments passed with yargs
const environment = argv.environment;

const isProduction = environment === 'prod';

if (!process.env.BACK_PROTOCOL || !process.env.BACK_HOST || !process.env.BACK_PORT) {
    console.error('All the required environment variables were not provided!');  
}

const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;// we have access to our environment variables

// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   BACK_PROTOCOL: "${process.env.BACK_PROTOCOL}",
   BACK_HOST: "${process.env.BACK_HOST}",
   BACK_PORT: "${process.env.BACK_PORT}"
};`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables to ${targetPath}`);
});