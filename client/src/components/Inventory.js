import React, { Component } from 'react'
import UserContext from '../utils/UserContext'
import { Row, Col, Button } from "reactstrap";
import Loading from "./Loading";
import Axios from 'axios';


export default class Inventory extends Component {
  state={
    user:this.props.User,
    itemIds:[],
    inventory:[]
  } 

  getShop = ()=>{
    Axios.get("/")
  }

  componentDidMount(){
    if(this.props.user==="None" ){
      return
    }
    const itemIds = this.props.user.inventory.items
    const shop = this.getShop();
    let inventory = []
    console.log(itemIds)
     

  }


  render() {
    return (
      <div>
        
      </div>
    )
  }
}





// export default function Inventory(props) {
//   const { userContext, setUserContext } = useContext(UserContext)
//   const { itemState, setItemState } = useState()


  
//   useEffect(()=>{
//       let inventoryVar
//       Axios.get('/api/inventory').then((response)=>{
//         const items = userContext.User.inventory.items
//         return items.map((item)=>{
//             return response.data.filter(element=>{
//               return item===element.id && element
//             })
//         })
//       }).then((inventory)=>{
//         inventoryVar=inventory
//       })
//       console.log(inventoryVar)
//       setItemState(inventoryVar)
//   },[itemState])

//   if (userContext.User === "None") {
//     return <Loading />
//   }

//   return (
//     <div>
//     </div>
//   )
// }