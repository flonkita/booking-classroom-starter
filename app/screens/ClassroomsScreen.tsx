import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";

const ClassroomsScreen = () => {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    console.log("ClassroomsScreen useEffect");
    fetchAllClassrooms();
  }, []);

  const fetchAllClassrooms = async () => {
    const response = await fetch("http://172.19.160.1:8000/api/classrooms");
    const data = await response.json();
    console.log(data);
    setClassrooms(data);
  };

  return (
    <View>
      <View style={styles.classroomsContainer}>
        {classrooms.map((classroom) => (
          <Card key={classroom.id}>
            <Card.Title title={classroom.name} titleStyle={styles.cardTitle} />
            <Card.Content>
              <Text>{classroom.capacity}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
};

export default ClassroomsScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
  },
  classroomsContainer: {
    flexDirection: "column",
    gap: 10,
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
});
