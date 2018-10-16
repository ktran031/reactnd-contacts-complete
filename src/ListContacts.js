import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    };

    state = {
        query: ''
    };

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    };

    clearQuery = () => {
        this.setState({ query: '' })
    };

    render() {
        // Object destructuring
        const { contacts, onDeleteContact } = this.props;
        const { query } = this.state;

        let showingContacts;
        if (query) {
            // escapeRegExp escapes any RegExp special characters
            // 'i' will ignore any case sensitive characters
            const match = new RegExp(escapeRegExp(query), 'i');
            // .test tests for a match in its string parameter.
            showingContacts = contacts.filter((contact) => match.test(contact.name));
        } else {
            showingContacts = contacts;
        }
        return (
            <div className='list-contacts'>
                {/* Use this to test the states in the UI*/}
                {JSON.stringify(this.state)}
                <div className="list-contacts-top">
                    <input type="text"
                           className="search-contacts"
                           placeholder='Search contacts'
                           value={query}
                           onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link
                        to='/create'
                        className='add-contact'>
                    </Link>
                </div>

                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {showingContacts.length} of {contacts.length} total</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}

                <ol className='contact-list'>
                    {showingContacts.map((contact) => {
                        return (
                            <li key={contact.id} className='contact-list-item'>
                                <div className="contact-avatar" style={{
                                    backgroundImage: `url(${contact.avatarURL})`
                                }}>
                                </div>
                                <div className="contact-details">
                                    <p>{contact.name}</p>
                                    <p>{contact.email}</p>
                                </div>
                                <button onClick={() => onDeleteContact(contact)} className="contact-remove">
                                    Remove
                                </button>
                            </li>
                        )
                    })}
                </ol>
            </div>
        )
    }
}

export default ListContacts;