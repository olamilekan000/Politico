export const validatePartiesInput = (req, res) => {
  const {
    name, partyEmail, hqAddress, partyDescription, partyLeadersName,
  } = req.body;

  if (!name.trim()
  || !partyEmail.trim()
  || !hqAddress.trim()
  || !partyDescription.trim()
  || !partyLeadersName.trim()) {
    return res.status(400).json({
      error: 'Sorry, You need to enter details properly.',
    });
  }
};

export const validateOfficesInput = (req, res) => {
  const {
    type, name,
  } = req.body;
  if (!type.trim()
      || !name.trim()) {
    return res.status(400).json({
      error: 'Sorry, You need to enter details properly.',
    });
  }
};
