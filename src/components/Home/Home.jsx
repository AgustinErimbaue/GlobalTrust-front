import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../features/account/accountSlice";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { accountNumber, type, balance, currency } = useSelector(
    (state) => state.account
  );
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.id) {
      dispatch(getById(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="home-container">
      <div className="home-card">
        <h4 className="home-title">Account</h4>
        <div className="home-info">
          <p>
            <strong>Account Number:</strong> {accountNumber}
          </p>
          <p>
            <strong>Type:</strong> {type}
          </p>
          <p>
            <strong>Balance:</strong> {balance}
          </p>
          <p>
            <strong>Currency:</strong> {currency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
