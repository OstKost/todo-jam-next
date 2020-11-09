import { table, getMinifiedRecord } from './utils/Airtable';
import OwnsRecord from './middleware/OwnsRecord';

export default OwnsRecord(async (req, res) => {
  const { id, fields } = req.body;

  try {
    const updatedRecords = await table.update([{ id, fields }]);
    const updatedRecord = getMinifiedRecord(updatedRecords[0]);
    res.statusCode = 200;
    res.json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({ message: error.message });
  }
});
