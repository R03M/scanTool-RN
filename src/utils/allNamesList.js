import { LS_LISTCODES, lsGetItems } from "./localStorage";

export const getNameofListS = async () => {
  const res = await lsGetItems(LS_LISTCODES);
  if (res) {
    const names = res.map((e) => {
      return e.name;
    });
    return names;
  }
};
