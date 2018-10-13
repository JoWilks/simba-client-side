import React from 'react'
import './Forms.css';

class AddForm extends React.Component {\

    render () {
        return (
            <div id='wrapper'>
                <form id='form'>
                    <h1>Add Transaction</h1>
                    <input type='date' placeholder='Date' ></input> <br></br>
                    
                    <input type='text' placeholder='Amount'></input> <br></br>

                    <input type='text' placeholder='Description'></input> <br></br>

                    <select>
                        {this.props.categories.map(category => {

                            
                        })}
                    </select>

                    <input type='submit' value='SUBMIT' />
                </form>
            </div>
        )
    }


}


export default AddForm