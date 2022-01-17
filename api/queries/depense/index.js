const Depense = require("../../models/depense");

const getMonthFirstDay = (date) => {
  const d = new Date(date);
  const d1 = new Date(new Date(d.setDate(1)).setHours(0, -d.getTimezoneOffset(), 0, 0));
  return d1.toISOString().slice(0, 10);
};
const getMonthLastDay = (date) => {
  const d = new Date(date);
  const d2 = new Date(d.getFullYear(), d.getMonth() + 1, 0).setHours(0, -d.getTimezoneOffset(), 0, 0);
  return new Date(d2).toISOString().slice(0, 10);
};

module.exports = {
  depenses: async (_p, { monthDate = new Date() }) => {
    // todo: Invalid dates
    const d = new Date(monthDate);
    const monthFilter = d.getMonth();
    const yearFilter = d.getFullYear();
    
    const filters = {
      date: {
        $gte: `${getMonthFirstDay(new Date(yearFilter, monthFilter, 1))}`,
        $lte: `${getMonthLastDay(new Date(yearFilter, monthFilter, 1))}`,
      },
    };

    try {
      const result = await Depense.find(filters).sort("-date");
      // console.log(`result: `, result)
      return result;
    } catch (e) {
      console.log(`e: `, e);
      throw e;
    }
  },
  depense: async (_p, { id }) => {
    let filters = { _id: id }
    try {
      const depense = await Depense.findOne(filters)
      return depense
    } catch (error) {
      throw (error);
    }
  },
}