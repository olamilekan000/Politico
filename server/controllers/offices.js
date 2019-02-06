import ofiice from '../mock-Models/create-office.mock';
import { validateOfficesInput } from '../helpers/validators';

export default class Offices {
  static createOffice(req, res) {
    req.body.id = ofiice.length + 1;
    try {
      // statements
      const validateRes = validateOfficesInput(req, res);
      if (validateRes) {
        res.status(400).json({
          error: 'Sorry, You need to enter details properly.',
        });
        return
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

  static allOffices(req, res) {
    try {
      // statements
      res.status(200).json({
        data: ofiice,
      });
    } catch (e) {
      // statements
      res.status(500).json({
        error: 'Sorry, Something is not right.',
      });
    }
  }

  static anOffice(req, res) {
    try {
      // statements
      const { id } = req.params;
      const data = ofiice.find(element => element.id === parseInt(id, 10));

      if (data) {
        res.status(200).json({
          data,
        });
        return;
      }

      res.status(404).json({
        error: "The Office doen't exit",
      });
    } catch (e) {
      // statements
      res.status(500).json({
        error: 'Sorry, Something is not right.',
      });
    }
  }
}
