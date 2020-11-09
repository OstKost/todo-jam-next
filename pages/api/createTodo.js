import { table, getMinifiedRecord } from './utils/Airtable';
import auth0 from './utils/auth0';

export default auth0.requireAuthentication(async (req, res) => {
  const { description } = req.body;
  const { user } = await auth0.getSession(req);

  try {
    const newRecords = await table.create([
      { fields: { description, userId: user.sub } },
    ]);
    const newRecord = getMinifiedRecord(newRecords[0]);
    res.statusCode = 200;
    res.json(newRecord);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({ message: error.message });
  }
});
