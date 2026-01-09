import React from 'react'
import { Link } from 'react-router-dom';
const API_URL=import.meta.env.VITE_API_URL
function PropertyItem(p) {
  return (
    <tr key={p.item._id}>
        <td>{p.item.name} {p.item._id}</td>
            <td>{p.item.desc}</td>
        <td>{p.item.stock} [[{p.item.single_image}]]</td>
        <td>{p.item.single_image!=''?(<img src={API_URL +'/public/uploads/'+p.item.single_image} />):''}
        
        
        </td>
        { <td style={{ whiteSpace: 'nowrap' }}>
            <Link to={`/product/edit/${p.item._id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
            <button onClick={() => p.deleteUser(p.item._id)} className="btn btn-sm btn-danger btn-delete-user" >Delete</button> 
        </td> }
    </tr>
  )
}

export default PropertyItem


