class AuthenticateController {
  create(request, response) {
    const { login, password } = request.body;

    if (!login)
      return response.status(400).json({ message: 'Login was not informed.' });

    if (!password)
      return response
        .status(400)
        .json({ message: 'Password was not informed.' });

    if (login === 'unisalnodereactjs' && password === '123456')
      return response.json({ authenticate: true });

    return response.json({ authenticate: false });
  }
}

export default new AuthenticateController();
