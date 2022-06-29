import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Axios from "axios";

class AddTodo extends Component {
  // Create a local react state of the this component with both content date property set to nothing.
  constructor() {
    super();
    this.state = {
      content: "",
      date: "",
      duedate: null,
    };
  }
  // The handleChange function updates the react state with the new input value provided from the user and the current date/time.
  // "event" is the defined action a user takes. In this case, the event is triggered when the user types something
  // into the text field.
  handleChange = (event) => {
    this.setState({
      content: event.target.value,
      date: Date().toLocaleString("en-US"),
    });
  };

  handleDateChange = (event) => {
    let date = null;
    if (event != null) {
      date = new Date(event).toLocaleDateString();
    }
    this.setState({
      duedate: date,
    });
  };
  // The handleSubmit function collects the forms input and puts it into the react state.
  // event.preventDefault() is called to prevents default event behavior like refreshing the browser.
  // this.props.addTodo(this.state) passes the current state (or user input and current date/time) into the addTodo function defined
  // in the Home.js file which then adds the input into the list.
  handleSubmit = (event) => {
    //code is creating a json object that will be used as a body request to be sent to the addItem function located in our Express application.
    // Place this code snippet below the code snippet above and make sure to replace the comments w/ the updated values for the following remaining keys:
    // task, currentDate, and dueDate.
    const jsonObject = {
      id: this.state.id,
      task: this.state.content,
      currentDate: this.state.date,
      dueDate: this.state.duedate,
    };

    //This snippet of code is making a POST request the addItem function located in our Express Application
    // and returning a response message.
    //Make sure to replace <port> with the port number that was used in the Express Application process such as 8080 or 3001.
    Axios({
      method: "POST",
      url: "http://localhost:8080/add/item",
      data: { jsonObject },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.data.message);
    });

    event.preventDefault();
    if (this.state.content.trim()) {
      this.props.addTodo(this.state);
      this.setState({
        content: "",
        date: "",
        duedate: null,
      });
    }
  };
  render() {
    return (
      // 1. When rendering a component, you can render as many elements as you like as long as it is wrapped inside
      // one div element.
      // 2. The return statement should include a text field input with the handleChange function from above that
      // is passed into an onChange event.
      // 3. The return should also include a button with the handleSubmit function from above that is passed into
      // an OnClick event.
      // 4. The value of the text field also should reflect the local state of this component.
      <div>
        <TextField
          label="Add New Item"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.content}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            id="new-item-date"
            label="Due Date"
            value={this.state.duedate}
            onChange={this.handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </div>
    );
  }
}

export default AddTodo;
