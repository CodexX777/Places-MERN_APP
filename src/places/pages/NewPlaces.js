import React from "react";
import "./PlaceForm.css";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/Util/Validator";
import { useForm } from "../../shared/Hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/Hooks/http-hook";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const NewPlaces = () => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image:{
        value:null,
        isValid:false
      }
    },
    false
  );

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {

      const formData=new FormData();
      formData.append('title', formState.inputs.title.value)
      formData.append('description', formState.inputs.description.value)
      formData.append('address', formState.inputs.address.value)
      formData.append('image', formState.inputs.image.value)
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL+"/places",
        "POST",
        formData,{
          Authorization: 'Bearer '+auth.token
        }
      );
      navigate("/");
      //redirect user to  a different paged
    } catch (err) {}
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          id="description"
          type="text"
          label="description"
          element="textarea"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description, atleast 5 characters"
          onInput={inputHandler}
        />
        <Input
          id="address"
          type="text"
          label="address"
          element="input"
          validators={[VALIDATOR_REQUIRE]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </>
  );
};

export default NewPlaces;
