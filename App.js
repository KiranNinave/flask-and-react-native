import React from "react";
import { Dimensions, Animated, Keyboard, Alert } from "react-native";
import {
  Form,
  Input,
  Button,
  Item,
  Text,
  Container,
  Content,
  Label,
  View
} from "native-base";
import axios from "axios";
import FormData from "FormData";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: "",
      animation: new Animated.Value(SCREEN_HEIGHT - 200),
      connected: false
    };
  }

  onConnect = () => {
    if (this.state.ip == "") {
      Alert.alert("Server IP!", "Please enter server IP!");
    } else {
      Keyboard.dismiss();
      this.revertanimation();

      axios({
        method: "post",
        data: { data: "connect" },
        url: "http://" + this.state.ip + ":5000/rpi"
      })
        .then(response => {
          console.log(response);
          if (response.data.data == "success") {
            this.setState({ connected: true }, () => {
              Alert.alert("Connected!", "Server connected!");
            });
          } else {
            Alert.alert("Invalid Connection", "Unable to connected to server");
          }
        })
        .catch(error => {
          Alert.alert(error);
        });
    }
  };

  serverHelper = command => {
    if (this.state.ip == "") {
      Alert.alert("Connection!", "Please connect first!");
    } else {
      axios({
        method: "post",
        data: { data: command },
        url: "http://" + this.state.ip + ":5000/rpi"
      })
        .then(response => {
          console.log(response);
          if (response.data.data != "success") {
            Alert.alert("Error!", "Command not send!");
          }
        })
        .catch(error => {
          Alert.alert(error);
        });
    }
  };

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 200
    }).start();
  };

  revertanimation = () => {
    Animated.timing(this.state.animation, {
      toValue: SCREEN_HEIGHT - 200,
      duration: 200
    }).start();
  };

  componentDidMount = () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  };

  componentWillUnmount = () => {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };

  _keyboardDidShow = () => {
    //alert("Keyboard Shown");
    this.startAnimation();
  };

  _keyboardDidHide = () => {
    //alert("Keyboard Hidden");
    this.revertanimation();
  };

  render() {
    const animatedStyles = {
      transform: [
        {
          translateY: this.state.animation
        }
      ]
    };

    return (
      <View
        style={{
          backgroundColor: "#1E88E5",
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT
        }}
      >
        <View style={{ margin: 10 }}>
          <View style={{ margin: 10 }}>
            <Button
              info
              full
              onPress={() => {
                this.serverHelper("up");
              }}
            >
              <Text>UP</Text>
            </Button>
          </View>
          <View style={{ margin: 10 }}>
            <Button
              info
              full
              onPress={() => {
                this.serverHelper("down");
              }}
            >
              <Text>DOWN</Text>
            </Button>
          </View>

          <View style={{ margin: 10 }}>
            <Button
              info
              full
              onPress={() => {
                this.serverHelper("arm up");
              }}
            >
              <Text>ARM UP</Text>
            </Button>
          </View>
          <View style={{ margin: 10 }}>
            <Button
              info
              full
              onPress={() => {
                this.serverHelper("arm down");
              }}
            >
              <Text>ARM DOWN</Text>
            </Button>
          </View>

          <View style={{ margin: 10 }}>
            <Button
              info
              full
              onPress={() => {
                this.serverHelper("open");
              }}
            >
              <Text>OPEN</Text>
            </Button>
          </View>
          <View style={{ margin: 10 }}>
            <Button
              info
              full
              onPress={() => {
                this.serverHelper("close");
              }}
            >
              <Text>CLOSE</Text>
            </Button>
          </View>
        </View>

        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              backgroundColor: "#fafafa",
              position: "absolute",
              zIndex: 10,
              elevation: 10
            },
            animatedStyles
          ]}
        >
          <Container>
            <Content>
              <Form>
                <Item floatingLabel>
                  <Label>Server IP</Label>
                  <Input
                    value={this.state.ip}
                    onChangeText={text => this.setState({ ip: text })}
                  />
                </Item>
              </Form>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <Button onPress={this.onConnect} light>
                  <Text>connect</Text>
                </Button>
              </View>
            </Content>
          </Container>
        </Animated.View>
      </View>
    );
  }
}

export default App;
