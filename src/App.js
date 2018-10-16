import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';

// imports all exports from ContactsAPI
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
    state = {
       contacts : []
    };

    componentDidMount() {
        ContactsAPI.getAll().then((contacts) => {
            this.setState({ contacts }) // same as {contacts : contacts} because they're the same
        })
    }

    removeContact = (contact) => {
        this.setState(state => ({
            contacts: state.contacts.filter((c) => c.id !== contact.id)
        }));

        ContactsAPI.remove(contact);
    };

    createContact = (contact) => {
        ContactsAPI.create(contact).then(contact => {
            this.setState(state => ({
                contacts: state.contacts.concat([ contact ])
            }))
        })
    }

    // createContact(contact) {
    //     ContactsAPI.create(contact).then(contact => {
    //         this.setState(state => ({
    //             contacts: state.contacts.concat([ contact ])
    //         }))
    //     })
    // }

    render() {
        // Object destructuring
        const { contacts } = this.state;

        return (
          <div className='app'>
              <Route exact path='/' render={() =>(
                  <ListContacts
                      onDeleteContact={this.removeContact}
                      contacts={contacts}
                  />
              )}/>
              <Route path="/create" render={({ history }) => (
                  <CreateContact
                    onCreateContact={(contact) => {
                        this.createContact(contact)
                        history.push('/')
                    }}
                    />
              )} />
          </div>
        );
    }
}

export default App;
