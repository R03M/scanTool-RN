import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setList } from "../redux/sistemSlice";
import { LS_LISTCODES, lsGetItems } from "../utils/localStorage";

const useInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getList() {
      const res = await lsGetItems(LS_LISTCODES);
      if (res !== null) {
        dispatch(setList(res));
      }
    }
    getList();
  }, []);
};

export default useInit;
