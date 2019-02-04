import parties from '../mock-Models/create.mock';

export default class Controllers {
  static createParty(req, res) {
    req.body.id = parties.length + 1;
    const {
      name, partyEmail, hqAddress, partyDescr, partyLeadersName,
    } = req.body;
    if (!name.trim()
        || !partyEmail.trim()
        || !hqAddress.trim()
        || !partyDescr.trim()
        || !partyLeadersName.trim()) {
      res.status(400).json({
        error: 'Sorry, You need to enter details properly.',
      });
      return;
    }
    const newCreatedParties = [...parties, req.body];
    res.status(200).json({
      message: 'Political Party Successfully created',
      data: newCreatedParties,
    });
  }

  static getAllPoliticalParties(req, res) {
    res.status(200).json({
      data: parties,
      message: 'Political Party Successfully created'
    });
  }

  static editAParty(req, res) {
    const {
      name, partyEmail, hqAddress, partyDescr, partyLeadersName,
    } = req.body;
    if (!name.trim()
      || !partyEmail.trim()
      || !hqAddress.trim()
      || !partyDescr.trim()
      || !partyLeadersName.trim()) {
      res.status(400).json({
        error: 'Sorry, You need to enter details properly.',
      });
      return;
    }
    const { id } = req.params;
    let data = parties.find(element => element.id === parseInt(id, 10));
    if (data) {
      data = req.body;
      data.id = id;
      res.status(200).json({
        message: 'User Successfully Updated',
        data,
      });
      return;
    }
    res.status(404).json({
      error: 'The Political Party does not exist',
    });
  }

  static deleteAParty(req, res) {
    const { id } = req.params;
    const remData = parties.filter(party => parseInt(id, 10) !== party.id);
    res.status(200).json({
      message: 'Successfully Deleted a party',
      data: remData,
    });
  }
}
