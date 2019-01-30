import parties from '../mock-Models/create.mock';

export default class Controllers {
  static createParty(req, res) {
    req.body.id = parties.length + 1;
    const {
      name, partyEmail, hqAddress, partyDescr, partyLeadersName,
    } = req.body;
    if (!name || !partyEmail || !hqAddress || !partyDescr || !partyLeadersName) {
      res.status(400).json({
        status: 400,
        error: 'Sorry, You need to enter details properly.',
      });
      return;
    }
    const newCreatedParties = [...parties, req.body];
    res.status(200).json({
      status: 200,
      message: 'Political Party Successfully created',
      data: newCreatedParties,
    });
  }

  static getAllPoliticalParties(req, res) {
    res.status(200).json({
      status: 200,
      data: parties,
    });
  }
}
