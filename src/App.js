import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    isclick: false,
    search: '',
  }

  handlePassword = event => {
    this.setState({password: event.target.value})
  }

  handleUsername = event => {
    this.setState({username: event.target.value})
  }

  handleWebsite = event => {
    this.setState({website: event.target.value})
  }

  handleSearch = event => {
    this.setState({search: event.target.value})
  }

  handleDeleteBtn = id => {
    const {passwordsList} = this.state
    const afterdeletedata = passwordsList.filter(each => each.id !== id)
    this.setState({passwordsList: afterdeletedata})
  }

  handleClick = () => {
    this.setState(prevState => ({
      isclick: !prevState.isclick,
    }))
  }

  onAddPassword = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const newPassword = {
      id: uuidv4(),
      username,
      website,
      password,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      username: '',
      website: '',
      password: '',
    }))
  }

  render() {
    const {passwordsList, website, username, password, search, isclick} =
      this.state

    const filterdata = passwordsList.filter(each =>
      each.website.toLowerCase().includes(search.toLowerCase()),
    )

    return (
      <div className="bgContainer">
        <div className="applogo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo"
          />
        </div>
        <div className="InputContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="passwordmanager"
          />
          <form className="formContainer" onSubmit={this.onAddPassword}>
            <h2>Add New Password</h2>
            <div className="rowContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="logos"
              />
              <input
                id="websiteInput"
                placeholder="Enter Website"
                type="text"
                value={website}
                onChange={this.handleWebsite}
              />
            </div>
            <div className="rowContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="logos"
              />
              <input
                id="usernameInput"
                placeholder="Enter Username"
                type="text"
                value={username}
                onChange={this.handleUsername}
              />
            </div>
            <div className="rowContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="logos"
              />
              <input
                id="passwordInput"
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={this.handlePassword}
              />
            </div>
            <div className="btn">
              <button type="submit" className="button">
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="OutputContainer">
          <div className="passwordTopContainer">
            <div className="passwordCountContainer">
              <h2>Your Passwords</h2>
              <p>{passwordsList.length}</p>
            </div>
            <div className="rowContainer pad">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="logos"
              />
              <input
                id="searchInput"
                placeholder="search"
                type="search"
                className="search"
                value={search}
                onChange={this.handleSearch}
              />
            </div>
          </div>
          <hr />
          <div className="showPasswordsContainer">
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              onClick={this.handleClick}
            />
            <label htmlFor="checkbox">Show Passwords</label>
          </div>
          <ul>
            {filterdata.length === 0 ? (
              <div className="passwordimageContainer">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="No Passwords"
                  className="passwordmanager"
                />
                <p>No Passwords</p>
              </div>
            ) : (
              filterdata.map(eachItem => (
                <li key={eachItem.id} className="resultContainer">
                  <div className="profileContainer">
                    <p className="profile">{eachItem.website[0]}</p>
                    <div>
                      <p>{eachItem.website}</p>
                      <p>{eachItem.username}</p>
                      {isclick ? (
                        <p>{eachItem.password}</p>
                      ) : (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="startimg"
                        />
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    data-testid="delete"
                    className="deletebtn"
                    onClick={() => this.handleDeleteBtn(eachItem.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="deleteicon"
                    />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
