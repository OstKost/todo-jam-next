import auth0 from '../utils/auth0';
import { table } from '../utils/Airtable';

const ownsRecord = (handler) =>
  auth0.requireAuthentication(async (req, res) => {
    const { user } = await auth0.getSession(req);
    const { id } = req.body;

    try {
      const existingRecord = await table.find(id);

      if (!existingRecord || existingRecord.fields.userId !== user.sub) {
        res.statusCode = 404;
        res.json({ message: 'Record not found' });
      }

      req.record = existingRecord;
      return handler(req, res);
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.json({ message: error.message });
    }
  });

export default ownsRecord;
