import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

class SearchBar extends React.Component {

  onSubmit(values) {
    this.props.fetchImage(values.search, values.number);
  }

  renderField(field) {

    const { meta: { touched, error } } = field;
    
    return (
      <div className="form-group">
        <h3>
          <label>
            {field.label}
          </label>
        </h3>
        <input
          className="form-control"
          type="text"
          {...field.input}
          />
        <p className="alert">
          { touched ? error : '' }
        </p>
      </div>
    )
  }
  
  
  renderNumField(field) {
    
    const { meta: { touched, error } } = field;
  
    return (
      <div className="form-group">
        <h3>
          <label>
            {field.label}
          </label>
        </h3>
        <input
          className="form-control"
          type="text"
          pattern="[0-9]"
          title="Maximum limit is 9"
          {...field.input}
          />
        <p className="alert">
          { touched ? error : '' }
        </p>
      </div>
    )
  }
  
  render() {
    
    const { handleSubmit } = this.props;
    
    return (
      <form className="form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field 
          label="Search Image"
          name="search"
          component={this.renderField}
        />
        <Field 
          label="Number"
          name="number"
          component={this.renderNumField}
        />
        <button className="btn" type="submit">Search</button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchImage(keyword, number) {
      if(number == '')
        number = 1;
      dispatch({type: 'FETCH_IMAGE', keyword, number});
    }
  }
}

function validate(values) {
  const errors = {};
  if(!values.search) {
    errors.search = "Enter some keyword";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: "CitySearch"
})(
  connect(null, mapDispatchToProps)(SearchBar)
);