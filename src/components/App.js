import React, {Component} from 'react';
import Phonebook from './phonebook/Phonebook';
import Contacts from './contacts/Contacts'
import Filter from './filter/Filter'
import Alert from './alert/Alert'
import { connect } from "react-redux";
import { addContact, deleteContact, filterContact } from '../redux/actions'
import { CSSTransition } from 'react-transition-group';
import styles from './app.module.css'
import logo from './animation/logo.module.css'
import filterTransition from './animation/filterTransition.module.css'
import alertTransition from './animation/alertTransition.module.css'

class App extends Component {
  state = { 
      contacts: [],
      filter: '',
      showLogo: false,
      alertOn: false
  }

  getValue = value => {
    console.log('this.props', this.props.contacts)
    console.log('value', value.name)
    const isNameTaken = this.props.contacts.some(contact => contact.name === value.name.toLowerCase())
    !isNameTaken ? 
    (this.props.addContact(value))
    // this.setState(prev => ({
    //   contacts: [value, ...prev.contacts]
    : (this.setState({ alertOn: true }));
  

    setTimeout(() => {
      this.setState({ alertOn: false });
    }, 2000);
  };

  filterContact = e => {
    this.props.filterContact(e.target.value)
    };


  componentDidMount(){
    const contacts = (localStorage.getItem('contacts') !== null) ? JSON.parse(localStorage.getItem('contacts')) : [];
    this.setState({contacts, showLogo: true})
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  }

  getFilteredContacts = (contacts) => {
    const { filter } = this.props;
    if (!filter) {
        return contacts;
    } else {
        return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
    }
};
  
  // getFilteredContacts = () => {
  //   return this.state.contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(this.state.filter)
  //   );
  // };
   deleteContact = (id) =>{
      this.props.deleteContact({ id })
   }
  // deleteContact = e => {
  //   const id = e.target.id;
  //   this.setState(prevState => ({
  //     contacts: prevState.contacts.filter(contact => contact.id !== id)
  //   }));
  // };

  render() {
    console.log('this.props render', this.props)
    const { filter, contacts } = this.props;
    console.log('filter', filter)
    return (
      <div>
        <CSSTransition 
          in={this.state.showLogo}
          timeout={1000}
          classNames={logo}>
           <h2 className={styles.logo}>Phonebook</h2>
        </CSSTransition>

        <Phonebook {...this.state} onGetValue={this.getValue}/>
      
        {(contacts.length > 2) && (
          <CSSTransition
              timeout={500} 
              classNames={filterTransition}> 
              <Filter filter={filter} filterContact={this.filterContact} />
          </CSSTransition>)
        }

          <CSSTransition 
            in={this.state.alertOn}
            timeout={1000} 
            classNames={alertTransition}
            unmountOnExit>
            <Alert />
          </CSSTransition>
      
        {contacts && <Contacts 
        contacts={this.getFilteredContacts(contacts)}
        deleteContact={this.deleteContact}/>}
      </div>
    );
  }
}


const mapDTP = {
    addContact,
    deleteContact,
    filterContact
}
const mapSTP = state => ({
  contacts: state.contacts,
  filter: state.filter
});

export default connect(mapSTP,  mapDTP)(App);
