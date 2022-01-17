const Depense = require("../../models/depense");
const addzero = val => val < 9 ? `0${val}` : val

module.exports = {
  depenses: async (_p, { month, year }) => {
    // console.log(`[DEPENSES] list`);
    const d = new Date();
    const monthFilter = month || d.getMonth();
    console.log(`monthFilter`, monthFilter);
    const yearFilter = year || d.getFullYear();
    console.log(`yearFilter`, yearFilter);
    // lte: 2022-02-01 - gte: 2022-01-01
    console.log(
      `entre ${yearFilter}-${addzero(monthFilter + 1)}-01 et `,
      `${yearFilter}-${addzero(monthFilter + 2)}-01`
    );
    const filters = {
      date: {
        $gte: `${yearFilter}-${addzero(monthFilter + 1)}-01`,
        // todo: IF it's december
        $lte: `${yearFilter}-${addzero(monthFilter + 2)}-01`,
      },
    };

    try {
      const result = await Depense.find(/* filters */).sort("-date");
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