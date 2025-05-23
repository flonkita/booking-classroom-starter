import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import useAuth from "../hooks/useAuth";
import UserForm from "../components/user/UserForm";

const ProfilScreen = () => {
  
  const { signout, user, updateProfile } = useAuth();

  const handleUpdateProfile = async (credentials: any) => {
    try {
      // Ne garder que les champs qui ont été modifiés
      const updatedFields = Object.entries(credentials).reduce((acc, [key, value]) => {
        if (value !== user[key]) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);

      if (Object.keys(updatedFields).length === 0) {
        return; // Aucun changement
      }

      await updateProfile(updatedFields);
      // Afficher un message de succès
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      // Gestion des erreurs
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Profil</Text>

      <UserForm 
        onSubmit={handleUpdateProfile}
        buttonText="Mettre à jour"
        initialValues={user}
      />

      <Button mode="outlined" onPress={signout}>
        Signout
      </Button>
    </View>
  );
};

export default ProfilScreen;
