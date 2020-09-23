class ServerController {
  index(_, response) {
    return response.json({ message: 'API ONLINE' });
  }
}

export default new ServerController();
