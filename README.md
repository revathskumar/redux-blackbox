redux-blackbox
==============

> Reduce redux boilerplate by following conventions

## How to use

#### setup reducer

```js
// reducer/index.js

import { createReducer } from "redux-blackbox";


export default {
  users: createReducer("users")
}
```

#### setup actions

```js
// actions/users.js
import { fetchListingAction } from "redux-blackbox/actions";

const fetchUsers = () => {
  return axios.get("/users");
}

export const fetchUsersAction = () => {
  return async (dispatch) =>{
    return await actions.fetchListingAction("users", dispatch, fetchUsers);
  }
}
```

#### setup component

```jsx
// components/ListUsers.js
import { IN_PROGRESS, FAILED, SUCCESS } from "redux-blackbox/constants";

const ListUsers = (users) => {
  if (users.uiState === IN_PROGRESS) {
    return <div>Loading...</div>
  }
  if (users.uiState === FAILED) {
    return <div className="notification is-danger">{users.error.message}</div>
  }
  if (users.uiState === SUCCESS) {
    if (users.listing.length) {
      return (
        <div>
          <ul>
            { users.listing.map(user =>{
                return <li>{user.name}</li>
              }) 
            }
          </ul>
        </div>
      )
    } else {
      return <div>Users list is empty</div>
    }
  }
  return null;
}

const mapStateToProps = (state) =>{
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  fetchUsersAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);
```

License
-------
Please see [License](https://github.com/revathskumar/redux-blackbox/blob/master/License)
