const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base(process.env.AIRTABLE_TABLE_NAME);

const getMinifiedRecord = ({ id, fields }) => {
  const completed = fields.completed ? true : false;
  return {
    id,
    fields: { ...fields, completed },
  };
};

const minifyRecords = (records) =>
  records.map((record) => getMinifiedRecord(record));

export { table, minifyRecords, getMinifiedRecord };
