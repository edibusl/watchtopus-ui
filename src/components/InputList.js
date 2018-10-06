import React, {Component} from 'react';
import '../App.css';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Form from 'react-bootstrap/lib/Form'
import Row from 'react-bootstrap/lib/Row'
import FormControl from 'react-bootstrap/lib/FormControl'
import Col from 'react-bootstrap/lib/Col'


class PingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
            newItem: ""
        };

        this.handleChangeNew = this.handleChangeNew.bind(this);
        this.handleAddNew = this.handleAddNew.bind(this);
    }


    handleChangeNew(event) {
        this.setState({newItem: event.target.value});
    }

    handleAddNew(){
        //Validate not empty
        if(!this.state.newItem.trim()){
            return;
        }

        //Clone the list to avoid direct modification of the state
        const newList = Array.from(this.state.list);

        //Add the new item and set the list state
        newList.push(this.state.newItem.trim());
        this.setState({
            list: newList,
            newItem: ""
        });

        //Update parent component with the new list
        this.props.onChange(newList);
    }

    handleDelete(item){
        //Clone the list to avoid direct modification of the state
        const newList = Array.from(this.state.list);

        //Remove this item from the list
        var index = newList.indexOf(item);
        if (index > -1) {
            newList.splice(index, 1);
        }

        //Set the list state
        this.setState({
            list: newList
        });

        //Update parent component with the new list
        this.props.onChange(newList);
    }

    render() {
        const newItemValue = this.state.newItem;
        const items = this.state.list;
        const itemInputs = items.map((item) =>
            <Row key={item}>
                <Col xs={12}>
                    <FormControl disabled type="text" defaultValue={item} placeholder="Enter host IP or DNS" display="text"/>
                    <Button onClick={()=>this.handleDelete(item)}><Glyphicon glyph="remove"/></Button>
                </Col>
            </Row>
        );

        return (
            <Form inline>
                {itemInputs}
                <FormControl onChange={this.handleChangeNew} value={newItemValue} type="text" placeholder="Enter host IP or DNS" display="text"/>
                <Button onClick={this.handleAddNew}><Glyphicon glyph="plus"/></Button>
            </Form>
        );
    }
}

export default PingList;
