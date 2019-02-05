import parties from '../mock-Models/create.mock';
import { validatePartiesInput } from '../helpers/validators';

export default class Parties {
  static createParty(req, res) {
    req.body.id = parties.length + 1;
    try {
      validatePartiesInput(req, res);
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
    try {
      // statements
      res.status(200).json({
        data: parties,
      });
    } catch (e) {
      // statements
      res.status(500).json({
        error: 'Sorry, Something is not right.',
      });
    }
  }

  static editAParty(req, res) {
    const validateRes = validatePartiesInput(req, res);
    if (validateRes) {
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
}
