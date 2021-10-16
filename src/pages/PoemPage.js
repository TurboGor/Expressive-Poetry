import React from 'react';
/* Markdown */
import ReactMarkdown from 'react-markdown'
/* Styles */
import '../styles/PoemPage.css'
import { withRouter } from "react-router";

class PoemPage extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            poem: null,
            count: 0,
            show: true,
            idNum: 0
        };
      }

    /* Fetch data from backend */
    componentDidMount() {
  
        const uid = this.props.match.params.id;
  
        // GET request using fetch with set headers
        const headers = { 'Content-Type': 'application/json', 'bob': 'Bobalooba' };
        try {
        fetch('https://expressive-poetry-api.herokuapp.com/api/poems/' + uid, { headers })
          .then((response) => response.json())
          .then((data) => {
              this.setState({poem: data});
              this.setState({idNum: uid});
            });
        } catch(e) { console.log(e) }
    }

    render() {
        function upVote(id) {
            try {
            fetch('https://expressive-poetry-api.herokuapp.com/api/poems/' + id, {
                method: 'POST',
                headers: { 'bob': 'Bobalooba' },
              });
            } catch(e) { console.log(e) }
          }
        return (
            <div className="poem-page">
                {this.state.poem && (
                <div>
                <h1>{this.state.poem.title}</h1>
                <p className="author">{this.state.poem.author}</p>
                <ReactMarkdown className="poem-text" children={this.state.poem.text}/>
                <p className="votes">Votes: {this.state.poem.votes + this.state.count}</p>
                <button onClick={() => {
                    upVote(this.state.idNum); 
                    this.setState({ count: this.state.count + 1 })
                    }}>
                    Up Vote!
                </button>
                </div>
                
                )}
            </div>
        )
    }
}

export default withRouter(PoemPage);