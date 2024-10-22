# Database Seeder

This project is a standalone seeder designed for testing purposes. It allows you to manage data in your MongoDB database through various commands executed via the terminal.

## Installation

Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/try/download/community) installed on your machine.

1. Clone this repository:

   ```bash
   git clone https://github.com/username/repository-name.git
   cd repository-name
   
2. Install dependencies:

   ```bash
   npm install

## Running Commands in the Terminal

Open your terminal in the project folder and run the following commands to perform various operations on the database.

1. Check Database Connection
   To verify that the connection to the MongoDB database is successful, run the following command:
   ```bash
   npm run check-db-connection

2. Reset Datase
   To delete all data in the data collection, use the following command:
   ```bash
   npm run reser-db

3. Bulk Insert
   To add data from `seed.json` to the database, run:
   ```bash
   npm run bulk-insert

4. Get All Data
   After implementing the get-all functionality, you can retrieve all data in the collection by running:
   ```bash
   npm run get-all

5. Debugging
  If you encounter issues while running the commands, check the logs in the terminal. Here are some debugging steps that may help:
- Ensure MongoDB is running and accessible.
- Verify that the connection URL in the configuration file is correct.
- Check that seed.json exists in the correct location and is formatted properly.

## Conclusion
By following the steps above, you should be able to manage data in your MongoDB database easily. If you have further questions, please open an issue in this repository or contact the project maintainer.
