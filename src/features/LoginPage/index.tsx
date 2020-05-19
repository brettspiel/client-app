import React, { useCallback, useState } from "react";
import { Button, Input } from "semantic-ui-react";
import { createUser } from "../../modules/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { paths } from "../../paths";

export const LoginPage: React.FunctionComponent = () => {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClickLogin = useCallback(async () => {
    await dispatch(createUser(userName));
    history.push(paths["/lounge"].routingPath);
  }, [dispatch, history, userName]);

  return (
    <div>
      <Input
        placeholder="ユーザー名"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <Button onClick={handleClickLogin}>サーバーにログイン</Button>
    </div>
  );
};
