import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

interface UserFormProps {
  onSubmit: (credentials: {
    email: string;
    password: string;
    name: string;
  }) => void;
  buttonText?: string;
  initialValues?: {
    email: string;
    password: string;
    name: string;
  };
}

const UserForm = ({ 
  onSubmit, 
  buttonText = "Submit",
  initialValues = {
    email: "",
    password: "",
    name: "",
  }
}: UserFormProps) => {
  const [credentials, setCredentials] = useState(initialValues);

  const handleChange = (key: string, value: string) => {
    setCredentials({ ...credentials, [key]: value });
  };

  const handleSubmit = () => {
    onSubmit(credentials);
  };

  return (
    <View style={{ gap: 10 }}>
      <TextInput
        label="Email"
        value={credentials.email}
        onChangeText={(value) => handleChange("email", value)}
      />
      <TextInput
        label="Password"
        value={credentials.password}
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry
      />
      <TextInput
        label="Name"
        value={credentials.name}
        onChangeText={(value) => handleChange("name", value)}
      />
      <Button mode="contained" onPress={handleSubmit}>
        {buttonText}
      </Button>
    </View>
  );
};

export default UserForm;
