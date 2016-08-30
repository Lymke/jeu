/**
 * Controller : User
 * @param {type} app
 * @param {type} authenticationService
 * @returns {undefined}
 */
module.exports.controller = function (app) 
{
    
    var jwt = app.get('jwt');

    /**
     * Create a new account
     */
    app.post('/users/create-compte', function (req, res) 
    {   
        User = app.get('db').User;
        
        //retrieve user informations
        
            user = {
                        login: req.body.login,
                        password: req.body.password,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email

                    };
                    
        //Find if this user already exists
        
            User.findOne({where: {login: req.body.login}}).then(function (userRow) {

                if (userRow)
                {   //he already exists
                    res.send('Utilisateur déjà existant');
                }
                else
                {   //he doesn't exist so we create him in database
                    User.create(user).then(function (userCreated) {
                        res.send('ok');
                    });

                }

            });

    });

    /**
     * Log user and return a token if it's ok
     */
    app.post('/users/login', function (req, res) 
    {  
        User = app.get('db').User;
        
        //retrieve user informations
        
            login = req.body.login;
            password = req.body.password;
        
        //Find the user
        
            User.findOne({where:{login:login}})
                .success(function(user)
                {    
                    if(!user)
                    {   //The user doesn't exist
                        res.status(401).send('Wrong login');
                    }
                    else if(!user.verifyPassword(password))
                    {   //bad password
                        res.status(401).send('Wrong password');
                    }
                    else
                    {   
                        //it's ok, we can send a user profile to the client app
                        var profile = {
                                        login: user.login,
                                        id: user.id
                                      }; 
                                      
                        //create a token  with this user profile         
                        var token = jwt.sign(profile, "secret", { expiresInMinutes: 60 });
                        //send the token
                        var sess = req.session;
                        console.log(sess.aaaaaa);
                        sess.aaaaaa = 'ok';
                        
                        res.json({ token: token,user:profile });
                    }
                })
                .error(function(err)
                {   console.log(err);
                    res.status(500).send( 'Sorry there is an error');
                });
    });

    /**
     * Return true if login already exists, else return false
     */
    app.get('/users/isset-login/:login', function (req, res) 
    {
        User = app.get('db').User;
        
        User.count({where: { login: req.params.login } })
            .then(function (nb_user)
                  {   
                    res.send(nb_user > 0);
                  });
    });
    
    app.get('/users/profil',app.get('authenticationService').ensureAuthorized,function (req, res) 
    {   
        
        res.send('profil');
    });
    
    app.get('/users/disconnect',function (req, res) 
    {   //@todo la deconnection 
        res.send('decconecte');
    });


}


