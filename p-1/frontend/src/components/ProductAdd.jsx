import React, { useState } from "react";
import { useForm , Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {FloatingLabel,Form,Button,Container,Col,InputGroup  } from 'react-bootstrap';
const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

function isValidFileType(fileName, fileType) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

function getAllowedExt(type) {
  return validFileExtensions[type].map((e) => `.${e}`).toString()
} 

const MAX_FILE_SIZE = 102400;
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL
const schema = yup.object().shape({
  name: yup.string().required("Please enter name")
    .test(
        'email-check',
        'email already exist',
          async (value) =>{
            const result = await axios.get(import.meta.env.VITE_API_URL+"/property/check_name/"+value)
            if(result.data.data>0)
              return false;
            else
              return true
          }
      )
  ,
  stock: yup.number("please add number").typeError("Stock must be a number").required("Please enter stock"),
  desc: yup.string().required("Please enter desc"),
  single_image:  yup.mixed()
    .test("file", "You need to provide a file", (value) => {
       if (value.length > 0) {  
         return true;
       }
       return false;
       }),
    amenities: yup.array().min(1, "Select at least one amenity"),
    bhk: yup.string().required("add one")
});

const ProductAdd = () => {
    const [msg,setMsg] = useState()
  const { register, handleSubmit, formState: { errors }, reset,control  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
        amenities: ["garder"]   // ✅ default checked
    }
  });
  const onSubmitHandler = async(data) => {
    try{
        console.log({ data });
        
        const formData = new FormData();
            formData.append('name', data.name);
            formData.append('stock', data.stock);
            formData.append('desc', data.desc);
            formData.append('single_image',data.single_image[0]);
            data.amenities.forEach(item => {
              formData.append("amenities[]", item);
            });
            formData.append('bhk', data.bhk);
            
        // Make POST request to send data
        const response = await axios.post(import.meta.env.VITE_API_URL+'/property', formData);
        if(response.status==200)
        {
            setMsg(response.data.message)
            if(response.data.success==true)
            {               
                
            }
            else
            {
            }
        }
        

    }
    catch(e){
        console.log(e)

    }

            
    };
  return (
    <Container>
    <Form onSubmit={handleSubmit(onSubmitHandler)} encType="multipart/form-data">
      <h2>Lets sign you in.</h2>
      <div>{msg}</div>
       <Form.Group  as={Col} md="4" >
        <Form.Label>Name</Form.Label>
        <Form.Control {...register("name")} placeholder="Name" isInvalid={!!errors.name} />
        <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
      </Form.Group>  
      
      <Form.Group  as={Col} md="4" >
        <Form.Label>stock</Form.Label>
        <Form.Control type="number" {...register("stock")} placeholder="stock" isInvalid={!!errors.stock} />
        <Form.Control.Feedback type="invalid">{errors.stock?.message}</Form.Control.Feedback>
      </Form.Group>

     
     <FloatingLabel  label="desc" as={Col} md="4" >
        <Form.Control  as="textarea" placeholder="desc" style={{ height: '100px' }}  {...register("desc")} isInvalid={!!errors.desc}/>
        <Form.Control.Feedback type="invalid">{errors.desc?.message}</Form.Control.Feedback>
      </FloatingLabel>
       
      <Form.Group as={Col} md="4" >
        <Form.Label>Single image</Form.Label>
        <Form.Control type="file"  {...register("single_image")} isInvalid={!!errors.single_image} />
        <Form.Control.Feedback type="invalid">{errors.single_image?.message}</Form.Control.Feedback>
      </Form.Group>
      group-1
      <Form.Group as={Col} md="4" >
        <Form.Label>Amenities</Form.Label>
        <Form.Check type="checkbox" value='water' name='amenities'  label="water"  {...register("amenities")} />
        <Form.Check type="checkbox" value='garder' name='amenities' label="garder"  {...register("amenities")} />
        <Form.Check type="checkbox" value='a' name='amenities' label="a"  {...register("amenities")} />
        
      </Form.Group>  
      <div className="error-msg">{errors.amenities?.message}</div>
       group-2
      <Form.Group as={Col} md="4" >
        <Form.Label>Amenities</Form.Label>
        <Form.Check type="radio" value='2bhk' name='bhk'  label="2 bhk"  {...register("bhk")} />
        <Form.Check type="radio" value='3bhk' name='bhk' label="3 bhk"  {...register("bhk")} />        
        
      </Form.Group>       
      <div className="error-msg">{errors.bhk?.message}</div>

      <button type="submit">Sign in</button>
    </Form>
    </Container>
  );
};

export default ProductAdd;