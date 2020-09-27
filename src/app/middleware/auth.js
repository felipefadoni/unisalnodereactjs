export default (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization)
    return response.status(401).json({ message: 'Request Unauthorized.' });

  const [_, basic] = authorization.split('Basic ');

  const bufferObj = Buffer.from(basic, 'base64');

  const userData = bufferObj.toString('utf8');

  const [user, password] = userData.split(':');

  if (user !== 'unisalnodereactjs' || password !== '123456')
    return response.status(401).json({ message: 'No Authorization' });

  next();
};
