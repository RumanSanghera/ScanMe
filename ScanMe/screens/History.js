import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity ,StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_IP } from "../serverConnect"


class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id : "",
      errorTxt: "",
      data: "",
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

  
  fetch(SERVER_IP+"getAllReceipts?id="+id)
  .then(async(response) => {
  
    if (response.status == 200) {
       response.json().then(async(json) => {

        this.setState({data: json});
       
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

render() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>History</Text>

      <FlatList
          data={this.state.data}
          keyExtractor={(item) => item.recipt_id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate("MoreHistory")}>
                <Text  style={styles.text} >{item.title} </Text>
                <Text  style={styles.text}> {item.dateofupload} </Text>
                <Text  style={styles.text}>{item.total} </Text>
              </TouchableOpacity>
            )
 
          }}
          
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

export default History