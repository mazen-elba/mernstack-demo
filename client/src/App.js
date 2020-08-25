import React from "react";
import axios from "axios";

import "./App.css";

class App extends React.Component {
  state = {
    title: "",
    body: "",
    posts: [],
  };

  // Call getBlogPost() whenever component (page) mounts
  componentDidMount = () => {
    this.getBlogPost();
  };

  // Fetch Data from MongoDB -> Display in Client
  getBlogPost = () => {
    axios
      .get("/api")
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!!");
      });
  };

  handleChange = ({ target }) => {
    // const target = event.target
    // const name = event.name
    // const value = event.value
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  // Save Posts
  submit = (event) => {
    event.preventDefault(); // stops browser behavior (from refreshing)

    const payload = {
      title: this.state.title,
      body: this.state.body,
    };

    // Send Http POST request
    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to the server");
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  // Reset Form (after submit)
  resetUserInputs = () => {
    this.setState({
      title: "",
      body: "",
    });
  };

  // Display data (posted form) into page
  displayBlogPost = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  };

  render() {
    console.log("State: ", this.state);

    // JSX
    return (
      <div className="app">
        {/* HEADER */}
        <h2>Welcome to my Blog</h2>
        <form onSubmit={this.submit}>
          {/* SUBMIT TITLE */}
          <div className="form-input">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>

          {/* FORM BODY */}
          <div className="form-input">
            <textarea
              placeholder="Body"
              name="body"
              cols="30"
              rows="10"
              value={this.state.body}
              onChange={this.handleChange}
            ></textarea>
          </div>

          {/* SUBMIT BUTTON */}
          <button>Submit</button>
        </form>

        <div className="blog-">{this.displayBlogPost(this.state.posts)}</div>
      </div>
    );
  }
}

export default App;
