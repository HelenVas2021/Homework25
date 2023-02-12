import{Component} from 'react';
import './Button.css'

class Button extends Component{
	handleClick = (e) => {
        const { inputNum, reset, operatorType, percent, squaring, sqrt, equals } = this.props;

        switch (e.target.value) {
            case 'C':
                reset();
                break;

            case '-':
            case '+':
            case '/':
            case '*':
                operatorType(e);
                break;

            case '%':
                percent();
                break;

            case 'x2': {
                squaring();
                break;
            }

            case 'x^':
                sqrt();
                break;

            case '=':
                equals(e);
                break;

            default:
                inputNum(e);
		}
	}

	render(){
		return(
	     <input type = "button"
		  value={this.props.value} 
		  onClick={this.handleClick}
         className={this.props.value === 'C' ? 'reset' : !isNaN(Number(this.props.value)) ? 'numbers' : ''}
				/>
			)
	}
}
export default Button;