import React, { Component } from "react";
import { View,Text,StyleSheet,TextInput,TouchableOpacity,Image,FlatList ,Button } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_IP } from "../serverConnect"


class MoreHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id : "",
      errorTxt: "",
      items: "",
      date: "",
      title: "",
      currency: "",
      total: "",
      change: "",


    };
  }
  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
    
    this.loadHistory();
   

  });
  }
async componentWillUnmount() {
  this.unsubscribe();
}

loadHistory = async () => {

  const id = await AsyncStorage.getItem("@id");

  this.setState({id: id});

  if (id == null) {
    this.props.navigation.navigate("Login");
  }

  
  fetch(SERVER_IP+"getByRecId?id="+id+"&recid="+this.state.recID)
  .then(async(response) => {
  
    if (response.status == 200) {
       response.json().then(async(json) => {
        console.log(json);
        console.log(json.title);
        //this.setState({data: json});
       
       })
      

     
    } else if (response.status == 403) {
      return this.setState({ errorTxt: "Email doesnt Exist" });
      //used display the resposnes from the server
    } else if (response.status == 403) {
      return this.setState({ errorTxt: "Invalid Password" });
      //each error code returns a diffrent response to the user
    } else {
      return this.setState({ errorTxt: "Something went wrong" });
    }
  })
  .catch((error) => {
    console.error(error);
  });
  
};

Save = async () => {

}


render() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Edit , View & Save</Text>

<Text>{"Title: "}</Text>
  <TextInput
    onChangeText={(title) => this.setState({ title })}
    value={this.state.title}
    style={styles.input}
  />

 <Text>{"Date Of Purchase: "}</Text>
  <TextInput
    onChangeText={(date) => this.setState({ date })}
    value={this.state.date}
    style={styles.input}
  />

  <Text>{"Currency Type: "}</Text>
  <TextInput
    onChangeText={(currency) => this.setState({ currency })}
    value={this.state.currency}
    style={styles.input}
  />

  <Text>{"Total: "}</Text>
  <TextInput
    onChangeText={(total) => this.setState({ total })}
    value={this.state.total}
    style={styles.input}
  />

  <Text>{"Change: "}</Text>
  <TextInput
    onChangeText={(change) => this.setState({ change })}
    value={this.state.change}
    style={styles.input}
  />

<Text>{"Items Purchased: "}</Text>

<FlatList
    data={this.state.items}
    keyExtractor={(item) => item.pirce}
    renderItem={({ item }) => {
      return (
        <TextInput 
        style={styles.input}
        onChangeText={(item) => this.setState({ item })}
        value={this.state.items}>
          {item.item}
          {item.price}
        </TextInput>
      )

    }}
    
  />


<Button
  title="Confirm"
  color="#00fa00"
  onPress={this.Save}
/>

<Button
  title="Cancel"
  color="#ff0000"
  onPress={() =>  this.props.navigation.navigate('History')}
/>

      
    </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
   
  },
  button:
  {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    margin: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default MoreHistory