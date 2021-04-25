import Axios from 'axios';
import React ,{Component} from "react";
import './AllQuestions.css'

class Chips extends Component {
    
  getInitialState() {
    return {
      chips: [],
      KEY:   {
        backspace: 8,
        tab:       9,
        enter:     13
      },
      // only allow letters, numbers and spaces inbetween words
      INVALID_CHARS: /[^a-zA-Z0-9 ]/g
    };
  }
  
  componentDidMount() {
    this.setChips(this.props.chips);
		this.setState({KEY:{
        backspace: 8,
        tab:       9,
        enter:     13
      }})
  }
  
  componentWillReceiveProps(nextProps) {
    this.setChips(nextProps.chips);
  }
  
  setChips(chips) {
    if (chips && chips.length) this.setState({ chips });
  }

  onKeyDown(event){
    let keyPressed = event.which;

    if (keyPressed === this.state.KEY.enter ||
        (keyPressed === this.state.KEY.tab && event.target.value)) {
      event.preventDefault();
      this.updateChips(event);
    } 
  }


updateChips(event) { 
      let value = event.target.value;
      if (!value) return;
			Axios.post(`${process.env.REACT_APP_API_URL}/categories`,{title:value}).then(res=>{
				if(res.data.massage==='done'){			
      let chip = value
      if (chip && this.state.chips?.indexOf(chip) < 0) {
				let newChips=this.state.chips?.concat(chip);
        this.setState({chips: newChips});
      }else {
				this.setState({chips: [chip]});}}
			}).catch(err=>{
				console.log(err)
			}
	)}  

  async deleteChip(chip) {
    let index = this.state.chips.indexOf(chip);    
    if (index >= 0) {
			let res = await Axios.post(`${process.env.REACT_APP_API_URL}/delete/categories/${chip}`)
			if(res.data.massage==='done'){
				this.setState({	chips:this.state.chips.filter(a=>a!==chip)});
			}   
    }
  }
  
  focusInput(event) {
    let children = event.target.children;
    
    if (children.length) children[children.length - 1].focus();
  }

  render() {
    let chips = this.state?.chips?.map((chip, index) => {
      return (
        <span className="chip" key={index}>
          <span className="chip-value">{chip}</span>
          <button type="button" className="chip-delete-button" onClick={this.deleteChip.bind(this, chip)}>x</button>
        </span>
      );
    });
  
    let placeholder = this.props.placeholder || '';

    return (
      <div className="chips" onClick={this.focusInput}>
        {chips}
        <input type="text" className="chips-input" placeholder={placeholder} onKeyDown={this.onKeyDown.bind(this)} />
      </div>
    );
  }
}

export default Chips