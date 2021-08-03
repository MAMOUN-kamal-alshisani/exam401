import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyFavorites.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import {Card,Row,Button} from 'react-bootstrap'
class MyFavorites extends React.Component {
constructor(props){
super(props)
this.state={
favorite:[],
  imageUrl:'',
  title:'',
  userName:'',
index:-1,
showform:false
}
}
componentDidMount=async()=>{

let url=`http://localhost:3001/getData?email=${this.props.auth0.user.email}`

let data= await axios.get(url);
this.setState({

  favorite:data.data

})
console.log(data.data);
}





deleteFav=async(index)=>{


let url=`http://localhost:3001/deleteData/${index}?email=${this.props.auth0.user.email}`
const data= await axios.delete(url)


this.setState({

  favorite:data.data

})
console.log(data.data);
}

showFunction=async(index)=>{
  
  await this.setState({

    imageUrl:this.state.favorite[index].imageUrl,
    title:this.state.favorite[index].title,
  userName:this.state.favorite[index].userName,
  index:index,
  showform:true

  })
}


updateFunction=async(event)=>{
event.preventDefault();
  const reqbody={

    title:event.target.title.value,
    userName:event.target.userName.value,
    imageUrl:event.target.imageUrl.value,
}

  let url=`http://localhost:3001/Updatedata/${index}?email=${this.props.auth0.user.email}`
  const data= await axios.put(url,reqbody)
  
  
  this.setState({
  
    favorite:data.data
  
  })
  console.log(data.data);
  }
  





    render() {
      return(
        <>
          <h1>My Favorites</h1>

          <Row>
    
    {

  this.state.favorite.map((el,idx)=>{
    return(
    <Card  key={idx}   style={{ width: '18rem' }}>
    <Card.Img variant="top" src={el.imageUrl} alt={el.title} />
    <Card.Body>
      <Card.Title>{el.title}</Card.Title>
      <Card.Text>
      {el.userName}
      </Card.Text>
      {/* <Button variant="danger" onClick={()=>this.updatefav}>add to favorite</Button> */}
      <Button variant="danger" onClick={()=>this.deleteFav(idx)}>add to favorite</Button>
    </Card.Body>
  </Card>
    )



    })

    }
  

  </Row>


          <p>
            This is a collection of my favorites
          </p>
        </>
    )
  }
}

export default withAuth0(MyFavorites);

