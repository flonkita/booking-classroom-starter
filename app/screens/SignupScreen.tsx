import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import UserForm from "../components/user/UserForm";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";

type RootStackParamList = {
  SigninScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { signup } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (credentials: any) => {
    try {
      setError(null);
      await signup(credentials);
      navigation.navigate('SigninScreen');
    } catch (error: any) {
      setError(typeof error === 'string' ? error : "Une erreur est survenue lors de l'inscription");
      console.error("Erreur d'inscription:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Inscription</Text>

      {error && (
        <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>
          {error}
        </Text>
      )}

      <UserForm onSubmit={handleSignup} buttonText="S'inscrire" />

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <Text>Déjà un compte ? </Text>
        <Text 
          style={{ color: '#2196F3' }}
          onPress={() => navigation.navigate('SigninScreen')}
        >
          Connectez-vous
        </Text>
      </View>
    </View>
  );
};

export default SignUpScreen;
