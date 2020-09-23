export default (request, response, next) => {
  const { authorization } = request.headers;

  console.log(authorization);

  const bufferObj = Buffer.from(authorization, "base64");

  bufferObj.toString("utf8");

  console.log(bufferObj.toString('utf8'));

  // const [user, password] =

  next();
};
