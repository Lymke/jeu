

exports.init = function(app)
{
    jwt = app.get('jwt');
}; 

/**
 * Verify if there is a token in the header of the request
 * @param {type} req
 * @param {type} res
 * @param {type} next
 * @returns {undefined}
 */
exports.ensureAuthorized = function(req, res, next) 
{  
        var bearerToken;
        var bearerHeader = req.headers["authorization"];

        if (typeof bearerHeader !== 'undefined') 
        {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            req.token = bearerToken;
            req.userConected = jwt.verify(req.token, "secret");
            next();
        }
        else 
        {
            res.send(403);
        }
};