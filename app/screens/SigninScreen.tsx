import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, Checkbox, TextInput } from "react-native-paper";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  SignupScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SigninScreen = () => {
  const { signin } = useAuth();
  const [checked, setChecked] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigation = useNavigation<NavigationProp>();

  const handleChange = (key: string, value: string) => {
    setCredentials({ ...credentials, [key]: value });
  };

  //  handlesubmit
  const handleSubmit = async () => {
    await signin(credentials);
  };

  return (
    <View
      style={{
        display: "flex",
        gap: 10,
        padding: 20,
      }}
    >
      <Text>Sign In</Text>

      {/* input email */}
      <TextInput
        label="Email"
        value={credentials.email}
        onChangeText={(value) => handleChange("email", value)}
      />
      {/* input password */}
      <TextInput
        label="Password"
        value={credentials.password}
        secureTextEntry={true}
        onChangeText={(value) => handleChange("password", value)}
      />

      {/* checkbox Remember me */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Remember me</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }
        }
        />
      </View>
      {/* submit button */}
      <Button onPress={handleSubmit} mode="contained">
        Sign In
      </Button>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <Text>Vous n'avez pas de compte ? </Text>
        <Text 
          style={{ color: '#2196F3' }}
          onPress={() => navigation.navigate('SignupScreen')}
        >
          Créer un compte
        </Text>
      </View>
    </View>
  );
};

export default SigninScreen;
