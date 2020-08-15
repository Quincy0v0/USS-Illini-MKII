import React from 'react';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

export default class ToTopButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        intervalId: 0
    };
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render () {
      return <Button
        size="massive"
        circular
        icon ='angle double up'
        color="blue"
        style={{
          position: "fixed",
          bottom: "50px",
          right: "50px",
        }}
        onClick={ () => { this.scrollToTop(); }}
      />;

   }
}
