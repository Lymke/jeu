/**
 * Controller : User
 * @param {type} app
 * @param {type} authenticationService
 * @returns {undefined}
 */
module.exports.controller = function (app) 
{
    
    var jwt = app.get('jwt');

    app.post('/contacts/add-contact/', app.get('authenticationService').ensureAuthorized,function (req, res) 
    {
        Contact = app.get('db').Contact;
        User = app.get('db').User;
        
        idContact = req.body.id_contact;
        
        Contact.findOne({where:{id:idContact}}).then(function (contactRow) {
            
            var userConnected = req.userConected;
            User.findOne({where:{id:userConnected.id}}).then(function (userRow) {
                
                userRow.addContact(contactRow,{accepted:0}).then(function() {
                    res.send('contact ajouté');
                });
                
            });

        });
    });
    
    app.post('/contacts/accept-contact/', app.get('authenticationService').ensureAuthorized,function (req, res) 
    {
        RelationContact = app.get('db').RelationContact;
        var userConnected = req.userConected;
        idContact = req.body.id_contact;
        
        RelationContact.findOne({where:{UserId:userConnected.id,ContactId:idContact}}).then(function (relContactRow) {
            
            if(relContactRow)
            {
                relContactRow.accepted = 1;
                relContactRow.save();
                res.send('Contact accepté !');
            }
            else
            {
                res.send('Cette relation n\'existe pas.');
            }
        });
    });
    
    app.get('/contacts/search-my-contact/', app.get('authenticationService').ensureAuthorized,function (req, res) 
    {   console.log( req.toto);
        Contact = app.get('db').Contact;
        User = app.get('db').User;

        idContact = req.body.id_contact;
         var userConnected = req.userConected;
        
            User.findOne({where:{id:userConnected.id}}).then(function (userRow) {
                
                userRow.getContacts({ attributes: ['id','login'], joinTableAttributes: ['accepted']}).then(function(contactsRow) {

                    resContacts = [];
                   for(var i= 0; i < contactsRow.length; i++)
                    {   
                         resContacts.push({
                                            id:contactsRow[i].id,
                                            login:contactsRow[i].login,
                                            accepted:contactsRow[i].RelationContact.accepted
                                         });
                    }
                    res.send(resContacts);
                });

        });
    });

    /**
     * Create a new account
     */
    app.post('/contacts/search-contact/', app.get('authenticationService').ensureAuthorized,function (req, res) 
    {   
        User = app.get('db').User;
        
        //retrieve contact informations
            
            login = req.body.login;
            var userConnected = req.userConected;
            
           // console.log(req.token);
            
        //Find if this user already exists
        
            sql = {
                    attributes: ['id','login'],
                    where: {    login: {$like:login+'%'},
                                id:{ne:userConnected.id}
                            }
                   };
                   
            User.findAll(sql).then(function (userRows) {

                if (userRows)
                {   //he already exists
                    res.send(userRows);
                }

            });

    });
    
    /*app.get('/contacts/add-contact'),function(req,res)
    {   console.log('ok');
        
        
        
    };*/

};


