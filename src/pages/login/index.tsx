import { FC, ChangeEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/api/useAuth";
import { useCookie } from "@/hooks/useCookie";

export const Login: FC = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const { setCookie } = useCookie();

  const [email, setEmail] = useState<string | undefined>();

  const [password, setPassword] = useState<string | undefined>();

  const handleChangeUserName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.currentTarget.value);
  };

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleClick = async () => {
    if (!email || !password) {
      return;
    }
    const requestBody = { email, password };
    try {
      const token = await login(requestBody);
      setCookie("session-token", token);
      navigate("/");
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <label>
        email
        <br />
        <input value={email} onChange={handleChangeUserName} />
      </label>
      <br />
      <label>
        パスワード
        <br />
        <input value={password} onChange={handleChangePassword} />
      </label>
      <br />
      <button onClick={handleClick}>login</button>
    </div>
  );
};
