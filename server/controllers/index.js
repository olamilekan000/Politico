import parties from '../mock-Models/create.mock';
import ofiice from '../mock-Models/create-office.mock';

export default class Controllers {
  static createParty(req, res) {
    req.body.id = parties.length + 1;
    try {
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
    } catch (e) {
      res.status(500).json({
        error: 'Sorry, Something is not right.',
      });
    }
  }

  static getAllPoliticalParties(req, res) {
    res.status(200).json({
      data: parties,
    });
  }

  static editAParty(req, res) {
    try {
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
    } catch (e) {
      res.status(500).json({
        error: 'Sorry, Something is not right.',
      });
    }
  }

  static deleteAParty(req, res) {
    try {
      // statements
      const { id } = req.params;
      const remData = parties.filter(party => parseInt(id, 10) !== party.id);
      res.status(200).json({
        message: 'Successfully Deleted a party',
        data: remData,
      });
    } catch (e) {
      // statements
      res.status(500).json({
        error: 'Sorry, Something is not right.',
      });
    }
  }

  static createOffice(req, res) {
    req.body.id = ofiice.length + 1;
    try {
      // statements
      const {
        type, name, aspirantName, aspirantParty,
      } = req.body;
      if (!type.trim()
          || !name.trim()
          || !aspirantName.trim()
          || !aspirantParty.trim()) {
        res.status(400).json({
          error: 'Sorry, You need to enter details properly.',
        });
        return;
      }

      const newCreatedOffice = [...ofiice, req.body];
      res.status(200).json({
        message: 'Political Office Successfully created',
        data: newCreatedOffice,
      });
    } catch (e) {
      // statements
      res.status(500).json({
        error: 'Sorry, Something is not right.',
      });
    }
  }
}
