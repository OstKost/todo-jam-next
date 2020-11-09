import ownsRecord from './middleware/OwnsRecord';
import { table, getMinifiedRecord } from './utils/Airtable';
import OwnsRecord from './middleware/OwnsRecord';

export default OwnsRecord(async (req, res) => {
  const { id: deleteId } = req.body;

  try {
    const deletedRecords = await table.destroy([deleteId]);
    const { id } = getMinifiedRecord(deletedRecords[0]);
    res.statusCode = 200;
    res.json({ id });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({ message: error.message });
  }
});
