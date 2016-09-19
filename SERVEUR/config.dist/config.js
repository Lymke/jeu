/**
 * Config of the application
 * @type type
 */
module.exports =
{
    port: 8080,
    origin_allowed:"*",
    db: {	active : false,
            //url:'****',
            database: 'DATABASENAME',
            username: 'USER',
            password: 'PASSWORD',
            options:  {
                            dialect: 'mysql',
                            host: 'HOST',
                            //protocol : 'tcp',
                            //port : '3306',
                            logging: function (str)
                            {
                                console.log((str).blue);
                            }
                        }
        }

};