import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Row,Button} from 'react-bootstrap'
class AllDataAPI extends Component {
constructor(props){

super(props)

this.state={

AllData:[],


}
}

componentDidMount=async()=>{
    
let url=`http://localhost:3001/Alldata`

// let url=`${process.env.SERVER_REACT_URL}/Alldata`
let data =await axios.get(url)

this.setState({

    AllData:data.data

})
console.log(data.data)
}

AddToFav=async(el)=>{

const reqbody={

    title:el.title,
    userName:el.userName,
    imageUrl:el.imageUrl,
}

let url=`http://localhost:3001/AddData?email${this.props.auth0.user.email}`

await axios.post(url,reqbody)

}



    render() {
        return (
            <>
                <h1>All Data from the API</h1>
                
<Row>
   
    {

this.state.AllData.map((el,idx)=>{
    return(
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={el.imageUrl} alt={el.title} />
    <Card.Body>
      <Card.Title>{el.title}</Card.Title>
      <Card.Text>
     {el.userName}
      </Card.Text>
      <Button variant="primary" onClick={()=>this.AddToFav}>add to favorite</Button>
    </Card.Body>
  </Card>
    )



})

    }
  

</Row>
                <h3>Select your favorites :)</h3>
            </>
        )
    }
}

export default withAuth0(AllDataAPI);
