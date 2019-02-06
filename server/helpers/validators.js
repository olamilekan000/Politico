export const validatePartiesInput = (req, res) => {
  const {
    name, partyEmail, hqAddress, partyDescription, partyLeadersName,
  } = req.body;

  if (!name.trim()
  || !partyEmail.trim()
  || !hqAddress.trim()
  || !partyDescription.trim()
  || !partyLeadersName.trim()) {
    return true
  }
};

export const validateOfficesInput = (req, res) => {
  const {
    type, name,
  } = req.body;
  if (!type.trim()
      || !name.trim()) {
    return true
  }
};
