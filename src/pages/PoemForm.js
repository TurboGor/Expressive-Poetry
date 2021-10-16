import React, { Component } from 'react';
/* Styles */
import '../styles/PoemForm.css'
import {withRouter} from 'react-router-dom';

class PoemForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: '',
            title: '',
            text: ''
        };
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    handleTitleChange(event) { this.setState({ title: event.target.value }); }
    handleAuthorChange(event) { this.setState({ author: event.target.value }); }
    handleTextChange(event) { this.setState({ text: event.target.value }); }
    handleSubmit(event) {
        const headers = { 'Content-Type': 'application/json', 'bob': 'Bobalooba' };

        try {
        fetch('https://expressive-poetry-api.herokuapp.com/api/poems/', {
            method: 'POST',
            headers: headers,
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(this.state)
          }).then(response => response.json())
          .then(data => this.nextPath("/poem/" + data.id))
        } catch(e) { console.log(e) }
    
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Add a new poem</h1>

                <form onSubmit={this.handleSubmit}>
                    Title
                    <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                    Author
                    <input type="text" value={this.state.author} onChange={this.handleAuthorChange} />
                    Text
                    <textarea type="text" value={this.state.text} onChange={this.handleTextChange} />

                    <input className="submit-button" type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default withRouter(PoemForm)