import React, { useEffect } from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { fetchUsers } from "../../redux";

const Profile = ({ fetchUsers, userData }) => {
  // const dispatch = useDispatch();
  // const state = useSelector((state) => state.user);

  // const { fetchUsers } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return userData.loading ? (
    <h2>Loading</h2>
  ) : userData.error ? (
    <h2>{userData.error}</h2>
  ) : (
    <div>
      <h2>Users List</h2>
      <div>
        {userData &&
          userData.users &&
          userData.users.map((user) => <p>{user.name}</p>)}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
